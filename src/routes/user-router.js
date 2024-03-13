import { Router } from 'express';
const router = Router();

import { upload } from '../libs/multer-lib.js';

import { addUserImage, getUser, updateUser } from '../controllers/user-controller.js';

router.post('/:id/image', upload.single('file'), addUserImage);
router.get('/:id', getUser);
router.patch('/:id', updateUser);

export default router;
