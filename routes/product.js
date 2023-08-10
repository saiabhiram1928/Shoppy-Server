const express =require('express');
const router = express.Router()
const {authenticate , admin} =require('../middleware/authMiddleware')
const {getProducts , getProductById ,createProductReview,getTopProducts} =require('../controllers/product')
router.get("/", getProducts);
router.get("/top",getTopProducts);
router.get("/:id",getProductById);
router.post("/:id/reviews",authenticate,createProductReview);


module.exports =router