import { Router } from 'express';
import { createDevice } from './controllers/createDevice';
import { getDevice } from './controllers/getDevice';
import { listDevices } from './controllers/listDevices';
import { deleteDevice } from './controllers/deleteDevice';

const router = Router();

export default router;

router.post('/', createDevice);
router.get('device/:id', getDevice);
router.get('devices/', listDevices);
router.delete('device/:id', deleteDevice);
