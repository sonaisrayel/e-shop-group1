import { Router } from 'express';
const router = Router();

import { upload } from '../libs/multer-lib.js';

import { addUserImage, getUser, getUsers, updateUser, getUserProducts } from '../controllers/user-controller.js';
router.get('/:id', getUserProducts);
router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/', upload.single('file'), updateUser);
router.post('/image', upload.single('file'), addUserImage);

export default router;
