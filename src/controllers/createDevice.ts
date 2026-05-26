import { v4 as uuidv4 } from 'uuid';
import { validateLocation, validateName, validateType } from './helpers/helpers';
import { DeviceType } from '../constsants';
import { sqliteDeviceRepository as deviceRepository } from '../repository/sqliteDeviceRepository';
import { NextFunction, Request, Response } from 'express';

interface CreateDeviceBody {
  name: string;
  type: DeviceType;
  location?: string;
}

export const createDevice = (request: Request, response: Response, next: NextFunction): void => {
    const error = validateCreatePayload(request.body);
    if (error) {
        response.status(400).json({error});
        return;
    }

    const { name, type, location } = request.body as CreateDeviceBody;

    try {
        const device = deviceRepository.create({
            id: uuidv4(),
            name: name.trim(),
            type,
            status: 'off',
            location: location ? location.trim() : '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        response.status(201).json(device);
    } catch (err) {
        next(err);
    }
}

export const validateCreatePayload = (body: Record<string, unknown>): string | null => {
    return (
    validateName(body.name) ??
    validateType(body.type) ??
    (body.location !== undefined ? validateLocation(body.location) : null)
  );
}