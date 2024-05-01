import { Router } from 'express';
const router = Router();
import { upload } from '../libs/multer-lib.js';
import {
    addProductImage,
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/product-controller.js';
import { isAuthorized } from '../middlewars/auth-middleware.js';

router.get('/', getProducts);
router.get('/:id', getProduct);

router.use(isAuthorized);

router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', upload.single('file'), updateProduct);
router.post('/image', upload.single('file'), addProductImage);
export default router;
