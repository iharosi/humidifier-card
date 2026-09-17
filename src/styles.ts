import { css } from 'lit';

export const cardStyles = css`
  :host {
    --hc-active: var(--state-switch-active-color, var(--primary-color, #03a9f4));
    --hc-bad: var(--error-color, #db4437);
  }

  ha-card {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 12px 8px;
  }

  .header > ha-icon {
    --mdc-icon-size: 26px;
    color: var(--state-icon-color, var(--secondary-text-color));
    flex: 0 0 auto;
    transition: color 180ms ease-in-out;
  }

  .header > ha-icon.on {
    color: var(--hc-active);
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    flex: 1 1 auto;
  }

  .name,
  .sub,
  .conn {
    cursor: pointer;
    border-radius: 4px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name:focus-visible,
  .sub:focus-visible,
  .conn:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
  }

  .name {
    font-size: 15px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .sub {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: var(--secondary-text-color);
  }

  .sub.bad {
    color: var(--hc-bad);
    font-weight: 500;
  }

  .sub ha-icon {
    --mdc-icon-size: 15px;
  }

  .conn {
    display: inline-flex;
    align-items: center;
    flex: 0 0 auto;
    color: var(--secondary-text-color);
  }

  .conn ha-icon {
    --mdc-icon-size: 20px;
  }

  .conn.bad {
    color: var(--hc-bad);
  }

  /* ------------------------------------------------------------ control strip */

  .strip {
    display: flex;
    align-items: center;
    gap: 8px 10px;
    padding: 0 12px;
    flex-wrap: wrap;
  }

  ha-select {
    width: 112px;
    flex: 0 0 auto;
    --mdc-menu-min-width: 112px;
    --mdc-typography-subtitle1-font-size: 14px;
  }

  .slider-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1 1 90px;
    min-width: 90px;
  }

  .value {
    font-size: 14px;
    font-variant-numeric: tabular-nums;
    color: var(--secondary-text-color);
    min-width: 2ch;
    text-align: right;
  }

  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    min-width: 60px;
    height: 4px;
    border-radius: 2px;
    background: var(--divider-color, rgba(127, 127, 127, 0.4));
    outline: none;
    margin: 0;
    cursor: pointer;
  }

  input[type='range']:disabled {
    cursor: default;
    opacity: 0.45;
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

  .icon-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: var(--divider-color, rgba(127, 127, 127, 0.18));
    color: var(--secondary-text-color);
    cursor: pointer;
    flex: 0 0 auto;
    transition:
      background 160ms ease-in-out,
      color 160ms ease-in-out;
  }

  .icon-toggle ha-icon {
    --mdc-icon-size: 20px;
  }

  .icon-toggle.power {
    width: 40px;
    height: 40px;
  }

  .icon-toggle.power ha-icon {
    --mdc-icon-size: 24px;
  }

  .icon-toggle.on {
    background: var(--hc-active);
    color: var(--text-primary-color, #fff);
  }

  .icon-toggle:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .icon-toggle:focus-visible {
    outline: 2px solid var(--hc-active);
    outline-offset: 2px;
  }

  .warning {
    padding: 8px 16px;
    color: var(--hc-bad);
    font-size: 13px;
  }
`;
