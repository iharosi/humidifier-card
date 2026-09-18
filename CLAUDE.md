# Humidifier Card

A custom Lovelace card for Home Assistant, installable through HACS. It controls
a humidifier that ESPHome exposes as separate `switch` / `select` / `number` /
`binary_sensor` / `sensor` entities (a Xiaomi Smart Humidifier 2,
`deerma.humidifier.jsq2g`, on `dhewg/esphome-miot`) rather than as one
`humidifier.*` entity.

Its look is deliberately the same as the sibling
[air-purifier-card](../air-purifier-card): dial on the left, name + accent value
+ power button, a thick slider, chips, pills. Keep the two in step when changing
either one's design.

## Stack

TypeScript + [Lit](https://lit.dev) + Rollup, with Vitest (jsdom), ESLint and
Prettier. Node ≥ 22.22.2 — jsdom needs it, and CI runs on 22.

```bash
npm install
npm run build      # src/ -> dist/humidifier-card.js (ESM, terser, Lit inlined)
npm run watch
npm run lint       # eslint + prettier --check
npm run typecheck  # tsc --noEmit, strict
npm test           # vitest
```

## Layout

```
src/humidifier-card.ts  the card element, rendering, services, optimistic state
src/editor.ts           the visual editor (ha-form schema and labels)
src/entities.ts         prefix -> entity id resolution and config validation
src/humidity.ts         humidity level lookup, numericState, clamp
src/styles.ts           the whole stylesheet as a lit `css` template
src/const.ts            VERSION, slots, entity suffixes, labels, humidity levels
src/types.ts            the slice of the Home Assistant frontend API we use
test/                   vitest; card.test.ts renders the real element in jsdom
dist/humidifier-card.js the committed bundle, what HACS installs
images/screenshot.png   README image, rendered from the real bundle
```

## Rules that bite

- **`dist/` is committed.** CI runs `git diff --exit-code -- dist/`, so rebuild
  and commit the bundle in the same commit as any source change.
- **Version lives in two places**: `version` in `package.json` and `VERSION`
  in `src/const.ts`. Keep them equal, and equal to the git tag.
- **Entities are "slots".** Every slot is derived as
  `<domain>.<prefix><suffix>` from `ENTITY_SUFFIXES` in `const.ts`, and can be
  overridden under `entities:` or dropped with `hide:`. Adding a slot touches
  the `Slot` union, `SLOTS`, `ENTITY_SUFFIXES` and `SLOT_LABELS` in `const.ts`,
  the render code, the README slot table, and `test/entities.test.ts`.
  Unknown slot names in `hide` / `entities` throw on purpose.
- **Unknown top-level options are ignored**, not rejected, so removed options
  (`compact`, `icon`) keep old configs working.
- **Everything is tinted by `--hc-accent`**: the humidity level colour while
  on, `--hc-idle-color` grey while off. Only the humidity chip's dot keeps its
  colour when off. The mist animation is driven by `--spin`, set from the fan
  level, and must be still when off.
- **Mode**: a select with exactly two options (or any select when `mode_on` is
  set) is a toggle pill; the second option counts as "on". While mode is on
  the target humidity slider is disabled — the user asked for that direction.
- **Controls stay usable while off.** HA and the device accept mode / fan /
  target changes with the power off; `dim_when_off: true` is opt-in.
- **Every file in `src/` starts with the GPL-3.0-only header** (copy it from
  any existing file). The project is GPL-3.0-only, not -or-later.

## Releases

Ask before cutting one unless the user asked for it. Committing and pushing to
`main` needs no permission. `gh release create vX.Y.Z dist/humidifier-card.js`
publishes; the release workflow also builds and attaches the bundle, and the
tag is what HACS serves.

Commits are authored locally as `vision <vision.app.inc@gmail.com>`; the GitHub
remote is `iharosi/humidifier-card`.

## README images

`images/screenshot.png` is rendered from the built bundle in headless Chromium
against a mocked `hass` object, with stand-in `ha-card` and `ha-icon` elements
(`ha-icon` draws paths from `@mdi/js`), using throwaway pages outside the repo.
`playwright-core` drives the cached Chromium; serve the bundle through
`page.route` or over http — `file://` blocks ES modules. Size the viewport to
the body height before a `fullPage` capture. Regenerate it when the look
changes.
