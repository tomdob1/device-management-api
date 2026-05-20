import { listDevices } from '../../src/controllers/listDevices';
import { Device } from '../../src/repository/deviceRepository';
import { sqliteDeviceRepository as deviceRepository } from '../../src/repository/sqliteDeviceRepository';
import { mockRequest, mockResponse } from '../testUtils';

jest.mock('../../src/repository/sqliteDeviceRepository', () => ({
  sqliteDeviceRepository: {
    findAll: jest.fn(),
  },
}));

const devices: Device[] = [
  { id: '1', name: 'Burglar Alarm', type: 'alarm', status: 'off', location: 'garage', createdAt: '', updatedAt: '' },
  { id: '2', name: 'Thermostat', type: 'thermostat', status: 'on', location: 'hallway', createdAt: '', updatedAt: '' },
];

describe('listDevices', () => {
  it('returns all devices', () => {
    jest.mocked(deviceRepository.findAll).mockReturnValue(devices);

    const response = mockResponse();
    listDevices(mockRequest({}), response);

    expect(response.json).toHaveBeenCalledWith(devices);
  });

  it('returns an empty array when no devices exist', () => {
    jest.mocked(deviceRepository.findAll).mockReturnValue([]);

    const response = mockResponse();
    listDevices(mockRequest({}), response);

    expect(response.json).toHaveBeenCalledWith([]);
  });
});
