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
    [`select.${PREFIX}_mode`]: entity(`select.${PREFIX}_mode`, 'None', {
      options: ['None', 'Constant Humidity'],
    }),
    [`number.${PREFIX}_fan_level`]: entity(`number.${PREFIX}_fan_level`, '2', {
      min: 0,
      max: 3,
      step: 1,
    }),
    [`number.${PREFIX}_target_humidity`]: entity(`number.${PREFIX}_target_humidity`, '55', {
      min: 40,
      max: 70,
      step: 1,
      unit_of_measurement: '%',
    }),
    [`sensor.${PREFIX}_humidity`]: entity(`sensor.${PREFIX}_humidity`, '48', {
      unit_of_measurement: '%',
    }),
    [`switch.${PREFIX}_indicator_light`]: entity(`switch.${PREFIX}_indicator_light`, 'on'),
    [`switch.${PREFIX}_sound_buzzer`]: entity(`switch.${PREFIX}_sound_buzzer`, 'off'),
    [`binary_sensor.${PREFIX}_connection_status`]: entity(
      `binary_sensor.${PREFIX}_connection_status`,
      'on',
    ),
    [`sensor.${PREFIX}_device_fault`]: entity(`sensor.${PREFIX}_device_fault`, 'No Fault'),
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

const $ = <T extends Element = HTMLElement>(card: HTMLElement, selector: string) =>
  card.shadowRoot!.querySelector(selector) as T | null;
const $$ = <T extends Element = HTMLElement>(card: HTMLElement, selector: string) =>
  [...card.shadowRoot!.querySelectorAll(selector)] as T[];

const slider = (card: HTMLElement) => $<HTMLInputElement>(card, 'input[type="range"]')!;
const fanPills = (card: HTMLElement) => $$<HTMLButtonElement>(card, '.levels .preset');
const togglePills = (card: HTMLElement) => $$<HTMLButtonElement>(card, '.toggles .preset');
const modePill = (card: HTMLElement) => togglePills(card)[0];
const text = (el: Element | null) => el?.textContent?.replace(/\s+/g, ' ').trim();

