import { Router } from "express";
import * as productController from './product.controller.js'
import { auth } from "../../middleWare/auth.js";

const router = Router();
router.use(auth)
router.post('/addproduct' , productController.addProduct)
router.delete('/deleteproduct/:id' , productController.deleteproduct)
router.put('/updateproduct/:id', productController.updateproduct)
router.get('/getallproducts', productController.getAllProducts)
router.get('/productsWithOwners', productController.productsWithOwners)
router.get('/sortProducts', productController.sortProducts)



export default router;