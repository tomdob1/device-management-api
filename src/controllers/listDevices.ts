import { sqliteDeviceRepository as deviceRepository } from "../repository/sqliteDeviceRepository";
import { NextFunction, Request, Response } from "express";

export const listDevices = (request: Request, response: Response, next: NextFunction): void => {
    try {
        response.json(deviceRepository.findAll());
    } catch (err) {
        next(err);
    }
}