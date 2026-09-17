import { describe, expect, it } from 'vitest';

import { SLOTS } from '../src/const';
import { resolveEntities, validateConfig } from '../src/entities';
import type { HumidifierCardConfig } from '../src/types';

const base: HumidifierCardConfig = {
  type: 'custom:humidifier-card',
  prefix: 'smart_humidifier',
};

describe('resolveEntities', () => {
  it('derives all eight entity ids from the prefix', () => {
    expect(resolveEntities(base)).toEqual({
      power: 'switch.smart_humidifier_humidifier',
      mode: 'select.smart_humidifier_mode',
      fan_level: 'number.smart_humidifier_fan_level',
      light: 'switch.smart_humidifier_indicator_light',
      sound: 'switch.smart_humidifier_sound_buzzer',
      connection: 'binary_sensor.smart_humidifier_connection_status',
      fault: 'sensor.smart_humidifier_device_fault',
    });
  });

  it('covers every declared slot', () => {
    expect(Object.keys(resolveEntities(base)).sort()).toEqual([...SLOTS].sort());
  });

  it('lets an explicit entity override the derived id', () => {
    const resolved = resolveEntities({ ...base, entities: { fan_level: 'number.other' } });
    expect(resolved.fan_level).toBe('number.other');
    expect(resolved.mode).toBe('select.smart_humidifier_mode');
  });

  it('omits hidden slots', () => {
    const resolved = resolveEntities({ ...base, hide: ['sound', 'fault'] });
    expect(resolved.sound).toBeUndefined();
    expect(resolved.fault).toBeUndefined();
    expect(resolved.power).toBeDefined();
  });

  it('works with no prefix when entities are given explicitly', () => {
    const resolved = resolveEntities({
      type: 'custom:humidifier-card',
      entities: { power: 'switch.a', mode: 'select.b' },
    });
    expect(resolved).toEqual({ power: 'switch.a', mode: 'select.b' });
  });
});

describe('validateConfig', () => {
  it('accepts a prefix-only config', () => {
    expect(() => validateConfig(base)).not.toThrow();
  });

  it('accepts an explicit power entity without a prefix', () => {
    expect(() =>
      validateConfig({ type: 'custom:humidifier-card', entities: { power: 'switch.a' } }),
    ).not.toThrow();
  });

  it('rejects a config with neither prefix nor power entity', () => {
    expect(() =>
      validateConfig({ type: 'custom:humidifier-card', entities: { mode: 'select.b' } }),
    ).toThrow(/prefix/);
  });

  it('rejects unknown slot names', () => {
    expect(() => validateConfig({ ...base, hide: ['humidity' as never] })).toThrow(/unknown slot/);
    expect(() => validateConfig({ ...base, entities: { humidity: 'sensor.x' } as never })).toThrow(
      /unknown slot/,
    );
  });

  it('rejects a non-list hide value', () => {
    expect(() => validateConfig({ ...base, hide: 'sound' as never })).toThrow(/must be a list/);
  });
});
