import express from 'express';
import {productListController, productDetailsController} from '../controllers/productControllers'

const router = express.Router()

router.get('/', productListController)
router.get('/productDetails/:id', productDetailsController)

export default router;