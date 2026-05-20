import { Request, Response } from 'express';
import { sqliteDeviceRepository as deviceRepository } from '../repository/sqliteDeviceRepository';
import { validateName, validateType, validateLocation, validateStatus } from './helpers/helpers';
import { DeviceType, VALID_STATUSES } from '../constsants';

interface UpdateDeviceBody {
  name?: string;
  type?: DeviceType;
  status?: string;
  location?: string;
}

function validateUpdatePayload(body: Record<string, unknown>): string | null {
  const { name, type, status, location } = body;

  if (name !== undefined) {
    const error = validateName(name);
    if (error) return error;
  }

  if (type !== undefined) {
    const error = validateType(type);
    if (error) return error;
  }

  if (status !== undefined) {
    const error = validateStatus(status);
    if (error) return error;
    if (!(VALID_STATUSES as readonly string[]).includes(status as string)) return `status must be one of: ${VALID_STATUSES.join(', ')}`;
  }

  if (location !== undefined) {
    const error = validateLocation(location);
    if (error) return error;
  }

  return null;
}

export function updateDevice(request: Request, response: Response): void {
  try {
    const device = deviceRepository.findById(request.params.id);
    if (!device) {
      response.status(404).json({ error: 'Device not found' });

      return;
    }

    const error = validateUpdatePayload(request.body);
    if (error) {
      response.status(400).json({ error });

      return;
    }

    const { name, type, status, location } = request.body as UpdateDeviceBody;

    const updated = {
      ...device,
      ...(name !== undefined && { name: name.trim() }),
      ...(type !== undefined && { type }),
      ...(status !== undefined && { status }),
      ...(location !== undefined && { location: location.trim() }),
      updatedAt: new Date().toISOString(),
    };

    deviceRepository.update(updated);
    response.json(updated);
  } catch (err) {
    //todo log error
  }
}
