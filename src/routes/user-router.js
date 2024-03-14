import { Router } from 'express';
const router = Router();

import { upload } from '../libs/multer-lib.js';

import { addUserImage, getUser, getUsers, updateUser } from '../controllers/user-controller.js';

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id', upload.single('file'), updateUser);
router.post('/:id/image', upload.single('file'), addUserImage);

export default router;
