import { LitElement, html, nothing, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { EDITOR_NAME, SLOTS, SLOT_LABELS, type Slot } from './const';
import type { HomeAssistant, HumidifierCardConfig } from './types';

interface HaFormSchema {
  name: string;
  selector: Record<string, unknown>;
  required?: boolean;
}

const SCHEMA: HaFormSchema[] = [
  { name: 'prefix', required: true, selector: { text: {} } },
  { name: 'name', selector: { text: {} } },
  { name: 'icon', selector: { icon: {} } },
  { name: 'show_status', selector: { boolean: {} } },
  { name: 'dim_when_off', selector: { boolean: {} } },
  {
    name: 'hide',
    selector: {
      select: {
        multiple: true,
        mode: 'list',
        options: SLOTS.map((slot) => ({ value: slot, label: SLOT_LABELS[slot] })),
      },
    },
  },
];

const LABELS: Record<string, string> = {
  prefix: 'Entity prefix (e.g. smart_humidifier)',
  name: 'Name (optional)',
  icon: 'Icon (optional)',
  show_status: 'Show status row',
  dim_when_off: 'Grey out mode and fan level while the humidifier is off',
  hide: 'Hide these controls',
};

@customElement(EDITOR_NAME)
export class HumidifierCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: HumidifierCardConfig;

  public setConfig(config: HumidifierCardConfig): void {
    this._config = config;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(schema: HaFormSchema) => LABELS[schema.name] ?? schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged = (ev: CustomEvent<{ value: HumidifierCardConfig }>): void => {
    ev.stopPropagation();
    const next: HumidifierCardConfig = { ...ev.detail.value };

    // ha-form hands back empty strings / empty lists for cleared fields; drop them so the
    // generated YAML stays minimal.
    if (!next.name) delete next.name;
    if (!next.icon) delete next.icon;
    if (!next.hide?.length) delete next.hide;
    if (next.hide) next.hide = next.hide.filter((slot) => SLOTS.includes(slot as Slot));

    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: next },
        bubbles: true,
        composed: true,
      }),
    );
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'humidifier-card-editor': HumidifierCardEditor;
  }
}
