import express from "express";
import { isAdmin, requiresignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProduct, productPhotoController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, brainTreePaymentController } from "../controllers/ProductController.js";
import formidable from "express-formidable"

const router = express.Router()

// routes
// create products
router.post("/create-product", requiresignIn, isAdmin, formidable(), createProductController)

// Get product
router.get("/get-product", getProductController)

// single product ||GET
router.get('/single-product/:slug', getSingleProduct)

// get photo
router.get("/product-photo/:pid", productPhotoController);

// update product
router.put("/update-product/:pid", requiresignIn, isAdmin, formidable(), updateProductController)

// delete product
router.delete("/delete-product/:pid", deleteProductController)

// filter product
router.post("/product-filters", productFiltersController)

// product count
router.get("/product-count", productCountController)

// product perpage
router.get("/product-list/:page", productListController)

// search product
router.get("/search/:keyword", searchProductController)

// similar product
router.get("/related-product/:pid/:cid", relatedProductController)

// Categorywise product
router.get('/product-category/:slug', productCategoryController)

// payments 
// token-->comes from braintree for the verification of account,after verifacation itself we can continue for transaction
router.get("/braintree/token", braintreeTokenController);

// payments
router.post("/braintree/payment", requiresignIn, brainTreePaymentController);

export default router