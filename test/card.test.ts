// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../src/humidifier-card';
import type { HassEntity, HomeAssistant, HumidifierCardConfig } from '../src/types';

const PREFIX = 'office_xiaomi_smart_humidifier_2';

function entity(entity_id: string, state: string, attributes: Record<string, unknown> = {}) {
  return { entity_id, state, attributes, last_changed: '', last_updated: '' } as HassEntity;
}

function makeHass(overrides: Record<string, HassEntity> = {}): HomeAssistant {
  const states: Record<string, HassEntity> = {
    [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'on', {
      friendly_name: 'Humidifier',
    }),
    [`select.${PREFIX}_mode`]: entity(`select.${PREFIX}_mode`, 'auto', {
      options: ['auto', 'sleep', 'manual'],
    }),
    [`number.${PREFIX}_fan_level`]: entity(`number.${PREFIX}_fan_level`, '2', {
      min: 1,
      max: 3,
      step: 1,
    }),
    [`switch.${PREFIX}_indicator_light`]: entity(`switch.${PREFIX}_indicator_light`, 'on'),
    [`switch.${PREFIX}_sound_buzzer`]: entity(`switch.${PREFIX}_sound_buzzer`, 'off'),
    [`binary_sensor.${PREFIX}_alarm`]: entity(`binary_sensor.${PREFIX}_alarm`, 'off'),
    [`binary_sensor.${PREFIX}_connection_status`]: entity(
      `binary_sensor.${PREFIX}_connection_status`,
      'on',
    ),
    [`sensor.${PREFIX}_device_fault`]: entity(`sensor.${PREFIX}_device_fault`, 'none'),
    ...overrides,
  };

  return {
    states,
    themes: {},
    language: 'en',
    localize: (key: string) => key,
    callService: vi.fn().mockResolvedValue(undefined),
  } as unknown as HomeAssistant;
}

async function mount(config: Partial<HumidifierCardConfig> = {}, hass = makeHass()) {
  const card = document.createElement('humidifier-card');
  card.setConfig({ type: 'custom:humidifier-card', prefix: PREFIX, ...config });
  card.hass = hass;
  document.body.appendChild(card);
  await card.updateComplete;
  return { card, hass };
}

