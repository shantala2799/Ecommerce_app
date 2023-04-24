import express from "express";
import { requiresignIn, isAdmin } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategory, getAllCategory, singleCategory } from "../controllers/CategoryController.js";
import { updateCategoryController } from "../controllers/CategoryController.js";

const router = express.Router()

// routes
// create category
router.post('/create-category', requiresignIn, isAdmin, createCategoryController)

//update category
router.put('/update-category/:id', requiresignIn, isAdmin, updateCategoryController)

// get category
router.get('/get-category', getAllCategory)

// get single category
router.get('/single-category/:slug', singleCategory)

// delete category
router.delete('/delete-category/:id', requiresignIn, isAdmin, deleteCategory)

export default router;