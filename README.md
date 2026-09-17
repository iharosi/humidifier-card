# Humidifier Card

A Lovelace card for a humidifier that Home Assistant exposes as **separate ESPHome entities**
(`switch` / `select` / `number` / `binary_sensor` / `sensor`) rather than as a single
`humidifier.*` or `fan.*` entity — for example a Xiaomi Smart Humidifier 2 flashed with ESPHome.

![Humidifier Card layout](docs/card-layout.svg)

*Layout illustration — the card picks up your own Home Assistant theme.*

- One `prefix:` line configures all seven entities.
- Two lines: name with the live device fault, then one strip of controls.
- Round buttons for power, indicator light and buzzer; mode and fan level stay usable while the humidifier is off.
- Device fault is shown by default and turns red when the humidifier reports one.
- Optimistic updates, so the slider does not snap back while you drag it.
- Follows your Home Assistant theme — no hardcoded colours.
- Ships with a GUI editor.

## Installation

### HACS (recommended)

1. HACS → ⋮ (top right) → **Custom repositories**
2. Repository: `https://github.com/iharosi/humidifier-card`
3. Type: **Dashboard** — on older HACS this is called **Plugin** or **Lovelace**
4. Search HACS for **Humidifier Card**, download it, then hard-refresh the browser
   (<kbd>Ctrl/Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>)

> Picking **Integration** by mistake fails with *"Repository structure for v0.1.0 is not
> compliant"* — integrations need a `custom_components/` folder, which a dashboard card
> does not have. Remove the custom repository and add it again as **Dashboard**.

HACS registers the dashboard resource for you.

### Manual

1. Copy `dist/humidifier-card.js` to `config/www/humidifier-card.js`
2. Settings → Dashboards → ⋮ → **Resources** → **Add resource**
   URL `/local/humidifier-card.js`, type **JavaScript module**
3. Hard-refresh the browser

## Usage

```yaml
type: custom:humidifier-card
prefix: smart_humidifier
name: Office Humidifier
```

That derives all seven entities:

| Slot | Entity | Shown as |
| --- | --- | --- |
| `power` | `switch.<prefix>_humidifier` | round power button |
| `mode` | `select.<prefix>_mode` | dropdown |
| `fan_level` | `number.<prefix>_fan_level` | slider |
| `light` | `switch.<prefix>_indicator_light` | icon button |
| `sound` | `switch.<prefix>_sound_buzzer` | icon button |
| `connection` | `binary_sensor.<prefix>_connection_status` | icon, top right |
| `fault` | `sensor.<prefix>_device_fault` | second title line |

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | **required** | `custom:humidifier-card` |
| `prefix` | string | **required**¹ | Entity id prefix without the domain, e.g. `smart_humidifier` |
| `name` | string | power entity's friendly name | Card title |
| `icon` | string | `mdi:air-humidifier` | Header icon (falls back to `mdi:air-humidifier-off` when off) |
| `show_status` | boolean | `true` | Show the device fault line and the connection icon |
| `dim_when_off` | boolean | `false` | Grey out mode and fan level while the humidifier is off |
| `hide` | list | `[]` | Slots to leave out, e.g. `[sound, light]` |
| `entities` | map | — | Per-slot entity overrides, any subset of the slots above |

¹ Optional if you supply `entities.power` yourself.

Entity ids that do not exist are skipped and listed once in the browser console, so a partial
setup still renders.

### Full example

```yaml
type: custom:humidifier-card
prefix: smart_humidifier
name: Office Humidifier
icon: mdi:air-humidifier
show_status: true
dim_when_off: false
hide:
  - sound
entities:
  fan_level: number.office_humidifier_speed
```

## Development

```bash
npm install
npm run lint       # eslint + prettier
npm run typecheck  # tsc --noEmit
npm test           # vitest (jsdom)
npm run build      # -> dist/humidifier-card.js
npm run watch      # rebuild on change
```

`dist/humidifier-card.js` is committed on purpose — HACS falls back to it when a release has no
attached asset. Rebuild it before committing; CI fails if it is stale.

To test against a live instance, symlink the bundle into your Home Assistant config:

```bash
ln -sf "$PWD/dist/humidifier-card.js" /path/to/homeassistant/config/www/humidifier-card.js
```

## Licence

MIT
