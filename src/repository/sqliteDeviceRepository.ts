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

    return db.prepare('SELECT * FROM devices').all() as Device[];
  },

  findById(id: string): Device | undefined {

    return db.prepare('SELECT * FROM devices WHERE id = ?').get(id) as Device | undefined;
  },

  update(device: Device): void {
    db.prepare(`
      UPDATE devices SET name = @name, type = @type, status = @status, location = @location, updatedAt = @updatedAt
      WHERE id = @id
    `).run(device);
  },

  delete(id: string): number {
    const result = db.prepare('DELETE FROM devices WHERE id = ?').run(id);

    return result.changes;
  },
};
