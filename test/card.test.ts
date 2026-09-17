// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

import '../src/humidifier-card';
import type { HassEntity, HomeAssistant, HumidifierCardConfig } from '../src/types';

const PREFIX = 'smart_humidifier';

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

const toggles = (card: HTMLElement) =>
  [...card.shadowRoot!.querySelectorAll('.icon-toggle')] as HTMLButtonElement[];

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

  it('renders the name, one control strip and no entity rows', async () => {
    const { card } = await mount({ name: 'Office Humidifier' });
    const root = card.shadowRoot!;

    expect(root.textContent).toContain('Office Humidifier');
    expect(root.querySelector('.strip')).not.toBeNull();
    expect(root.querySelectorAll('.row').length).toBe(0);
    expect(root.querySelector('ha-select')).not.toBeNull();
    expect(root.querySelector('input[type="range"]')).not.toBeNull();
    expect(card.getCardSize()).toBe(2);
  });

  it('puts power, light and buzzer in the strip as icon toggles', async () => {
    const { card } = await mount();
    const buttons = toggles(card);

    expect(buttons.map((b) => b.getAttribute('title'))).toEqual([
      'Humidifier',
      'Indicator light',
      'Sound (buzzer)',
    ]);
    expect(buttons[0].classList.contains('power')).toBe(true);
    // power on, light on, buzzer off
    expect(buttons.map((b) => b.classList.contains('on'))).toEqual([true, true, false]);
  });

  it('calls the switch services from the icon toggles', async () => {
    const { card, hass } = await mount();
    const [power, light, sound] = toggles(card);

    power.click();
    light.click();
    sound.click();

    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
      entity_id: `switch.${PREFIX}_humidifier`,
    });
    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
      entity_id: `switch.${PREFIX}_indicator_light`,
    });
    expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_on', {
      entity_id: `switch.${PREFIX}_sound_buzzer`,
    });
  });

  it('shows the device fault on the second title line', async () => {
    const { card } = await mount();
    expect(card.shadowRoot!.querySelector('.sub')!.textContent).toContain('No fault');
  });

  it('highlights a real device fault', async () => {
    const hass = makeHass({
      [`sensor.${PREFIX}_device_fault`]: entity(`sensor.${PREFIX}_device_fault`, 'no_water'),
    });
    const { card } = await mount({}, hass);
    const sub = card.shadowRoot!.querySelector('.sub')!;

    expect(sub.textContent).toContain('No water');
    expect(sub.classList.contains('bad')).toBe(true);
  });

  it('falls back to the power summary when there is no fault entity', async () => {
    const { card } = await mount({ hide: ['fault'] });
    expect(card.shadowRoot!.querySelector('.sub')!.textContent).toContain('On · Auto · Fan 2');
  });

  it('opens more-info for the fault entity from the subline', async () => {
    const { card } = await mount();
    const handler = vi.fn();
    card.addEventListener('hass-more-info', handler);

    (card.shadowRoot!.querySelector('.sub') as HTMLElement).click();

    expect(handler.mock.calls[0][0].detail).toEqual({
      entityId: `sensor.${PREFIX}_device_fault`,
    });
  });

  it('shows connection as a single icon and flags it when offline', async () => {
    const { card: online } = await mount();
    expect(online.shadowRoot!.querySelector('.conn')!.classList.contains('bad')).toBe(false);

    const hass = makeHass({
      [`binary_sensor.${PREFIX}_connection_status`]: entity(
        `binary_sensor.${PREFIX}_connection_status`,
        'off',
      ),
    });
    const { card: offline } = await mount({}, hass);
    const conn = offline.shadowRoot!.querySelector('.conn')!;

    expect(conn.classList.contains('bad')).toBe(true);
    expect(conn.getAttribute('title')).toBe('Offline');
  });

  it('has no alarm indicator', async () => {
    const hass = makeHass({
      [`binary_sensor.${PREFIX}_alarm`]: entity(`binary_sensor.${PREFIX}_alarm`, 'on'),
    });
    const { card } = await mount({}, hass);

    expect(card.shadowRoot!.textContent).not.toContain('Alarm');
  });

  it('rejects alarm as a configured slot', async () => {
    const card = document.createElement('humidifier-card');
    expect(() =>
      card.setConfig({
        type: 'custom:humidifier-card',
        prefix: PREFIX,
        hide: ['alarm' as never],
      }),
    ).toThrow(/unknown slot/);
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
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;

    expect(slider.disabled).toBe(false);
    expect((card.shadowRoot!.querySelector('ha-select') as { disabled?: boolean }).disabled).toBe(
      false,
    );
  });

  it('disables mode and fan while off when dim_when_off is set', async () => {
    const hass = makeHass({
      [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'off'),
    });
    const { card } = await mount({ dim_when_off: true }, hass);
    const slider = card.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;

    expect(slider.disabled).toBe(true);
    expect((card.shadowRoot!.querySelector('ha-select') as { disabled?: boolean }).disabled).toBe(
      true,
    );
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

  it('disables the control for an unavailable entity', async () => {
    const hass = makeHass({
      [`select.${PREFIX}_mode`]: entity(`select.${PREFIX}_mode`, 'unavailable'),
      [`switch.${PREFIX}_sound_buzzer`]: entity(`switch.${PREFIX}_sound_buzzer`, 'unavailable'),
    });
    const { card } = await mount({}, hass);

    expect((card.shadowRoot!.querySelector('ha-select') as { disabled?: boolean }).disabled).toBe(
      true,
    );
    expect(toggles(card).find((b) => b.title === 'Sound (buzzer)')!.disabled).toBe(true);
  });

  it('omits hidden controls and the status indicators', async () => {
    const { card } = await mount({ hide: ['light', 'sound'], show_status: false });
    const root = card.shadowRoot!;

    expect(toggles(card).length).toBe(1);
    expect(root.querySelector('.conn')).toBeNull();
    expect(root.querySelector('.sub')!.textContent).toContain('On · Auto · Fan 2');
  });

  it('renders a configuration warning when the power entity does not exist', async () => {
    const { card } = await mount({ prefix: 'nope' }, makeHass());
    expect(card.shadowRoot!.querySelector('.warning')!.textContent).toContain('not found');
  });

  it('fires hass-more-info when the name is tapped', async () => {
    const { card } = await mount();
    const handler = vi.fn();
    card.addEventListener('hass-more-info', handler);

    (card.shadowRoot!.querySelector('.name') as HTMLElement).click();

    expect(handler.mock.calls[0][0].detail).toEqual({
      entityId: `switch.${PREFIX}_humidifier`,
    });
  });
});
