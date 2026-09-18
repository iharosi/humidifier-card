import { describe, expect, it } from 'vitest';

import { humidityLevel, numericState } from '../src/humidity';
import type { HassEntity } from '../src/types';

const sensor = (state: string) =>
  ({
    entity_id: 'sensor.x',
    state,
    attributes: {},
    last_changed: '',
    last_updated: '',
  }) as HassEntity;

describe('humidityLevel', () => {
  it.each([
    [10, 'Dry'],
    [30, 'Dry'],
    [30.5, 'Slightly dry'],
    [40, 'Slightly dry'],
    [48, 'Comfortable'],
    [60, 'Comfortable'],
    [65, 'Humid'],
    [70, 'Humid'],
    [85, 'Very humid'],
  ])('%s%% is %s', (value, label) => {
    expect(humidityLevel(value).label).toBe(label);
  });

  it('is Unknown without a reading', () => {
    expect(humidityLevel(null).label).toBe('Unknown');
  });
});

describe('numericState', () => {
  it('parses numbers and rejects everything else', () => {
    expect(numericState(sensor('48.5'))).toBe(48.5);
    expect(numericState(sensor('unavailable'))).toBeNull();
    expect(numericState(undefined)).toBeNull();
  });
});
