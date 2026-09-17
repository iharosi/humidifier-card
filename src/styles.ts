import { css } from 'lit';

export const cardStyles = css`
  :host {
    --hc-gap: 12px;
    --hc-active: var(--state-switch-active-color, var(--primary-color, #03a9f4));
    --hc-bad: var(--error-color, #db4437);
    --hc-good: var(--success-color, var(--label-badge-green, #43a047));
  }

  ha-card {
    display: flex;
    flex-direction: column;
    padding: var(--hc-gap) 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: var(--hc-gap);
    padding: 4px 16px 12px;
  }

  .header ha-icon {
    --mdc-icon-size: 28px;
    color: var(--state-icon-color, var(--secondary-text-color));
    flex: 0 0 auto;
    transition: color 180ms ease-in-out;
  }

  .header ha-icon.on {
    color: var(--hc-active);
  }

  .title {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1 1 auto;
    cursor: pointer;
  }

  .title:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .name {
    font-size: 16px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .summary {
    font-size: 13px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rows {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
  }

  .row {
    display: flex;
    align-items: center;
    gap: var(--hc-gap);
    min-height: 44px;
    padding: 2px 16px;
  }

  .row + .row {
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.15));
  }

  .row.disabled {
    opacity: 0.45;
    pointer-events: none;
  }

  .label {
    flex: 1 1 auto;
    font-size: 14px;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .unavailable {
    font-size: 13px;
    color: var(--secondary-text-color);
    font-style: italic;
  }

  ha-select {
    --mdc-menu-min-width: 140px;
    --mdc-typography-subtitle1-font-size: 14px;
    width: 150px;
    flex: 0 0 auto;
  }

  .slider-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 0 0 auto;
  }

  .value {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    min-width: 2.5ch;
    text-align: right;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 120px;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127, 127, 127, 0.4));
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  input[type='range']:disabled {
    cursor: default;
  }

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--hc-active);
    border: none;
    cursor: pointer;
  }

  input[type='range']::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--hc-active);
    border: none;
    cursor: pointer;
  }

  input[type='range']:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 4px;
  }

  .status {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 14px;
    padding: 12px 16px 2px;
    border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .chip ha-icon {
    --mdc-icon-size: 16px;
  }

  .chip.bad {
    color: var(--hc-bad);
    font-weight: 500;
  }

  .chip.good ha-icon {
    color: var(--hc-good);
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`;
