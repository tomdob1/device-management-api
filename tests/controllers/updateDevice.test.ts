import { updateDevice } from '../../src/controllers/updateDevice';
import { Device } from '../../src/repository/deviceRepository';
import { mockRequest, mockResponse } from '../testUtils';

jest.mock('../../src/repository/sqliteDeviceRepository', () => ({
  sqliteDeviceRepository: {
    findById: jest.fn(),
    update: jest.fn(),
  },
}));

import { sqliteDeviceRepository as deviceRepository } from '../../src/repository/sqliteDeviceRepository';

const device: Device = {
  id: '1',
  name: 'floorlamp',
  type: 'light',
  status: 'off',
  location: 'garage',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

beforeEach(() => {
  jest.mocked(deviceRepository.findById).mockReturnValue(device);
  jest.mocked(deviceRepository.update).mockImplementation(() => {});
});

describe('updateDevice', () => {
  it('returns 404 if device is not found', () => {
    jest.mocked(deviceRepository.findById).mockReturnValue(undefined);

    const response = mockResponse();
    updateDevice(mockRequest({ params: { id: 'unknown' }, body: { status: 'on' } }), response);

    expect(response.status).toHaveBeenCalledWith(404);
  });

  it('updates and returns the device', () => {
    const response = mockResponse();
    updateDevice(mockRequest({ params: { id: '1' }, body: { status: 'on', name: 'Old Lamp' } }), response);

    expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'on',
      name: 'Old Lamp',
    }));
  });

  it('returns 400 for an invalid status', () => {
    const response = mockResponse();
    updateDevice(mockRequest({ params: { id: '1' }, body: { status: 'broken' } }), response);

    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 for an invalid type', () => {
    const response = mockResponse();
    updateDevice(mockRequest({ params: { id: '1' }, body: { type: 'car' } }), response);

    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 if name is not a string', () => {
    const response = mockResponse();
    updateDevice(mockRequest({ params: { id: '1' }, body: { name: 99 } }), response);

    expect(response.status).toHaveBeenCalledWith(400);
  });
});
