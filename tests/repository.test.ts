import { sqliteDeviceRepository as deviceRepository } from '../src/repository/sqliteDeviceRepository';
import db from '../src/database/db';

const sample = {
  id: 'test-id-1',
  name: 'Test Switch',
  type: 'switch',
  status: 'off',
  location: 'Living Room',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

beforeEach(() => {
  db.prepare('DELETE FROM devices').run();
});

describe('create', () => {
  it('inserts and returns the device', () => {
    const result = deviceRepository.create(sample);
    expect(result).toEqual(sample);
  });
});

describe('findAll', () => {
  it('returns an empty array when no devices exist', () => {
    expect(deviceRepository.findAll()).toEqual([]);
  });

  it('returns all devices', () => {
    deviceRepository.create(sample);
    deviceRepository.create({ ...sample, id: 'test-id-2', name: 'Thermostat' });
    expect(deviceRepository.findAll()).toHaveLength(2);
  });
});

describe('findById', () => {
  it('returns the device if found', () => {
    deviceRepository.create(sample);
    expect(deviceRepository.findById('test-id-1')?.name).toBe('Test Switch');
  });

  it('returns undefined for an unknown id', () => {
    expect(deviceRepository.findById('unknown')).toBeUndefined();
  });
});

describe('update', () => {
  it('updates the device fields', () => {
    deviceRepository.create(sample);
    deviceRepository.update({ ...sample, name: 'Updated Switch', status: 'on' });
    const result = deviceRepository.findById('test-id-1');
    expect(result?.name).toBe('Updated Switch');
    expect(result?.status).toBe('on');
  });
});

describe('delete', () => {
  it('returns 1 when the device is deleted', () => {
    deviceRepository.create(sample);
    expect(deviceRepository.delete('test-id-1')).toBe(1);
  });

  it('returns 0 when the device does not exist', () => {
    expect(deviceRepository.delete('unknown')).toBe(0);
  });
});
