import { NextFunction, Request, Response } from 'express';
import { sqliteDeviceRepository as deviceRepository } from '../repository/sqliteDeviceRepository';

export function deleteDevice(request: Request, response: Response, next: NextFunction): void {
  try {
    const changes = deviceRepository.delete(request.params.id);
    if (changes === 0) {
      response.status(404).json({ error: 'Device not found' });
      return;
    }
    response.json({ message: 'Device deleted' });
  } catch (err) {
    next(err);
  }
}
