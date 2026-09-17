export const CARD_NAME = 'humidifier-card';
export const EDITOR_NAME = 'humidifier-card-editor';
export const VERSION = '0.2.0';
export const REPO_URL = 'https://github.com/iharosi/humidifier-card';

export type Slot =
  'power' | 'mode' | 'fan_level' | 'light' | 'sound' | 'alarm' | 'connection' | 'fault';

export const SLOTS: readonly Slot[] = [
  'power',
  'mode',
  'fan_level',
  'light',
  'sound',
  'alarm',
  'connection',
  'fault',
] as const;

/** How each slot's entity id is derived from `prefix`. */
export const ENTITY_SUFFIXES: Record<Slot, { domain: string; suffix: string }> = {
  power: { domain: 'switch', suffix: '_humidifier' },
  mode: { domain: 'select', suffix: '_mode' },
  fan_level: { domain: 'number', suffix: '_fan_level' },
  light: { domain: 'switch', suffix: '_indicator_light' },
  sound: { domain: 'switch', suffix: '_sound_buzzer' },
  alarm: { domain: 'binary_sensor', suffix: '_alarm' },
  connection: { domain: 'binary_sensor', suffix: '_connection_status' },
  fault: { domain: 'sensor', suffix: '_device_fault' },
};

export const SLOT_LABELS: Record<Slot, string> = {
  power: 'Humidifier',
  mode: 'Mode',
  fan_level: 'Fan level',
  light: 'Indicator light',
  sound: 'Sound (buzzer)',
  alarm: 'Alarm',
  connection: 'Connection',
  fault: 'Device fault',
};

/** Icons for the compact strip's icon-only toggles. */
export const SLOT_TOGGLE_ICONS: Record<'light' | 'sound', { on: string; off: string }> = {
  light: { on: 'mdi:lightbulb', off: 'mdi:lightbulb-off-outline' },
  sound: { on: 'mdi:volume-high', off: 'mdi:volume-off' },
};

export const DEFAULT_ICON = 'mdi:air-humidifier';
export const DEFAULT_ICON_OFF = 'mdi:air-humidifier-off';

/** Device-fault states that mean "nothing is wrong". */
export const NOMINAL_FAULTS = new Set(['none', 'no_faults', 'no fault', 'ok', 'normal', '0', '']);

export const UNAVAILABLE_STATES = new Set(['unavailable', 'unknown']);
