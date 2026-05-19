
import { createDevice } from '../../src/controllers/createDevice';
import { mockRequest, mockResponse } from '../testUtils';

jest.mock('../../src/repository/sqliteDeviceRepository', () => ({
  sqliteDeviceRepository: {
    create: jest.fn((device) => device),
  },
}));

describe('createDevice', () => {
  it('returns 201 with the created device', () => {
    const response = mockResponse();
    createDevice(mockRequest({ body: { name: 'DigitalThermo', type: 'thermostat', location: 'Hallway' } }), response);
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(expect.objectContaining({
      name: 'DigitalThermo',
      type: 'thermostat',
      status: 'off',
    }));
  });

  it('returns 400 if name is missing', () => {
    const response = mockResponse();
    createDevice(mockRequest({ body: { type: 'thermostat' } }), response);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 if name is not a string', () => {
    const response = mockResponse();
    createDevice(mockRequest({ body: { name: 123, type: 'thermostat' } }), response);
    expect(response.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 if type is invalid', () => {
    const response = mockResponse();
    createDevice(mockRequest({ body: { name: 'digitalThermo', type: 'DoorLock' } }), response);
    expect(response.status).toHaveBeenCalledWith(400);
  });


  it('defaults location to empty string if not provided', () => {
    const response = mockResponse();
    createDevice(mockRequest({ body: { name: 'DigitalThermo', type: 'thermostat' } }), response);
    expect(response.json).toHaveBeenCalledWith(expect.objectContaining({ location: '' }));
  });
});
