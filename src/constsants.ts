export const VALID_STATUSES = ['on', 'off'] as const;
export const MAX_LEN = 100;

export const DEVICE_TYPES = ['light', 'thermostat', 'camera', 'sensor', 'lock', 'switch', 'other'] as const;
export type DeviceType = typeof DEVICE_TYPES[number];
