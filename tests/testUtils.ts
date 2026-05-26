import { NextFunction, Request, Response } from 'express';

export const mockNext = (): NextFunction => jest.fn() as unknown as NextFunction;

export const mockRequest = (overrides = {}): Request => {
  
  return ({ params: {}, body: {}, ...overrides } as unknown as Request);
}
  

export const mockResponse = (): Response => {
  const response: Partial<Response> = {};
  response.status = jest.fn().mockReturnValue(response) as unknown as Response['status'];
  response.json = jest.fn().mockReturnValue(response) as unknown as Response['json'];

  return response as Response;
};
