import db from '../database/db';
import { Device, DeviceRepository } from './deviceRepository';

export type { Device };

export const sqliteDeviceRepository: DeviceRepository = {
  create(device: Device): Device {
    db.prepare(`
      INSERT INTO devices (id, name, type, status, location, createdAt, updatedAt)
      VALUES (@id, @name, @type, @status, @location, @createdAt, @updatedAt)
    `).run(device);
    return device;
  },

  findAll(): Device[] {
  },

  findById(id: string): Device | undefined {
  },

  update(device: Device): void {
  },

  delete(id: string): number {
  },
};
