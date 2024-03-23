import { Router } from 'express';
const router = Router();

import { upload } from '../libs/multer-lib.js';
import { isAdmin } from '../middlewars/admin-middleware.js';
import { isAuthorized } from '../middlewars/auth-middleware.js';
import { addUserImage, getUser, getUsers, updateUser, getUserProducts } from '../controllers/user-controller.js';

router.get('/:id/products', getUserProducts);
router.get('/', isAuthorized, isAdmin, getUsers);
router.get('/:id', isAuthorized, getUser);
router.patch('/', isAuthorized, upload.single('file'), updateUser);
router.post('/image', isAuthorized, upload.single('file'), addUserImage);

export default router;
