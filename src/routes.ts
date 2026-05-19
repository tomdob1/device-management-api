import { Router } from 'express';
import { createDevice } from './controllers/createDevice';
import { getDevice } from './controllers/getDevice';

const router = Router();

export default router;

router.post('/', createDevice);
router.get('/:id', getDevice);
