import { Router } from 'express';
import { createDevice } from './controllers/createDevice';
import { getDevice } from './controllers/getDevice';
import { listDevices } from './controllers/listDevices';
import { deleteDevice } from './controllers/deleteDevice';
import { updateDevice } from './controllers/updateDevice';

const router = Router();

router.get('/', listDevices);
router.get('/:id', getDevice);
router.post('/', createDevice);
router.patch('/:id', updateDevice);
router.delete('/:id', deleteDevice);

export default router;
