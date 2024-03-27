import { Router } from 'express';
import { upload } from '../libs/multer-lib.js';
import {
   
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
    addProductImage,
} from '../controllers/product-controller.js';
import { isAuthorized } from '../middlewars/auth-middleware.js';


const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);

router.use(isAuthorized);
router.post('/image', upload.single('file'), addProductImage)
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);


export default router;
