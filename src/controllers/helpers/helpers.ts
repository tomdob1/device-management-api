import { DEVICE_TYPES, MAX_LENGTH } from "../../constsants";

export const isString = (val: unknown): val is string => {

  return typeof val === 'string';
}

export const validateName = (name: unknown): string | null => {
  if (!isString(name)) return 'name must be a string';
  if (!name.trim()) return 'name is required';
  if (name.length > MAX_LENGTH) return `name must be ${MAX_LENGTH} characters or fewer`;

  return null;
}

export const validateType = (type: unknown): string | null => {
  if (!isString(type)) return 'type must be a string';
  if (!(DEVICE_TYPES as readonly string[]).includes(type)) return `type must be one of: ${DEVICE_TYPES.join(', ')}`;

  return null;
}

export const validateLocation = (location: unknown): string | null => {
  if (!isString(location)) return 'location must be a string';
  if (location.length > MAX_LENGTH) return `location must be ${MAX_LENGTH} characters or fewer`;

  return null;
}

export function validateStatus(status: unknown): string | null {
  if (!isString(status)) return 'status must be a string';
  
  return null;
}