import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import './editor';
import {
  CARD_NAME,
  DEFAULT_ICON,
  DEFAULT_ICON_OFF,
  EDITOR_NAME,
  MODE_ICON,
  NOMINAL_FAULTS,
  REPO_URL,
  SLOT_LABELS,
  SLOT_TOGGLE_ICONS,
  UNAVAILABLE_STATES,
  VERSION,
  type NumberSlot,
  type Slot,
  type ToggleSlot,
} from './const';
import { resolveEntities, validateConfig, type ResolvedEntities } from './entities';
import { cardStyles } from './styles';
import type { HassEntity, HomeAssistant, HumidifierCardConfig } from './types';

const PENDING_TIMEOUT_MS = 3000;

/** "no_water" -> "No water". */
function prettify(value: string): string {
  const spaced = value.replace(/_/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

@customElement(CARD_NAME)
export class HumidifierCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HumidifierCardConfig;
  @state() private _entities: ResolvedEntities = {};
  @state() private _pending: Partial<Record<Slot, string | number>> = {};

  private _pendingTimers = new Map<Slot, ReturnType<typeof setTimeout>>();
  private _warnedMissing = false;

  static override styles = cardStyles;

  public static getConfigElement(): HTMLElement {
    return document.createElement(EDITOR_NAME);
  }

  public static getStubConfig(): Partial<HumidifierCardConfig> {
    return { prefix: 'smart_humidifier' };
  }

  public setConfig(config: HumidifierCardConfig): void {
    validateConfig(config);
    this._config = { show_status: true, dim_when_off: false, ...config };
    this._entities = resolveEntities(this._config);
    this._warnedMissing = false;
    this._clearAllPending();
  }

  public getCardSize(): number {
    return this._stateObj('target_humidity') ? 3 : 2;
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._clearAllPending();
  }

  protected override shouldUpdate(changed: PropertyValues): boolean {
    if (!this._config) return false;
    if (changed.size > 1 || !changed.has('hass')) return true;

    const oldHass = changed.get('hass') as HomeAssistant | undefined;
    if (!oldHass || !this.hass) return true;

    return Object.values(this._entities).some(
      (entityId) => oldHass.states[entityId] !== this.hass!.states[entityId],
    );
  }

  protected override updated(changed: PropertyValues): void {
    super.updated(changed);
    this._dropSettledPending();
    this._warnAboutMissingEntities();
  }

  // ---------------------------------------------------------------- rendering

  protected override render(): TemplateResult | typeof nothing {
    if (!this._config || !this.hass) return nothing;

    const power = this._stateObj('power');
    if (!power) {
      return html`<ha-card>
        <div class="warning">
          Entity <code>${this._entities.power ?? '(unset)'}</code> not found. Check the
          <code>prefix</code> in the card configuration.
        </div>
      </ha-card>`;
    }

    const isOn = power.state === 'on';
    const powerAvailable = this._isAvailable(power);
    // Home Assistant keeps the mode and fan-level entities controllable while the humidifier is
    // off, and the device accepts them, so only dim them when the user opts in.
    const controlsEnabled = !this._config.dim_when_off || (isOn && powerAvailable);

    const strip = [
      this._renderToggle('power'),
      this._renderMode(controlsEnabled),
      this._renderNumber('fan_level', controlsEnabled),
      this._renderToggle('light'),
      this._renderToggle('sound'),
    ].filter((part) => part !== nothing);

    return html`
      <ha-card>
        <div class="header">
          <ha-icon
            class=${classMap({ on: isOn && powerAvailable })}
            .icon=${this._config.icon ?? (isOn ? DEFAULT_ICON : DEFAULT_ICON_OFF)}
          ></ha-icon>
          <div class="title">
            <span
              class="name"
              role="button"
              tabindex="0"
              @click=${() => this._moreInfo(this._entities.power)}
              @keydown=${(ev: KeyboardEvent) => this._activate(ev, this._entities.power)}
              >${this._title(power)}</span
            >
            ${this._renderSubline(power)}
          </div>
          ${this._renderHumidity()} ${this._renderConnection()}
        </div>
        ${strip.length ? html`<div class="strip">${strip}</div>` : nothing}
        ${this._renderTargetRow(controlsEnabled)}
      </ha-card>
    `;
  }

  /** Second title line: the device fault by default, falling back to the power summary. */
  private _renderSubline(power: HassEntity): TemplateResult {
    if (!this._isAvailable(power)) {
      return html`<span class="sub bad">Unavailable</span>`;
    }

    const fault = this._stateObj('fault');
    if (!this._config!.show_status || !fault) {
      return html`<span class="sub">${this._summary(power)}</span>`;
    }

    if (!this._isAvailable(fault)) {
      return this._sublineFor(fault, 'Fault unknown', false);
    }

    const faulty = !NOMINAL_FAULTS.has(fault.state.toLowerCase());
    return this._sublineFor(fault, faulty ? this._format(fault) : 'No fault', faulty);
  }

  private _sublineFor(fault: HassEntity, text: string, bad: boolean): TemplateResult {
    return html`<span
      class=${classMap({ sub: true, bad })}
      role="button"
      tabindex="0"
      title=${SLOT_LABELS.fault}
      @click=${() => this._moreInfo(fault.entity_id)}
      @keydown=${(ev: KeyboardEvent) => this._activate(ev, fault.entity_id)}
      >${bad ? html`<ha-icon .icon=${'mdi:alert-circle'}></ha-icon>` : nothing}${text}</span
    >`;
  }

  private _renderConnection(): TemplateResult | typeof nothing {
    const connection = this._stateObj('connection');
    if (!this._config!.show_status || !connection) return nothing;

    const available = this._isAvailable(connection);
    const online = connection.state === 'on';
    const label = available ? (online ? 'Online' : 'Offline') : 'Connection unknown';

    return html`<span
      class=${classMap({ conn: true, bad: available && !online })}
      role="button"
      tabindex="0"
      title=${label}
      aria-label=${label}
      @click=${() => this._moreInfo(this._entities.connection)}
      @keydown=${(ev: KeyboardEvent) => this._activate(ev, this._entities.connection)}
    >
      <ha-icon .icon=${online ? 'mdi:wifi' : 'mdi:wifi-off'}></ha-icon>
    </span>`;
  }

  /** Current room humidity, read straight off the sensor entity. */
  private _renderHumidity(): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('humidity');
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    return html`<span
      class="readout"
      role="button"
      tabindex="0"
      title=${SLOT_LABELS.humidity}
      aria-label=${SLOT_LABELS.humidity}
      @click=${() => this._moreInfo(this._entities.humidity)}
      @keydown=${(ev: KeyboardEvent) => this._activate(ev, this._entities.humidity)}
      >${available ? this._format(stateObj) : '–'}</span
    >`;
  }

  private _renderTargetRow(enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('target_humidity');
    if (!stateObj) return nothing;

    // The device regulates to the target itself in constant-humidity mode, so the slider is
    // locked while that mode is on.
    const slider = this._renderNumber('target_humidity', enabled && !this._modeIsOn());
    if (slider === nothing) return nothing;

    return html`<div class="row">
      <span class="row-label">${SLOT_LABELS.target_humidity}</span>
      ${slider}
    </div>`;
  }

  private _modeIsOn(): boolean {
    const stateObj = this._stateObj('mode');
    if (!stateObj || !this._isAvailable(stateObj)) return false;

    const options = (stateObj.attributes.options as string[] | undefined) ?? [];
    const onOption = this._modeOnOption(options);
    if (!onOption) return false;

    return ((this._pending.mode as string | undefined) ?? stateObj.state) === onOption;
  }

  private _renderToggle(slot: ToggleSlot): TemplateResult | typeof nothing {
    const stateObj = this._stateObj(slot);
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const pending = this._pending[slot] as string | undefined;
    const on = (pending ?? stateObj.state) === 'on';
    const icons = SLOT_TOGGLE_ICONS[slot];

    return html`<button
      class=${classMap({ 'icon-toggle': true, power: slot === 'power', on: on && available })}
      type="button"
      ?disabled=${!available}
      title=${SLOT_LABELS[slot]}
      aria-label=${SLOT_LABELS[slot]}
      aria-pressed=${String(on)}
      @click=${() => this._setSwitch(slot, !on)}
    >
      <ha-icon .icon=${on ? icons.on : icons.off}></ha-icon>
    </button>`;
  }

  private _renderMode(enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('mode');
    if (!stateObj) return nothing;

    const options = (stateObj.attributes.options as string[] | undefined) ?? [];
    const onOption = this._modeOnOption(options);

    return onOption
      ? this._renderModeToggle(stateObj, options, onOption, enabled)
      : this._renderModeSelect(stateObj, options, enabled);
  }

  /**
   * A select with only two options reads better as a button than as a dropdown. `mode_on` names
   * the option that counts as "on"; otherwise the second option is used.
   */
  private _modeOnOption(options: string[]): string | undefined {
    return this._config!.mode_on ?? (options.length === 2 ? options[1] : undefined);
  }

  private _renderModeToggle(
    stateObj: HassEntity,
    options: string[],
    onOption: string,
    enabled: boolean,
  ): TemplateResult {
    const available = this._isAvailable(stateObj);
    const current = (this._pending.mode as string | undefined) ?? stateObj.state;
    const on = current === onOption;
    const offOption = options.find((option) => option !== onOption);
    const label = available
      ? `${SLOT_LABELS.mode}: ${this._format(stateObj, current)}`
      : SLOT_LABELS.mode;

    return html`<button
      class=${classMap({ 'icon-toggle': true, on: on && available })}
      type="button"
      ?disabled=${!enabled || !available}
      title=${label}
      aria-label=${label}
      aria-pressed=${String(on)}
      @click=${() => this._setMode(on ? offOption : onOption)}
    >
      <ha-icon .icon=${MODE_ICON}></ha-icon>
    </button>`;
  }

  private _renderModeSelect(
    stateObj: HassEntity,
    options: string[],
    enabled: boolean,
  ): TemplateResult {
    const available = this._isAvailable(stateObj);
    const value = (this._pending.mode as string | undefined) ?? stateObj.state;

    return html`<ha-select
      naturalMenuWidth
      fixedMenuPosition
      aria-label=${SLOT_LABELS.mode}
      .value=${options.includes(value) ? value : ''}
      .disabled=${!enabled || !available}
      @selected=${this._modeSelected}
      @click=${(ev: Event) => ev.stopPropagation()}
      @closed=${(ev: Event) => ev.stopPropagation()}
    >
      ${options.map(
        (option) =>
          html`<ha-list-item .value=${option}>${this._format(stateObj, option)}</ha-list-item>`,
      )}
    </ha-select>`;
  }

  private _renderNumber(slot: NumberSlot, enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj(slot);
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const min = Number(stateObj.attributes.min ?? 0);
    const max = Number(stateObj.attributes.max ?? 100);
    const step = Number(stateObj.attributes.step ?? 1);
    const unit = (stateObj.attributes.unit_of_measurement as string | undefined) ?? '';
    const value = Number(this._pending[slot] ?? stateObj.state);
    const safeValue = Number.isFinite(value) ? value : min;

    return html`<div class="slider-wrap">
      <input
        type="range"
        min=${min}
        max=${max}
        step=${step}
        .value=${String(safeValue)}
        ?disabled=${!enabled || !available}
        aria-label=${SLOT_LABELS[slot]}
        @input=${(ev: Event) => this._numberInput(slot, ev)}
        @change=${(ev: Event) => this._numberChange(slot, ev)}
      />
      <span class="value">${available ? `${safeValue}${unit}` : '–'}</span>
    </div>`;
  }

  // ------------------------------------------------------------------ actions

  private _activate(ev: KeyboardEvent, entityId?: string): void {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    ev.preventDefault();
    this._moreInfo(entityId);
  }

  private _setSwitch(slot: Slot, on: boolean): void {
    const entityId = this._entities[slot];
    const stateObj = this._stateObj(slot);
    if (!entityId || !stateObj || !this.hass) return;

    this._setPending(slot, on ? 'on' : 'off');
    void this.hass.callService('switch', on ? 'turn_on' : 'turn_off', { entity_id: entityId });
  }

  private _modeSelected = (ev: Event): void => {
    const stateObj = this._stateObj('mode');
    const value = (ev.target as { value?: string }).value;
    if (!stateObj || !value || value === stateObj.state) return;

    this._setMode(value);
  };

  private _setMode(option?: string): void {
    const entityId = this._entities.mode;
    if (!option || !entityId || !this.hass) return;

    this._setPending('mode', option);
    void this.hass.callService('select', 'select_option', { entity_id: entityId, option });
  }

  /** Dragging only moves the local value; the service call waits for the commit. */
  private _numberInput(slot: NumberSlot, ev: Event): void {
    const value = Number((ev.target as HTMLInputElement).value);
    if (Number.isFinite(value)) this._setPending(slot, value);
  }

  private _numberChange(slot: NumberSlot, ev: Event): void {
    const entityId = this._entities[slot];
    if (!entityId || !this.hass) return;

    const value = Number((ev.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) return;

    this._setPending(slot, value);
    void this.hass.callService('number', 'set_value', { entity_id: entityId, value });
  }

  private _moreInfo(entityId?: string): void {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  // ------------------------------------------------------------------ helpers

  private _stateObj(slot: Slot): HassEntity | undefined {
    const entityId = this._entities[slot];
    return entityId && this.hass ? this.hass.states[entityId] : undefined;
  }

  private _isAvailable(stateObj?: HassEntity): boolean {
    return !!stateObj && !UNAVAILABLE_STATES.has(stateObj.state);
  }

  private _format(stateObj: HassEntity, value?: string): string {
    const raw = value ?? stateObj.state;
    const formatter = this.hass?.formatEntityState;
    if (formatter) {
      try {
        return formatter(stateObj, raw);
      } catch {
        /* older frontends throw on the two-argument form */
      }
    }
    const unit =
      value === undefined
        ? ((stateObj.attributes.unit_of_measurement as string | undefined) ?? '')
        : '';
    return unit ? `${raw}${unit}` : prettify(raw);
  }

  private _title(power: HassEntity): string {
    return this._config?.name ?? power.attributes.friendly_name ?? 'Humidifier';
  }

  private _summary(power: HassEntity): string {
    const parts = [power.state === 'on' ? 'On' : 'Off'];
    if (power.state === 'on') {
      const mode = this._stateObj('mode');
      if (this._isAvailable(mode)) parts.push(this._format(mode!));

      const fan = this._stateObj('fan_level');
      if (this._isAvailable(fan)) parts.push(`Fan ${Number(fan!.state)}`);
    }
    return parts.join(' · ');
  }

  private _setPending(slot: Slot, value: string | number): void {
    this._pending = { ...this._pending, [slot]: value };

    const existing = this._pendingTimers.get(slot);
    if (existing) clearTimeout(existing);
    this._pendingTimers.set(
      slot,
      setTimeout(() => this._clearPending(slot), PENDING_TIMEOUT_MS),
    );
  }

  private _clearPending(slot: Slot): void {
    const timer = this._pendingTimers.get(slot);
    if (timer) clearTimeout(timer);
    this._pendingTimers.delete(slot);

    if (slot in this._pending) {
      const next = { ...this._pending };
      delete next[slot];
      this._pending = next;
    }
  }

  private _clearAllPending(): void {
    for (const timer of this._pendingTimers.values()) clearTimeout(timer);
    this._pendingTimers.clear();
    this._pending = {};
  }

  /** Drop optimistic values as soon as Home Assistant reports the value we asked for. */
  private _dropSettledPending(): void {
    for (const slot of Object.keys(this._pending) as Slot[]) {
      const stateObj = this._stateObj(slot);
      if (!stateObj) continue;
      const pending = this._pending[slot];
      const settled =
        typeof pending === 'number'
          ? Number(stateObj.state) === pending
          : stateObj.state === pending;
      if (settled) this._clearPending(slot);
    }
  }

  private _warnAboutMissingEntities(): void {
    if (this._warnedMissing || !this.hass) return;
    this._warnedMissing = true;

    const missing = Object.entries(this._entities)
      .filter(([, entityId]) => !(entityId in this.hass!.states))
      .map(([slot, entityId]) => `${slot} -> ${entityId}`);

    if (missing.length) {
      console.warn(`${CARD_NAME}: entities not found and skipped:\n  ${missing.join('\n  ')}`);
    }
  }
}

window.customCards = window.customCards ?? [];
window.customCards.push({
  type: CARD_NAME,
  name: 'Humidifier Card',
  description:
    'Display and control an ESPHome humidifier exposed as switch/select/number entities.',
  preview: false,
  documentationURL: REPO_URL,
});

console.info(
  `%c ${CARD_NAME.toUpperCase()} %c v${VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: white; font-weight: 700;',
);

declare global {
  interface HTMLElementTagNameMap {
    'humidifier-card': HumidifierCard;
  }
}
