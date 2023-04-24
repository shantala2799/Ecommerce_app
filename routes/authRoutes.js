import express from 'express';
import { registerController, logincontroller, testcontroller, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js';
import { isAdmin, requiresignIn } from '../middlewares/authMiddleware.js';
// router object
const router = express.Router()

// routing
// Register||method POST
router.post('/register', registerController)//registerController is an callback function

// LOGIN ||METHOD::POST 
router.post('/login', logincontroller)

// Forgot password||POST
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', requiresignIn, isAdmin, testcontroller)

// user protected route auth
router.get('/user-auth', requiresignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// admin protected route auth
router.get('/admin-auth', requiresignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// update profile
router.put('/profile', requiresignIn, updateProfileController)

// orders
router.get('/orders', requiresignIn, getOrdersController)

// all orders
router.get('/all-orders', requiresignIn, isAdmin, getAllOrdersController)

// order status update
router.put(
    "/order-status/:orderId",
    requiresignIn,
    isAdmin,
    orderStatusController
);

export default router;