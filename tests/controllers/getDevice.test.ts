import { getDevice } from '../../src/controllers/getDevice';
import { Device } from '../../src/repository/deviceRepository';
import { mockNext, mockRequest, mockResponse } from '../testUtils';

jest.mock('../../src/repository/sqliteDeviceRepository', () => ({
  sqliteDeviceRepository: {
    findById: jest.fn(),
  },
}));

import { sqliteDeviceRepository as deviceRepository } from '../../src/repository/sqliteDeviceRepository';

const device: Device = {
  id: '1',
  name: 'Lamp',
  type: 'light',
  status: 'off',
  location: 'Kitchen',
  createdAt: '',
  updatedAt: '',
};

describe('getDevice', () => {
  it('returns the device if found', () => {
    jest.mocked(deviceRepository.findById).mockReturnValue(device);

    const response = mockResponse();
    getDevice(mockRequest({ params: { id: '1' } }), response, mockNext());

    expect(response.json).toHaveBeenCalledWith(device);
  });

  it('returns 404 if device is not found', () => {
    jest.mocked(deviceRepository.findById).mockReturnValue(undefined);

    const response = mockResponse();
    getDevice(mockRequest({ params: { id: 'unknown' } }), response, mockNext());

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: 'Device not found' });
  });
});
