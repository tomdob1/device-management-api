import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export const mockRequest = <P extends Record<string, string> = ParamsDictionary>(
  overrides: { params?: P; body?: Record<string, unknown> } = {}
): Request<P> => ({ params: {} as P, body: {}, ...overrides } as unknown as Request<P>);

export const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res) as unknown as Response['status'];
  res.json = jest.fn().mockReturnValue(res) as unknown as Response['json'];
  return res as Response;
};

export const mockNext = (): NextFunction => jest.fn() as unknown as NextFunction;
