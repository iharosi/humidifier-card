import { describe, expect, it } from 'vitest';

import { SLOTS } from '../src/const';
import { resolveEntities, validateConfig } from '../src/entities';
import type { HumidifierCardConfig } from '../src/types';

const base: HumidifierCardConfig = {
  type: 'custom:humidifier-card',
  prefix: 'office_xiaomi_smart_humidifier_2',
};

describe('resolveEntities', () => {
  it('derives all eight entity ids from the prefix', () => {
    expect(resolveEntities(base)).toEqual({
      power: 'switch.office_xiaomi_smart_humidifier_2_humidifier',
      mode: 'select.office_xiaomi_smart_humidifier_2_mode',
      fan_level: 'number.office_xiaomi_smart_humidifier_2_fan_level',
      light: 'switch.office_xiaomi_smart_humidifier_2_indicator_light',
      sound: 'switch.office_xiaomi_smart_humidifier_2_sound_buzzer',
      alarm: 'binary_sensor.office_xiaomi_smart_humidifier_2_alarm',
      connection: 'binary_sensor.office_xiaomi_smart_humidifier_2_connection_status',
      fault: 'sensor.office_xiaomi_smart_humidifier_2_device_fault',
    });
  });

  it('covers every declared slot', () => {
    expect(Object.keys(resolveEntities(base)).sort()).toEqual([...SLOTS].sort());
  });

  it('lets an explicit entity override the derived id', () => {
    const resolved = resolveEntities({ ...base, entities: { fan_level: 'number.other' } });
    expect(resolved.fan_level).toBe('number.other');
    expect(resolved.mode).toBe('select.office_xiaomi_smart_humidifier_2_mode');
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
