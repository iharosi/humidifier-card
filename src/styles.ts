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

import { css } from 'lit';

export const cardStyles = css`
  :host {
    --hc-accent: var(--state-humidifier-on-color, var(--primary-color, #03a9f4));
    --hc-idle-color: var(--disabled-text-color, #9e9e9e);
    --hc-bad: var(--error-color, #db4437);
  }
  ha-card {
    display: block;
    padding: 12px 14px;
    overflow: hidden;
  }
  .row {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  /* -------- dial -------- */
  .visual {
    position: relative;
    width: 68px;
    height: 68px;
    flex: 0 0 68px;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    background: radial-gradient(
      circle at 50% 50%,
      color-mix(in srgb, var(--hc-accent) 18%, transparent),
      transparent 70%
    );
    transition: background 0.4s ease;
  }
  .visual.off {
    background: none;
  }
  .visual:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
  }
  svg {
    width: 68px;
    height: 68px;
    display: block;
    position: relative;
  }
  .ring {
    fill: none;
    stroke: var(--divider-color, rgba(127, 127, 127, 0.25));
    stroke-width: 4;
  }
  .ring-value {
    fill: none;
    stroke: var(--hc-accent);
    stroke-width: 4;
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: 50px 50px;
    transition:
      stroke-dashoffset 0.5s ease,
      stroke 0.4s ease;
  }
  .target-mark {
    fill: var(--card-background-color, #fff);
    stroke: var(--hc-accent);
    stroke-width: 2.5;
    transition: stroke 0.4s ease;
  }
  .drop,
  .mist {
    fill: var(--hc-accent);
    transition: fill 0.4s ease;
  }
  .shine {
    fill: none;
    stroke: var(--card-background-color, #fff);
    stroke-width: 2.4;
    stroke-linecap: round;
    opacity: 0.7;
  }

  /* mist: droplets lifting off the water, faster at higher fan levels */
  .mist {
    opacity: 0;
  }
  .visual.on .mist {
    animation: mist calc(var(--spin, 2s) * 2) ease-out infinite;
  }
  .visual.on .mist:nth-of-type(2) {
    animation-delay: calc(var(--spin, 2s) * 0.5);
  }
  .visual.on .mist:nth-of-type(3) {
    animation-delay: calc(var(--spin, 2s) * 1);
  }
  .visual.on .mist:nth-of-type(4) {
    animation-delay: calc(var(--spin, 2s) * 1.5);
  }
  @keyframes mist {
    0% {
      transform: translateY(0);
      opacity: 0;
    }
    20% {
      opacity: 0.9;
    }
    70% {
      opacity: 0.45;
    }
    100% {
      transform: translateY(-26px);
      opacity: 0;
    }
  }

  /* -------- body -------- */
  .body {
    flex: 1;
    min-width: 0;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    cursor: pointer;
    border-radius: 4px;
  }
  .name:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
  }
  .pct {
    font-size: 15px;
    font-weight: 600;
    color: var(--hc-accent);
    font-variant-numeric: tabular-nums;
  }
  .pct.off {
    color: var(--secondary-text-color);
  }
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 18px;
    margin: 6px 0 2px;
    background: none;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--hc-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type='range']::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      var(--hc-accent) var(--fill, 0%),
      var(--divider-color, rgba(127, 127, 127, 0.25)) var(--fill, 0%)
    );
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    margin-top: -4px;
    border-radius: 50%;
    background: var(--hc-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type='range']::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border: none;
    border-radius: 50%;
    background: var(--hc-accent);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }
  input[type='range']:disabled {
    opacity: 0.45;
    cursor: default;
  }
  input[type='range']:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* -------- chips -------- */
  .chips {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px 2px 6px;
    border-radius: 12px;
    font-size: 12px;
    line-height: 18px;
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    color: var(--secondary-text-color);
    cursor: pointer;
    white-space: nowrap;
    min-width: 0;
  }
  .chip:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }
  .chip ha-icon {
    --mdc-icon-size: 14px;
    flex: 0 0 auto;
  }
  .chip span {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chip.status {
    flex: 0 1 auto;
  }
  .chip.bad {
    color: var(--hc-bad);
    background: color-mix(in srgb, var(--hc-bad) 12%, transparent);
    font-weight: 500;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: 0 0 8px;
  }
  .spacer {
    flex: 1;
  }

  /* -------- presets: fan levels and toggles -------- */
  .presets {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-top: 6px;
  }
  .group {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  /* pushed right, and onto its own line on narrow cards rather than overflowing */
  .toggles {
    margin-left: auto;
  }
  .preset-icon {
    --mdc-icon-size: 14px;
    color: var(--secondary-text-color);
    flex: 0 0 auto;
  }
  .preset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    font: inherit;
    font-size: 11px;
    line-height: 18px;
    min-width: 26px;
    padding: 2px 7px;
    border-radius: 11px;
    color: var(--secondary-text-color);
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    cursor: pointer;
    flex: 0 0 auto;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }
  .preset.toggle {
    padding: 2px 6px;
  }
  .preset ha-icon {
    --mdc-icon-size: 14px;
  }
  .preset.active {
    background: var(--hc-accent);
    color: var(--text-primary-color, #fff);
  }
  .preset:disabled {
    opacity: 0.45;
    cursor: default;
  }
  .preset:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }

  /* -------- power -------- */
  .power {
    flex: 0 0 auto;
    border: none;
    background: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    color: var(--secondary-text-color);
    display: grid;
    place-items: center;
    transition:
      color 0.3s ease,
      background 0.3s ease;
  }
  .power.on {
    color: var(--hc-accent);
    background: color-mix(in srgb, var(--hc-accent) 16%, transparent);
  }
  .power:hover {
    background: var(--secondary-background-color, rgba(127, 127, 127, 0.18));
  }
  .power:focus-visible {
    outline: 2px solid var(--hc-accent);
    outline-offset: 1px;
  }
  .unavailable {
    opacity: 0.55;
    pointer-events: none;
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`;