describe('humidifier-card element', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('registers the card and its editor', () => {
    expect(customElements.get('humidifier-card')).toBeDefined();
    expect(customElements.get('humidifier-card-editor')).toBeDefined();
  });

  it('advertises itself to the dashboard card picker', () => {
    expect(window.customCards?.some((c) => c.type === 'humidifier-card')).toBe(true);
  });

  it('rejects a config without prefix or power entity', () => {
    const card = document.createElement('humidifier-card');
    expect(() => card.setConfig({ type: 'custom:humidifier-card' })).toThrow(/prefix/);
  });

  it('renders the name, every control row and the status chips', async () => {
    const { card } = await mount({ name: 'Office Humidifier' });
    const text = card.shadowRoot!.textContent ?? '';

    expect(text).toContain('Office Humidifier');
    expect(text).toContain('On · Auto · Fan 2');
    expect(text).toContain('Mode');
    expect(text).toContain('Fan level');
    expect(text).toContain('Indicator light');
    expect(text).toContain('Sound (buzzer)');
    expect(text).toContain('Online');
    expect(text).toContain('No fault');
    expect(text).toContain('No alarm');
  });

  it('builds the mode dropdown from the select entity options', async () => {
    const { card } = await mount();
    const items = [...card.shadowRoot!.querySelectorAll('ha-list-item')];
    expect(items.map((i) => i.textContent?.trim())).toEqual(['Auto', 'Sleep', 'Manual']);
  });

  it('honours the number entity min/max/step on the slider', async () => {
    const { card } = await mount();
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect([slider.min, slider.max, slider.step, slider.value]).toEqual(['1', '3', '1', '2']);
  });

  it('keeps mode and fan usable while the humidifier is off', async () => {
    const hass = makeHass({
      [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'off'),
    });
    const { card } = await mount({}, hass);

    expect(card.shadowRoot!.querySelectorAll('.row.disabled').length).toBe(0);
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider.disabled).toBe(false);
  });

  it('dims mode and fan rows while off when dim_when_off is set', async () => {
    const hass = makeHass({
      [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'off'),
    });
    const { card } = await mount({ dim_when_off: true }, hass);

    expect(card.shadowRoot!.querySelectorAll('.row.disabled').length).toBe(2);
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(slider.disabled).toBe(true);
  });

  it('still sets the fan level while the humidifier is off', async () => {
    const hass = makeHass({
      [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'off'),
    });
    const { card } = await mount({}, hass);
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;

    slider.value = '1';
    slider.dispatchEvent(new Event('change'));

    expect(hass.callService).toHaveBeenCalledWith('number', 'set_value', {
      entity_id: `number.${PREFIX}_fan_level`,
      value: 1,
    });
  });

  it('calls number.set_value when the fan slider is committed', async () => {
    const { card, hass } = await mount();
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;

    slider.value = '3';
    slider.dispatchEvent(new Event('change'));

    expect(hass.callService).toHaveBeenCalledWith('number', 'set_value', {
      entity_id: `number.${PREFIX}_fan_level`,
      value: 3,
    });
  });

  it('keeps showing the optimistic fan value until Home Assistant catches up', async () => {
    const { card } = await mount();
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;

    slider.value = '3';
    slider.dispatchEvent(new Event('change'));
    await card.updateComplete;

    expect(card.shadowRoot!.querySelector('.value')!.textContent).toBe('3');
  });

  it('shows Unavailable instead of a control for an unavailable entity', async () => {
    const hass = makeHass({
      [`select.${PREFIX}_mode`]: entity(`select.${PREFIX}_mode`, 'unavailable'),
    });
    const { card } = await mount({}, hass);

    expect(card.shadowRoot!.querySelector('ha-select')).toBeNull();
    expect(card.shadowRoot!.textContent).toContain('Unavailable');
  });

  it('flags an active alarm and a real device fault', async () => {
    const hass = makeHass({
      [`binary_sensor.${PREFIX}_alarm`]: entity(`binary_sensor.${PREFIX}_alarm`, 'on'),
      [`sensor.${PREFIX}_device_fault`]: entity(`sensor.${PREFIX}_device_fault`, 'no_water'),
      [`binary_sensor.${PREFIX}_connection_status`]: entity(
        `binary_sensor.${PREFIX}_connection_status`,
        'off',
      ),
    });
    const { card } = await mount({}, hass);

    const bad = [...card.shadowRoot!.querySelectorAll('.chip.bad')].map((c) =>
      c.textContent?.trim(),
    );
    expect(bad).toEqual(['Offline', 'No water', 'Alarm']);
  });

  it('omits hidden rows and the status row when switched off', async () => {
    const { card } = await mount({ hide: ['sound', 'light'], show_status: false });
    const text = card.shadowRoot!.textContent ?? '';

    expect(text).not.toContain('Sound (buzzer)');
    expect(text).not.toContain('Indicator light');
    expect(card.shadowRoot!.querySelector('.status')).toBeNull();
  });

  it('renders a configuration warning when the power entity does not exist', async () => {
    const { card } = await mount({ prefix: 'nope' }, makeHass());
    expect(card.shadowRoot!.querySelector('.warning')!.textContent).toContain('not found');
  });

  it('turns the humidifier off through switch.turn_off', async () => {
    const { card, hass } = await mount();
    const toggle = card.shadowRoot!.querySelector('ha-switch') as HTMLElement & {
      checked: boolean;
    };

    toggle.checked = false;
    toggle.dispatchEvent(new Event('change'));

    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
      entity_id: `switch.${PREFIX}_humidifier`,
    });
  });

  it('fires hass-more-info when the title is tapped', async () => {
    const { card } = await mount();
    const handler = vi.fn();
    card.addEventListener('hass-more-info', handler);

    (card.shadowRoot!.querySelector('.title') as HTMLElement).click();

    expect(handler).toHaveBeenCalled();
    expect(handler.mock.calls[0][0].detail).toEqual({
      entityId: `switch.${PREFIX}_humidifier`,
    });
  });
});
