/*
 * Humidifier Card - a Lovelace card for Home Assistant
 * Copyright (C) 2026 Humidifier Card contributors
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation. It is distributed WITHOUT ANY WARRANTY; see
 * the GNU General Public License in LICENSE for details.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 */

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
  { name: 'mode_on', selector: { text: {} } },
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
  mode_on: 'Mode option that counts as "on" (optional)',
  show_status: 'Show the device fault chip',
  dim_when_off: 'Disable target, fan level and mode while the humidifier is off',
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
    if (!next.mode_on) delete next.mode_on;
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
