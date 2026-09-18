import type { Slot } from './const';

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown> & { friendly_name?: string; icon?: string };
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes: unknown;
  language: string;
  localize: (key: string, ...args: unknown[]) => string;
  /** Present on Home Assistant 2023.7+; used to honour entity/state translations. */
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
  ) => Promise<unknown>;
}

export interface HumidifierCardConfig {
  type: string;
  prefix?: string;
  name?: string;
  show_status?: boolean;
  mode_on?: string;
  dim_when_off?: boolean;
  hide?: Slot[];
  entities?: Partial<Record<Slot, string>>;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: HumidifierCardConfig): void;
  getCardSize(): number;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
