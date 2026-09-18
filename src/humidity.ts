import { HUMIDITY_LEVELS, UNKNOWN_HUMIDITY, type HumidityLevel } from './const';
import type { HassEntity } from './types';

/** The numeric state of an entity, or null when it is not a number. */
export function numericState(entity?: HassEntity): number | null {
  if (!entity) return null;
  const value = Number.parseFloat(entity.state);
  return Number.isNaN(value) ? null : value;
}

export function humidityLevel(value: number | null): HumidityLevel {
  if (value === null) return UNKNOWN_HUMIDITY;
  return HUMIDITY_LEVELS.find((level) => value <= level.max) ?? UNKNOWN_HUMIDITY;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
