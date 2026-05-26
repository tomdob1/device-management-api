import { sqliteDeviceRepository as deviceRepository } from "../repository/sqliteDeviceRepository"
import { NextFunction, Request, Response } from 'express';

export const getDevice = (request: Request, response: Response, next: NextFunction): void => {
    try {
        const device = deviceRepository.findById(request.params.id);
        if (!device) {
            response.status(404).json({ error: 'Device not found' });
            return;
        }
        response.json(device);
    }
    catch (err) {
        next(err);
    }
}