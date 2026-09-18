import {
  LitElement,
  html,
  nothing,
  svg,
  type PropertyValues,
  type SVGTemplateResult,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import './editor';
import {
  CARD_NAME,
  EDITOR_NAME,
  MODE_ICON,
  NOMINAL_FAULTS,
  PILL_ICONS,
  REPO_URL,
  SLOT_LABELS,
  SPIN_FASTEST,
  SPIN_SLOWEST,
  UNAVAILABLE_STATES,
  VERSION,
  type NumberSlot,
  type PillSlot,
  type Slot,
} from './const';
import { resolveEntities, validateConfig, type ResolvedEntities } from './entities';
import { clamp, humidityLevel, numericState } from './humidity';
import { cardStyles } from './styles';
import type { HassEntity, HomeAssistant, HumidifierCardConfig } from './types';

const PENDING_TIMEOUT_MS = 3000;

/** More fan pills than this would not fit next to the toggles. */
const MAX_FAN_PILLS = 10;

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DROP = 'M50 34 C57 43 63 49 63 56 A13 13 0 0 1 37 56 C37 49 43 43 50 34 Z';

/** "no_water" -> "No water". */
function prettify(value: string): string {
  const spaced = value.replace(/_/g, ' ').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

interface NumberInfo {
  entity: HassEntity;
  available: boolean;
  min: number;
  max: number;
  step: number;
  unit: string;
  value: number;
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
    return 3;
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

    const powerAvailable = this._isAvailable(power);
    const isOn = ((this._pending.power as string | undefined) ?? power.state) === 'on';
    // Home Assistant keeps the mode, fan level and target entities controllable while the
    // humidifier is off, and the device accepts them, so only dim them when the user opts in.
    const controlsEnabled = !this._config.dim_when_off || (isOn && powerAvailable);

    const humidity = this._stateObj('humidity');
    const humidityValue = this._isAvailable(humidity) ? numericState(humidity) : null;
    const level = humidityLevel(humidityValue);

    // The humidity colour tints the card while the humidifier runs; when it is off everything
    // falls back to the idle grey, except the humidity chip's dot.
    const accent = isOn ? (humidity ? level.color : undefined) : 'var(--hc-idle-color)';

    const target = this._numberInfo('target_humidity');
    const fan = this._numberInfo('fan_level');

    return html`
      <ha-card
        class=${classMap({ unavailable: !powerAvailable })}
        style=${styleMap(accent ? { '--hc-accent': accent } : {})}
      >
        <div class="row">
          ${this._renderDial(isOn, humidityValue, target, fan)}
          <div class="body">
            <div class="head">
              <div
                class="name"
                role="button"
                tabindex="0"
                @click=${() => this._moreInfo(this._entities.power)}
                @keydown=${(ev: KeyboardEvent) => this._activate(ev, this._entities.power)}
              >
                ${this._config.name ?? power.attributes.friendly_name ?? SLOT_LABELS.power}
              </div>
              <div class=${classMap({ pct: true, off: !isOn })}>
                ${this._headline(isOn, powerAvailable, target)}
              </div>
              <button
                class=${classMap({ power: true, on: isOn })}
                type="button"
                title=${SLOT_LABELS.power}
                aria-label=${SLOT_LABELS.power}
                aria-pressed=${String(isOn)}
                ?disabled=${!powerAvailable}
                @click=${this._togglePower}
              >
                <ha-icon .icon=${'mdi:power'}></ha-icon>
              </button>
            </div>
            ${this._renderTargetSlider(target, controlsEnabled)}
            <div class="chips">
              ${this._renderHumidityChip(humidity, humidityValue, level.label, level.color)}
              <div class="spacer"></div>
              ${this._renderStatusChip()}
            </div>
            ${this._renderPresets(fan, controlsEnabled)}
          </div>
        </div>
      </ha-card>
    `;
  }

  /** Big accent value next to the name: the target while on, otherwise the power state. */
  private _headline(isOn: boolean, available: boolean, target?: NumberInfo): string {
    if (!available) return '–';
    if (!isOn) return 'Off';
    return target?.available ? `${target.value}${target.unit}` : 'On';
  }

  /**
   * The dial: the ring fills to the current humidity, a marker sits at the target, and mist rises
   * off a water drop faster the higher the fan level. Tap it to toggle the humidifier.
   */
  private _renderDial(
    isOn: boolean,
    humidity: number | null,
    target?: NumberInfo,
    fan?: NumberInfo,
  ): TemplateResult {
    const fanShare =
      fan?.available && fan.max > fan.min
        ? ((fan.value - fan.min) / (fan.max - fan.min)) * 100
        : 50;
    const duration = SPIN_SLOWEST - ((SPIN_SLOWEST - SPIN_FASTEST) * clamp(fanShare, 1, 100)) / 100;
    const filled = humidity === null ? 0 : clamp(humidity, 0, 100) / 100;

    return html`
      <div
        class=${classMap({ visual: true, on: isOn, off: !isOn })}
        style=${styleMap({ '--spin': `${duration.toFixed(2)}s` })}
        role="button"
        tabindex="0"
        title=${SLOT_LABELS.power}
        @click=${this._togglePower}
        @keydown=${(ev: KeyboardEvent) => {
          if (ev.key !== 'Enter' && ev.key !== ' ') return;
          ev.preventDefault();
          this._togglePower();
        }}
      >
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <clipPath id="disc"><circle cx="50" cy="50" r="36"></circle></clipPath>
          </defs>
          <circle class="ring" cx="50" cy="50" r=${RADIUS}></circle>
          ${svg`<circle
            class="ring-value"
            cx="50"
            cy="50"
            r=${RADIUS}
            stroke-dasharray=${CIRCUMFERENCE}
            stroke-dashoffset=${CIRCUMFERENCE * (1 - filled)}
          ></circle>`}
          ${target?.available ? this._renderTargetMarker(target.value) : nothing}
          <g clip-path="url(#disc)">
            <g class="mist"><circle cx="44" cy="40" r="3.2"></circle></g>
            <g class="mist"><circle cx="52" cy="38" r="2.6"></circle></g>
            <g class="mist"><circle cx="57" cy="41" r="3"></circle></g>
            <g class="mist"><circle cx="48" cy="39" r="2.2"></circle></g>
          </g>
          <path class="drop" d=${DROP}></path>
          <path class="shine" d="M44.5 53 a6.5 6.5 0 0 0 3 7.5"></path>
        </svg>
      </div>
    `;
  }

  private _renderTargetMarker(target: number): SVGTemplateResult {
    const angle = (clamp(target, 0, 100) / 100) * 2 * Math.PI - Math.PI / 2;
    const x = 50 + RADIUS * Math.cos(angle);
    const y = 50 + RADIUS * Math.sin(angle);
    return svg`<circle class="target-mark" cx=${x.toFixed(2)} cy=${y.toFixed(2)} r="4.5"></circle>`;
  }

  private _renderTargetSlider(
    target: NumberInfo | undefined,
    controlsEnabled: boolean,
  ): TemplateResult | typeof nothing {
    if (!target) return nothing;

    // The device regulates to the target itself in constant-humidity mode, so the slider is
    // locked while that mode is on.
    const enabled = target.available && controlsEnabled && !this._modeIsOn();
    const fill =
      target.max > target.min ? ((target.value - target.min) / (target.max - target.min)) * 100 : 0;

    return html`<input
      type="range"
      min=${target.min}
      max=${target.max}
      step=${target.step}
      .value=${String(target.value)}
      ?disabled=${!enabled}
      title=${SLOT_LABELS.target_humidity}
      aria-label=${SLOT_LABELS.target_humidity}
      style=${styleMap({ '--fill': `${clamp(fill, 0, 100)}%` })}
      @input=${(ev: Event) => this._numberInput('target_humidity', ev)}
      @change=${(ev: Event) => this._numberChange('target_humidity', ev)}
    />`;
  }

  private _renderHumidityChip(
    humidity: HassEntity | undefined,
    value: number | null,
    label: string,
    color: string,
  ): TemplateResult | typeof nothing {
    if (!humidity) return nothing;
    const unit = (humidity.attributes.unit_of_measurement as string | undefined) ?? '%';

    return html`
      <div
        class="chip humidity"
        role="button"
        tabindex="0"
        title=${SLOT_LABELS.humidity}
        @click=${() => this._moreInfo(this._entities.humidity)}
        @keydown=${(ev: KeyboardEvent) => this._activate(ev, this._entities.humidity)}
      >
        <span class="dot" style=${styleMap({ background: color })}></span>
        <span>
          ${
            value === null
              ? `${SLOT_LABELS.humidity} ${this._format(humidity)}`
              : `${label} · ${Math.round(value)}${unit}`
          }
        </span>
      </div>
    `;
  }

  /** Offline beats a device fault; a device fault is always shown, "No fault" included. */
  private _renderStatusChip(): TemplateResult | typeof nothing {
    if (!this._config!.show_status) return nothing;

    const connection = this._stateObj('connection');
    if (connection && this._isAvailable(connection) && connection.state !== 'on') {
      return this._statusChip('connection', 'mdi:wifi-off', 'Offline', true);
    }

    const fault = this._stateObj('fault');
    if (!fault) return nothing;
    if (!this._isAvailable(fault)) {
      return this._statusChip('fault', 'mdi:help-circle-outline', 'Fault unknown', false);
    }

    const faulty = !NOMINAL_FAULTS.has(fault.state.toLowerCase());
    return faulty
      ? this._statusChip('fault', 'mdi:alert-circle', this._format(fault), true)
      : this._statusChip('fault', 'mdi:check-circle-outline', 'No fault', false);
  }

  private _statusChip(slot: Slot, icon: string, label: string, bad: boolean): TemplateResult {
    const entityId = this._entities[slot];
    return html`
      <div
        class=${classMap({ chip: true, status: true, bad })}
        role="button"
        tabindex="0"
        title=${SLOT_LABELS[slot]}
        @click=${() => this._moreInfo(entityId)}
        @keydown=${(ev: KeyboardEvent) => this._activate(ev, entityId)}
      >
        <ha-icon .icon=${icon}></ha-icon>
        <span>${label}</span>
      </div>
    `;
  }

  /** Fan level pills on the left, mode / light / buzzer toggles on the right. */
  private _renderPresets(
    fan: NumberInfo | undefined,
    controlsEnabled: boolean,
  ): TemplateResult | typeof nothing {
    const fanPills = this._renderFanPills(fan, controlsEnabled);
    const toggles = [
      this._renderModePill(controlsEnabled),
      this._renderPill('light'),
      this._renderPill('sound'),
    ].filter((part) => part !== nothing);

    if (fanPills === nothing && !toggles.length) return nothing;

    return html`
      <div class="presets">
        ${fanPills === nothing ? nothing : html`<div class="group levels">${fanPills}</div>`}
        ${toggles.length ? html`<div class="group toggles">${toggles}</div>` : nothing}
      </div>
    `;
  }

  private _renderFanPills(
    fan: NumberInfo | undefined,
    controlsEnabled: boolean,
  ): TemplateResult | typeof nothing {
    if (!fan || fan.step <= 0) return nothing;

    const levels: number[] = [];
    for (let level = fan.min; level <= fan.max + 1e-9; level += fan.step) {
      levels.push(Number(level.toFixed(4)));
    }
    if (levels.length > MAX_FAN_PILLS) return nothing;

    const enabled = fan.available && controlsEnabled;

    return html`
      <ha-icon class="preset-icon" .icon=${'mdi:fan'} title=${SLOT_LABELS.fan_level}></ha-icon>
      ${levels.map(
        (level) => html`
          <button
            class=${classMap({ preset: true, active: fan.available && fan.value === level })}
            type="button"
            title=${`${SLOT_LABELS.fan_level} ${level}`}
            aria-label=${`${SLOT_LABELS.fan_level} ${level}`}
            aria-pressed=${String(fan.value === level)}
            ?disabled=${!enabled}
            @click=${() => this._setNumber('fan_level', level)}
          >
            ${level}
          </button>
        `,
      )}
    `;
  }

  private _renderModePill(enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('mode');
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const options = (stateObj.attributes.options as string[] | undefined) ?? [];
    const current = (this._pending.mode as string | undefined) ?? stateObj.state;
    const label = available
      ? `${SLOT_LABELS.mode}: ${this._format(stateObj, current)}`
      : SLOT_LABELS.mode;
    const onOption = this._modeOnOption(options);

    if (onOption) {
      const on = current === onOption;
      const offOption = options.find((option) => option !== onOption);
      return html`<button
        class=${classMap({ preset: true, toggle: true, active: on && available })}
        type="button"
        title=${label}
        aria-label=${label}
        aria-pressed=${String(on)}
        ?disabled=${!enabled || !available}
        @click=${() => this._setMode(on ? offOption : onOption)}
      >
        <ha-icon .icon=${MODE_ICON}></ha-icon>
      </button>`;
    }

    // More than two options: one pill showing the current mode that steps to the next on tap.
    const next = options[(options.indexOf(current) + 1) % Math.max(options.length, 1)];
    return html`<button
      class="preset"
      type="button"
      title=${label}
      aria-label=${label}
      ?disabled=${!enabled || !available || options.length < 2}
      @click=${() => this._setMode(next)}
    >
      ${available ? this._format(stateObj, current) : SLOT_LABELS.mode}
    </button>`;
  }

  private _renderPill(slot: PillSlot): TemplateResult | typeof nothing {
    const stateObj = this._stateObj(slot);
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const on = ((this._pending[slot] as string | undefined) ?? stateObj.state) === 'on';
    const icons = PILL_ICONS[slot];

    return html`<button
      class=${classMap({ preset: true, toggle: true, active: on && available })}
      type="button"
      title=${SLOT_LABELS[slot]}
      aria-label=${SLOT_LABELS[slot]}
      aria-pressed=${String(on)}
      ?disabled=${!available}
      @click=${() => this._setSwitch(slot, !on)}
    >
      <ha-icon .icon=${on ? icons.on : icons.off}></ha-icon>
    </button>`;
  }

  // ------------------------------------------------------------------ actions

  private _togglePower = (): void => {
    const power = this._stateObj('power');
    if (!power || !this._isAvailable(power)) return;
    const on = ((this._pending.power as string | undefined) ?? power.state) === 'on';
    this._setSwitch('power', !on);
  };

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
    this._setNumber(slot, Number((ev.target as HTMLInputElement).value));
  }

  private _setNumber(slot: NumberSlot, value: number): void {
    const entityId = this._entities[slot];
    if (!entityId || !this.hass || !Number.isFinite(value)) return;

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

  /** A number entity's range, unit and current value, with any pending value applied. */
  private _numberInfo(slot: NumberSlot): NumberInfo | undefined {
    const entity = this._stateObj(slot);
    if (!entity) return undefined;

    const min = Number(entity.attributes.min ?? 0);
    const max = Number(entity.attributes.max ?? 100);
    const value = Number(this._pending[slot] ?? entity.state);

    return {
      entity,
      available: this._isAvailable(entity),
      min,
      max,
      step: Number(entity.attributes.step ?? 1),
      unit: (entity.attributes.unit_of_measurement as string | undefined) ?? '',
      value: Number.isFinite(value) ? value : min,
    };
  }

  /**
   * A select with only two options reads better as a toggle than as a list. `mode_on` names the
   * option that counts as "on"; otherwise the second option is used.
   */
  private _modeOnOption(options: string[]): string | undefined {
    return this._config!.mode_on ?? (options.length === 2 ? options[1] : undefined);
  }

  private _modeIsOn(): boolean {
    const stateObj = this._stateObj('mode');
    if (!stateObj || !this._isAvailable(stateObj)) return false;

    const options = (stateObj.attributes.options as string[] | undefined) ?? [];
    const onOption = this._modeOnOption(options);
    if (!onOption) return false;

    return ((this._pending.mode as string | undefined) ?? stateObj.state) === onOption;
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
    'Compact animated card for an ESPHome humidifier exposed as switch/select/number entities.',
  preview: false,
  documentationURL: REPO_URL,
});

console.info(
  `%c ${CARD_NAME.toUpperCase()} %c v${VERSION} `,
  'color: white; background: #03a9f4; font-weight: 700;',
  'color: #03a9f4; background: #1c1c1c; font-weight: 700;',
);

declare global {
  interface HTMLElementTagNameMap {
    'humidifier-card': HumidifierCard;
  }
}
