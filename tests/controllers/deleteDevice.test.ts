import { deleteDevice } from '../../src/controllers/deleteDevice';
import { mockNext, mockRequest, mockResponse } from '../testUtils';

jest.mock('../../src/repository/sqliteDeviceRepository', () => ({
  sqliteDeviceRepository: {
    delete: jest.fn(),
  },
}));

import { sqliteDeviceRepository as deviceRepository } from '../../src/repository/sqliteDeviceRepository';

describe('deleteDevice', () => {
  it('deletes the device and returns a confirmation message', () => {
    jest.mocked(deviceRepository.delete).mockReturnValue(1);

    const response = mockResponse();
    deleteDevice(mockRequest({ params: { id: '1' } }), response, mockNext());

    expect(response.json).toHaveBeenCalledWith({ message: 'Device deleted' });
  });

  it('returns 404 if the device does not exist', () => {
    jest.mocked(deviceRepository.delete).mockReturnValue(0);

    const response = mockResponse();
    deleteDevice(mockRequest({ params: { id: 'unknown' } }), response, mockNext());

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: 'Device not found' });
  });
});
