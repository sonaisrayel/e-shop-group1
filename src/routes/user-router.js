import { Router } from 'express';
const router = Router();

import { login, register } from '../controllers/user-controller';

router.post('/register', registration);
router.post('/login', login);

export default router;
