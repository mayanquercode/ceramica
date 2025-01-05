import { Router } from 'express'
import {FilterProductByName, GetCategories, GetOneProduct, GetProducts, GetProductsByCategory, SaveInfoProduct, UpdateInfoProduct} from './controllers/index.js'

const router = Router()

router.get('/products', GetProducts.run);
router.get('/products/:code', GetOneProduct.run);
router.get('/products/category/:code', GetProductsByCategory.run);
router.get('/categories', GetCategories.run);
router.post('/products/:code', SaveInfoProduct.run);
router.post('/filter', FilterProductByName.run);
router.put('/products/:code', UpdateInfoProduct.run);

export default router