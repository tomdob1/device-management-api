import { sqliteDeviceRepository as deviceRepository } from "../repository/sqliteDeviceRepository";
import { Request, Response } from "express";

export const listDevices = (request: Request, response: Response): void => {
    try {
        response.json(deviceRepository.findAll());
    } catch (err) {
        //todo error handling
    }
}