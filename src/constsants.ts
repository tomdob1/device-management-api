export const VALID_STATUSES = ['on', 'off'] as const;
export const MAX_LENGTH = 100;

export const DEVICE_TYPES = ['alarm', 'camera', 'light', 'lock', 'other', 'sensor', 'switch', 'thermostat'] as const;
export type DeviceType = typeof DEVICE_TYPES[number];
