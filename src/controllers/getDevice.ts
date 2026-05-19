import { sqliteDeviceRepository as deviceRepository } from "../repository/sqliteDeviceRepository"
import { Request, Response } from 'express';

export const getDevice = (request: Request<{ id: string }>, response: Response): void => {
    try {
        const device = deviceRepository.findById(request.params.id);
        if (!device) {
            response.status(404).json({ error: 'Device not found' });
            return;
        }
        response.json(device);
    }
    catch (err) {
        //TODO log error
    }
}