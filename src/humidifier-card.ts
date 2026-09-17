import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import './editor';
import {
  CARD_NAME,
  DEFAULT_ICON,
  DEFAULT_ICON_OFF,
  EDITOR_NAME,
  NOMINAL_FAULTS,
  REPO_URL,
  SLOT_LABELS,
  UNAVAILABLE_STATES,
  VERSION,
  type Slot,
} from './const';
import { resolveEntities, validateConfig, type ResolvedEntities } from './entities';
import { cardStyles } from './styles';
import type { HassEntity, HomeAssistant, HumidifierCardConfig } from './types';

const PENDING_TIMEOUT_MS = 3000;

/** "fan_level" -> "Fan level", "setLevel" -> "SetLevel" (kept as-is when already spaced). */
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
    return { prefix: 'office_xiaomi_smart_humidifier_2' };
  }

  public setConfig(config: HumidifierCardConfig): void {
    validateConfig(config);
    this._config = { show_status: true, ...config };
    this._entities = resolveEntities(this._config);
    this._warnedMissing = false;
    this._clearAllPending();
  }

  public getCardSize(): number {
    const rows = (['mode', 'fan_level', 'light', 'sound'] as Slot[]).filter(
      (slot) => this._entities[slot],
    ).length;
    return 1 + Math.ceil(rows / 2) + (this._config?.show_status ? 1 : 0);
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

    return html`
      <ha-card>
        <div class="header">
          <ha-icon
            class=${classMap({ on: isOn && powerAvailable })}
            .icon=${this._config.icon ?? (isOn ? DEFAULT_ICON : DEFAULT_ICON_OFF)}
          ></ha-icon>
          <div
            class="title"
            tabindex="0"
            role="button"
            @click=${() => this._moreInfo(this._entities.power)}
            @keydown=${this._titleKeydown}
          >
            <span class="name">${this._title(power)}</span>
            <span class="summary">${this._summary(power)}</span>
          </div>
          <ha-switch
            .checked=${isOn}
            .disabled=${!powerAvailable}
            aria-label=${SLOT_LABELS.power}
            @change=${(ev: Event) => this._toggleSwitch('power', ev)}
          ></ha-switch>
        </div>

        <div class="rows">
          ${this._renderModeRow(isOn && powerAvailable)}
          ${this._renderFanRow(isOn && powerAvailable)} ${this._renderSwitchRow('light')}
          ${this._renderSwitchRow('sound')}
        </div>

        ${this._config.show_status ? this._renderStatus() : nothing}
      </ha-card>
    `;
  }

  private _renderModeRow(enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('mode');
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const options = (stateObj.attributes.options as string[] | undefined) ?? [];
    const value = (this._pending.mode as string | undefined) ?? stateObj.state;

    return html`
      <div class=${classMap({ row: true, disabled: !enabled && available })}>
        <span class="label">${SLOT_LABELS.mode}</span>
        ${
          available
            ? html`<ha-select
                naturalMenuWidth
                fixedMenuPosition
                .value=${options.includes(value) ? value : ''}
                .disabled=${!enabled}
                @selected=${this._modeSelected}
                @click=${(ev: Event) => ev.stopPropagation()}
                @closed=${(ev: Event) => ev.stopPropagation()}
              >
                ${options.map(
                  (option) =>
                    html`<ha-list-item .value=${option}
                      >${this._format(stateObj, option)}</ha-list-item
                    >`,
                )}
              </ha-select>`
            : html`<span class="unavailable">Unavailable</span>`
        }
      </div>
    `;
  }

  private _renderFanRow(enabled: boolean): TemplateResult | typeof nothing {
    const stateObj = this._stateObj('fan_level');
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    if (!available) {
      return html`<div class="row">
        <span class="label">${SLOT_LABELS.fan_level}</span>
        <span class="unavailable">Unavailable</span>
      </div>`;
    }

    const min = Number(stateObj.attributes.min ?? 1);
    const max = Number(stateObj.attributes.max ?? 3);
    const step = Number(stateObj.attributes.step ?? 1);
    const value = Number(this._pending.fan_level ?? stateObj.state);
    const safeValue = Number.isFinite(value) ? value : min;

    return html`
      <div class=${classMap({ row: true, disabled: !enabled })}>
        <span class="label">${SLOT_LABELS.fan_level}</span>
        <div class="slider-wrap">
          <input
            type="range"
            min=${min}
            max=${max}
            step=${step}
            .value=${String(safeValue)}
            ?disabled=${!enabled}
            aria-label=${SLOT_LABELS.fan_level}
            @input=${this._fanInput}
            @change=${this._fanChange}
          />
          <span class="value">${safeValue}</span>
        </div>
      </div>
    `;
  }

  private _renderSwitchRow(slot: 'light' | 'sound'): TemplateResult | typeof nothing {
    const stateObj = this._stateObj(slot);
    if (!stateObj) return nothing;

    const available = this._isAvailable(stateObj);
    const pending = this._pending[slot] as string | undefined;
    const checked = (pending ?? stateObj.state) === 'on';

    return html`
      <div class="row">
        <span class="label">${SLOT_LABELS[slot]}</span>
        ${
          available
            ? html`<ha-switch
                .checked=${checked}
                aria-label=${SLOT_LABELS[slot]}
                @change=${(ev: Event) => this._toggleSwitch(slot, ev)}
              ></ha-switch>`
            : html`<span class="unavailable">Unavailable</span>`
        }
      </div>
    `;
  }

  private _renderStatus(): TemplateResult | typeof nothing {
    const chips: TemplateResult[] = [];

    const connection = this._stateObj('connection');
    if (connection) {
      const online = connection.state === 'on';
      chips.push(
        this._chip(
          this._entities.connection,
          online ? 'mdi:wifi' : 'mdi:wifi-off',
          this._isAvailable(connection) ? (online ? 'Online' : 'Offline') : 'Unavailable',
          this._isAvailable(connection) && !online,
          online,
        ),
      );
    }

    const fault = this._stateObj('fault');
    if (fault) {
      const faulty = this._isAvailable(fault) && !NOMINAL_FAULTS.has(fault.state.toLowerCase());
      chips.push(
        this._chip(
          this._entities.fault,
          faulty ? 'mdi:alert-circle' : 'mdi:check-circle-outline',
          this._isAvailable(fault) ? (faulty ? this._format(fault) : 'No fault') : 'Fault unknown',
          faulty,
          !faulty && this._isAvailable(fault),
        ),
      );
    }

    const alarm = this._stateObj('alarm');
    if (alarm) {
      const active = alarm.state === 'on';
      chips.push(
        this._chip(
          this._entities.alarm,
          active ? 'mdi:bell-ring' : 'mdi:bell-outline',
          this._isAvailable(alarm) ? (active ? 'Alarm' : 'No alarm') : 'Alarm unknown',
          active,
          !active && this._isAvailable(alarm),
        ),
      );
    }

    if (!chips.length) return nothing;
    return html`<div class="status">${chips}</div>`;
  }

  private _chip(
    entityId: string | undefined,
    icon: string,
    label: string,
    bad: boolean,
    good: boolean,
  ): TemplateResult {
    return html`<span
      class=${classMap({ chip: true, bad, good })}
      role="button"
      tabindex="0"
      @click=${() => this._moreInfo(entityId)}
      @keydown=${(ev: KeyboardEvent) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          this._moreInfo(entityId);
        }
      }}
    >
      <ha-icon .icon=${icon}></ha-icon>${label}
    </span>`;
  }

  // ------------------------------------------------------------------ actions

  private _titleKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this._moreInfo(this._entities.power);
    }
  };

  private _toggleSwitch(slot: Slot, ev: Event): void {
    const entityId = this._entities[slot];
    const stateObj = this._stateObj(slot);
    if (!entityId || !stateObj || !this.hass) return;

    const checked = (ev.target as { checked?: boolean }).checked === true;
    this._setPending(slot, checked ? 'on' : 'off');
    void this.hass.callService('switch', checked ? 'turn_on' : 'turn_off', { entity_id: entityId });
  }

  private _modeSelected = (ev: Event): void => {
    const entityId = this._entities.mode;
    const stateObj = this._stateObj('mode');
    if (!entityId || !stateObj || !this.hass) return;

    const value = (ev.target as { value?: string }).value;
    if (!value || value === stateObj.state) return;

    this._setPending('mode', value);
    void this.hass.callService('select', 'select_option', { entity_id: entityId, option: value });
  };

  private _fanInput = (ev: Event): void => {
    const value = Number((ev.target as HTMLInputElement).value);
    if (Number.isFinite(value)) this._setPending('fan_level', value);
  };

  private _fanChange = (ev: Event): void => {
    const entityId = this._entities.fan_level;
    if (!entityId || !this.hass) return;

    const value = Number((ev.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) return;

    this._setPending('fan_level', value);
    void this.hass.callService('number', 'set_value', { entity_id: entityId, value });
  };

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
    return prettify(raw);
  }

  private _title(power: HassEntity): string {
    return this._config?.name ?? power.attributes.friendly_name ?? 'Humidifier';
  }

  private _summary(power: HassEntity): string {
    if (!this._isAvailable(power)) return 'Unavailable';

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