const off = (slot: string, domain = 'switch') => ({
  [`${domain}.${PREFIX}_${slot}`]: entity(`${domain}.${PREFIX}_${slot}`, 'off'),
});

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

  it('renders a warning when the power entity does not exist', async () => {
    const { card } = await mount({ prefix: 'nope' });
    expect(text($(card, '.warning'))).toContain('not found');
  });

  describe('layout', () => {
    it('renders dial, head, slider, chips and presets', async () => {
      const { card } = await mount({ name: 'Office Humidifier' });

      expect($(card, '.visual')).not.toBeNull();
      expect(text($(card, '.name'))).toBe('Office Humidifier');
      expect(text($(card, '.pct'))).toBe('55%');
      expect($(card, '.power')).not.toBeNull();
      expect(slider(card)).not.toBeNull();
      expect($(card, '.chip.humidity')).not.toBeNull();
      expect($(card, '.chip.status')).not.toBeNull();
      expect($(card, '.presets')).not.toBeNull();
      expect(card.getCardSize()).toBe(3);
    });

    it('falls back to the power entity name', async () => {
      const { card } = await mount();
      expect(text($(card, '.name'))).toBe('Humidifier');
    });

    it('has no alarm indicator and rejects alarm as a slot', async () => {
      const hass = makeHass({
        [`binary_sensor.${PREFIX}_alarm`]: entity(`binary_sensor.${PREFIX}_alarm`, 'on'),
      });
      const { card } = await mount({}, hass);
      expect(card.shadowRoot!.textContent).not.toContain('Alarm');

      const bad = document.createElement('humidifier-card');
      expect(() =>
        bad.setConfig({ type: 'custom:humidifier-card', prefix: PREFIX, hide: ['alarm' as never] }),
      ).toThrow(/unknown slot/);
    });
  });

  describe('power', () => {
    it('toggles from the power button', async () => {
      const { card, hass } = await mount();
      $(card, '.power')!.click();

      expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
        entity_id: `switch.${PREFIX}_humidifier`,
      });
    });

    it('toggles from the dial', async () => {
      const { card, hass } = await mount({}, makeHass(off('humidifier')));
      $(card, '.visual')!.click();

      expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_on', {
        entity_id: `switch.${PREFIX}_humidifier`,
      });
    });

    it('shows Off and greys the card out while off', async () => {
      const { card } = await mount({}, makeHass(off('humidifier')));

      expect(text($(card, '.pct'))).toBe('Off');
      expect($(card, '.visual')!.classList.contains('off')).toBe(true);
      expect($(card, 'ha-card')!.getAttribute('style')).toContain('var(--hc-idle-color)');
    });

    it('marks the whole card unavailable when the power switch is', async () => {
      const hass = makeHass({
        [`switch.${PREFIX}_humidifier`]: entity(`switch.${PREFIX}_humidifier`, 'unavailable'),
      });
      const { card } = await mount({}, hass);

      expect($(card, 'ha-card')!.classList.contains('unavailable')).toBe(true);
      expect(text($(card, '.pct'))).toBe('–');
    });

    it('opens more-info for the power switch from the name', async () => {
      const { card } = await mount();
      const handler = vi.fn();
      card.addEventListener('hass-more-info', handler);

      $(card, '.name')!.click();

      expect(handler.mock.calls[0][0].detail).toEqual({ entityId: `switch.${PREFIX}_humidifier` });
    });
  });

  describe('dial', () => {
    it('fills the ring to the current humidity', async () => {
      const { card } = await mount();
      const ring = $(card, '.ring-value')!;
      const circumference = Number(ring.getAttribute('stroke-dasharray'));
      const offset = Number(ring.getAttribute('stroke-dashoffset'));

      expect(1 - offset / circumference).toBeCloseTo(0.48, 2);
    });

    it('marks the target humidity on the ring', async () => {
      const { card } = await mount();
      expect($(card, '.target-mark')).not.toBeNull();
    });

    it('runs the mist faster at a higher fan level', async () => {
      const spin = async (level: string) => {
        const hass = makeHass({
          [`number.${PREFIX}_fan_level`]: entity(`number.${PREFIX}_fan_level`, level, {
            min: 0,
            max: 3,
            step: 1,
          }),
        });
        const { card } = await mount({}, hass);
        return Number.parseFloat($(card, '.visual')!.style.getPropertyValue('--spin'));
      };

      expect(await spin('3')).toBeLessThan(await spin('1'));
    });
  });

  describe('humidity', () => {
    it('labels and tints the current humidity', async () => {
      const { card } = await mount();

      expect(text($(card, '.chip.humidity'))).toBe('Comfortable · 48%');
      expect($(card, 'ha-card')!.getAttribute('style')).toContain('#039be5');
    });

    it('turns orange when the room is dry', async () => {
      const hass = makeHass({
        [`sensor.${PREFIX}_humidity`]: entity(`sensor.${PREFIX}_humidity`, '24'),
      });
      const { card } = await mount({}, hass);

      expect(text($(card, '.chip.humidity'))).toContain('Dry');
      expect($(card, 'ha-card')!.getAttribute('style')).toContain('#fb8c00');
    });

    it('keeps the chip dot coloured while off', async () => {
      const { card } = await mount({}, makeHass(off('humidifier')));
      expect($(card, '.chip.humidity .dot')!.getAttribute('style')).toContain('#039be5');
    });

    it('opens more-info for the humidity sensor', async () => {
      const { card } = await mount();
      const handler = vi.fn();
      card.addEventListener('hass-more-info', handler);

      $(card, '.chip.humidity')!.click();

      expect(handler.mock.calls[0][0].detail).toEqual({ entityId: `sensor.${PREFIX}_humidity` });
    });
  });

  describe('target humidity', () => {
    it('honours the number entity range', async () => {
      const { card } = await mount();
      const input = slider(card);
      expect([input.min, input.max, input.step, input.value]).toEqual(['40', '70', '1', '55']);
    });

    it('sets the target on commit and shows it straight away', async () => {
      const { card, hass } = await mount();
      const input = slider(card);

      input.value = '60';
      input.dispatchEvent(new Event('change'));
      await card.updateComplete;

      expect(hass.callService).toHaveBeenCalledWith('number', 'set_value', {
        entity_id: `number.${PREFIX}_target_humidity`,
        value: 60,
      });
      expect(text($(card, '.pct'))).toBe('60%');
    });

    it('follows the slider while dragging without calling the service', async () => {
      const { card, hass } = await mount();
      const input = slider(card);

      input.value = '65';
      input.dispatchEvent(new Event('input'));
      await card.updateComplete;

      expect(text($(card, '.pct'))).toBe('65%');
      expect(hass.callService).not.toHaveBeenCalled();
    });
  });

  describe('status chip', () => {
    it('shows No fault by default', async () => {
      const { card } = await mount();
      const chip = $(card, '.chip.status')!;

      expect(text(chip)).toBe('No fault');
      expect(chip.classList.contains('bad')).toBe(false);
    });

    it('highlights a real device fault', async () => {
      const hass = makeHass({
        [`sensor.${PREFIX}_device_fault`]: entity(
          `sensor.${PREFIX}_device_fault`,
          'Insufficient Water',
        ),
      });
      const { card } = await mount({}, hass);
      const chip = $(card, '.chip.status')!;

      expect(text(chip)).toBe('Insufficient Water');
      expect(chip.classList.contains('bad')).toBe(true);
    });

    it('shows Offline ahead of the fault', async () => {
      const hass = makeHass(off('connection_status', 'binary_sensor'));
      const { card } = await mount({}, hass);
      const chip = $(card, '.chip.status')!;

      expect(text(chip)).toBe('Offline');
      expect(chip.classList.contains('bad')).toBe(true);
    });

    it('opens more-info for the fault sensor', async () => {
      const { card } = await mount();
      const handler = vi.fn();
      card.addEventListener('hass-more-info', handler);

      $(card, '.chip.status')!.click();

      expect(handler.mock.calls[0][0].detail).toEqual({
        entityId: `sensor.${PREFIX}_device_fault`,
      });
    });

    it('is hidden with show_status: false', async () => {
      const { card } = await mount({ show_status: false });
      expect($(card, '.chip.status')).toBeNull();
    });
  });

  describe('fan level pills', () => {
    it('renders one pill per level and marks the current one', async () => {
      const { card } = await mount();
      const pills = fanPills(card);

      expect(pills.map(text)).toEqual(['0', '1', '2', '3']);
      expect(pills.map((p) => p.classList.contains('active'))).toEqual([false, false, true, false]);
    });

    it('sets the fan level on tap', async () => {
      const { card, hass } = await mount();
      fanPills(card)[3].click();

      expect(hass.callService).toHaveBeenCalledWith('number', 'set_value', {
        entity_id: `number.${PREFIX}_fan_level`,
        value: 3,
      });
    });
  });

  describe('toggle pills', () => {
    it('shows mode, light and buzzer in that order', async () => {
      const { card } = await mount();
      expect(togglePills(card).map((p) => p.title)).toEqual([
        'Mode: None',
        'Indicator light',
        'Sound (buzzer)',
      ]);
    });

    it('calls the switch services for light and buzzer', async () => {
      const { card, hass } = await mount();
      const [, light, sound] = togglePills(card);

      light.click();
      sound.click();

      expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_off', {
        entity_id: `switch.${PREFIX}_indicator_light`,
      });
      expect(hass.callService).toHaveBeenCalledWith('switch', 'turn_on', {
        entity_id: `switch.${PREFIX}_sound_buzzer`,
      });
    });

    it('disables a pill whose entity is unavailable', async () => {
      const hass = makeHass({
        [`switch.${PREFIX}_sound_buzzer`]: entity(`switch.${PREFIX}_sound_buzzer`, 'unavailable'),
      });
      const { card } = await mount({}, hass);
      expect(togglePills(card)[2].disabled).toBe(true);
    });
  });

  describe('mode', () => {
    const withMode = (state: string, options = ['None', 'Constant Humidity']) =>
      makeHass({ [`select.${PREFIX}_mode`]: entity(`select.${PREFIX}_mode`, state, { options }) });

    it('treats the second option as on', async () => {
      const { card: on } = await mount({}, withMode('Constant Humidity'));
      const { card: offCard } = await mount({}, withMode('None'));

      expect(modePill(on).classList.contains('active')).toBe(true);
      expect(modePill(offCard).classList.contains('active')).toBe(false);
    });

    it('flips to the other option on tap', async () => {
      const { card, hass } = await mount({}, withMode('None'));
      modePill(card).click();

      expect(hass.callService).toHaveBeenCalledWith('select', 'select_option', {
        entity_id: `select.${PREFIX}_mode`,
        option: 'Constant Humidity',
      });
    });

    it('lets mode_on pick which option means on', async () => {
      const { card } = await mount({ mode_on: 'None' }, withMode('None'));
      expect(modePill(card).classList.contains('active')).toBe(true);
    });

    it('steps through a longer list with one text pill', async () => {
      const { card, hass } = await mount({}, withMode('auto', ['auto', 'sleep', 'manual']));
      const pill = modePill(card);

      expect(text(pill)).toBe('Auto');
      pill.click();

      expect(hass.callService).toHaveBeenCalledWith('select', 'select_option', {
        entity_id: `select.${PREFIX}_mode`,
        option: 'sleep',
      });
    });

    it('locks the target slider while constant humidity is on', async () => {
      const { card: on } = await mount({}, withMode('Constant Humidity'));
      const { card: offCard } = await mount({}, withMode('None'));

      expect(slider(on).disabled).toBe(true);
      expect(slider(offCard).disabled).toBe(false);
    });

    it('locks the slider as soon as the mode pill is tapped', async () => {
      const { card } = await mount({}, withMode('None'));
      modePill(card).click();
      await card.updateComplete;

      expect(slider(card).disabled).toBe(true);
    });
  });

  describe('while off', () => {
    it('keeps target, fan level and mode usable by default', async () => {
      const { card } = await mount({}, makeHass(off('humidifier')));

      expect(slider(card).disabled).toBe(false);
      expect(fanPills(card).every((p) => !p.disabled)).toBe(true);
      expect(modePill(card).disabled).toBe(false);
    });

    it('disables them with dim_when_off', async () => {
      const { card } = await mount({ dim_when_off: true }, makeHass(off('humidifier')));

      expect(slider(card).disabled).toBe(true);
      expect(fanPills(card).every((p) => p.disabled)).toBe(true);
      expect(modePill(card).disabled).toBe(true);
      // light and buzzer are not device settings the power state affects
      expect(togglePills(card)[1].disabled).toBe(false);
    });
  });

  describe('hide', () => {
    it('drops the hidden parts', async () => {
      const { card } = await mount({
        hide: ['target_humidity', 'humidity', 'fan_level', 'light', 'sound', 'mode'],
      });

      expect($(card, 'input[type="range"]')).toBeNull();
      expect($(card, '.chip.humidity')).toBeNull();
      expect($(card, '.target-mark')).toBeNull();
      expect($(card, '.presets')).toBeNull();
      expect(text($(card, '.pct'))).toBe('On');
    });
  });
});
