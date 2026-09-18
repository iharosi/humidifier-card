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

export const CARD_NAME = 'humidifier-card';
export const EDITOR_NAME = 'humidifier-card-editor';
export const VERSION = '0.6.1';
export const REPO_URL = 'https://github.com/iharosi/humidifier-card';

export type Slot =
  | 'power'
  | 'mode'
  | 'fan_level'
  | 'target_humidity'
  | 'humidity'
  | 'light'
  | 'sound'
  | 'connection'
  | 'fault';

export type NumberSlot = Extract<Slot, 'fan_level' | 'target_humidity'>;

export type PillSlot = Extract<Slot, 'light' | 'sound'>;

export const SLOTS: readonly Slot[] = [
  'power',
  'mode',
  'fan_level',
  'target_humidity',
  'humidity',
  'light',
  'sound',
  'connection',
  'fault',
] as const;

/** How each slot's entity id is derived from `prefix`. */
export const ENTITY_SUFFIXES: Record<Slot, { domain: string; suffix: string }> = {
  power: { domain: 'switch', suffix: '_humidifier' },
  mode: { domain: 'select', suffix: '_mode' },
  fan_level: { domain: 'number', suffix: '_fan_level' },
  target_humidity: { domain: 'number', suffix: '_target_humidity' },
  humidity: { domain: 'sensor', suffix: '_humidity' },
  light: { domain: 'switch', suffix: '_indicator_light' },
  sound: { domain: 'switch', suffix: '_sound_buzzer' },
  connection: { domain: 'binary_sensor', suffix: '_connection_status' },
  fault: { domain: 'sensor', suffix: '_device_fault' },
};

export const SLOT_LABELS: Record<Slot, string> = {
  power: 'Humidifier',
  mode: 'Mode',
  fan_level: 'Fan level',
  target_humidity: 'Target humidity',
  humidity: 'Humidity',
  light: 'Indicator light',
  sound: 'Sound (buzzer)',
  connection: 'Connection',
  fault: 'Device fault',
};

/** Icons for the round toggle pills next to the fan levels. */
export const PILL_ICONS: Record<PillSlot, { on: string; off: string }> = {
  light: { on: 'mdi:lightbulb', off: 'mdi:lightbulb-off-outline' },
  sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
};

/** Shown on the mode pill when the mode select is rendered as a toggle. */
export const MODE_ICON = 'mdi:auto-mode';

/** Relative humidity in % mapped to a label and the colour the card is tinted with. */
export interface HumidityLevel {
  max: number;
  label: string;
  color: string;
}

export const HUMIDITY_LEVELS: HumidityLevel[] = [
  { max: 30, label: 'Dry', color: '#fb8c00' },
  { max: 40, label: 'Slightly dry', color: '#fdd835' },
  { max: 60, label: 'Comfortable', color: '#039be5' },
  { max: 70, label: 'Humid', color: '#3949ab' },
  { max: Infinity, label: 'Very humid', color: '#8e24aa' },
];

export const UNKNOWN_HUMIDITY: HumidityLevel = {
  max: Infinity,
  label: 'Unknown',
  color: 'var(--disabled-text-color, #9e9e9e)',
};

/** Slowest and fastest mist cycle of the dial, in seconds. */
export const SPIN_SLOWEST = 3.2;
export const SPIN_FASTEST = 0.55;

/** Device-fault states that mean "nothing is wrong". */
export const NOMINAL_FAULTS = new Set(['none', 'no_faults', 'no fault', 'ok', 'normal', '0', '']);

export const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown']);
