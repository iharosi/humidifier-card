/*
 * Humidifier Card - a Lovelace card for Home Assistant
 * Copyright (C) 2026 Humidifier Card contributors
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation. It is distributed WITHOUT ANY WARRANTY; see
 * the GNU General Public License in LICENSE for details.
 *
 * SPDX-License-Identifier: GPL-3.0-only
 */

import { ENTITY_SUFFIXES, SLOTS, type Slot } from './const';
import type { HumidifierCardConfig } from './types';

export type ResolvedEntities = Partial<Record<Slot, string>>;

/**
 * Resolve every slot to an entity id.
 * Order per slot: explicit `entities.<slot>` override, then `<domain>.<prefix><suffix>`.
 * Slots listed in `hide` are dropped entirely.
 */
export function resolveEntities(config: HumidifierCardConfig): ResolvedEntities {
  const hidden = new Set(config.hide ?? []);
  const resolved: ResolvedEntities = {};

  for (const slot of SLOTS) {
    if (hidden.has(slot)) continue;

    const override = config.entities?.[slot];
    if (override) {
      resolved[slot] = override;
      continue;
    }

    if (config.prefix) {
      const { domain, suffix } = ENTITY_SUFFIXES[slot];
      resolved[slot] = `${domain}.${config.prefix}${suffix}`;
    }
  }

  return resolved;
}

/** Throws a user-facing error when the config cannot produce a usable card. */
export function validateConfig(config: HumidifierCardConfig): void {
  if (!config || typeof config !== 'object') {
    throw new Error('humidifier-card: no configuration provided');
  }

  if (config.hide && !Array.isArray(config.hide)) {
    throw new Error('humidifier-card: `hide` must be a list of slot names');
  }

  const unknownHidden = (config.hide ?? []).filter((slot) => !SLOTS.includes(slot));
  if (unknownHidden.length) {
    throw new Error(
      `humidifier-card: unknown slot(s) in \`hide\`: ${unknownHidden.join(', ')}. ` +
        `Valid slots: ${SLOTS.join(', ')}`,
    );
  }

  const unknownEntities = Object.keys(config.entities ?? {}).filter(
    (slot) => !SLOTS.includes(slot as Slot),
  );
  if (unknownEntities.length) {
    throw new Error(
      `humidifier-card: unknown slot(s) in \`entities\`: ${unknownEntities.join(', ')}. ` +
        `Valid slots: ${SLOTS.join(', ')}`,
    );
  }

  if (!config.prefix && !config.entities?.power) {
    throw new Error(
      'humidifier-card: set `prefix` (e.g. smart_humidifier) ' + 'or at least `entities.power`',
    );
  }
}
