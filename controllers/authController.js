import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import { hashpassword, comparepassword } from "../helpers/authHelper.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        // Validation
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!answer) {
            return res.send({ message: 'Question is required' })
        }

        // Check user
        const existinguser = await userModel.findOne({ email })
        // Existing user
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered please login'
            })
        }

        // register user
        const hashedpassword = await hashpassword(password)
        // save
        const user = await new userModel({
            name, email, password: hashedpassword, phone, address, answer,
        }).save()

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
}

// Login page
export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        // Existing user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        // password
        const match = await comparepassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }

        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "90d"
        })

        // validation went correctly
        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

// test controller
export const testcontroller = (req, res) => {
    try {
        res.send("Protected routes")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

// forgot-password

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body
        // check
        if (!email) {
            res.status(400).send({
                message: 'Email is required'
            })
        }
        if (!answer) {
            res.status(400).send({
                message: 'question is required'
            })
        }
        if (!newpassword) {
            res.status(400).send({
                message: 'newpassword is required'
            })
        }
        // check
        const user = await userModel.findOne({ email, answer })
        // validation
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'Wrong Email or question'
            })
        }
        const hashed = await hashpassword(newpassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: 'Password reset successfully'
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

// update profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const user = await userModel.findById(req.user._id)
        // password
        if (password && password.length < 6) {
            return res.json({ error: 'Password is required and length should be 6 characters long' })
        }
        const hashedpassword = password ? await hashpassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: password || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true })
        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            updatedUser
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while updating',
            error
        })
    }
}

// orders
export const getOrdersController = async (req, res) => {
    try {
        const order = await orderModel.find({ buyer: req.user._id }).populate('products', '-photo').populate('buyer', 'name')
        res.json(order)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting orders',
            error
        })
    }
}

// all orders
export const getAllOrdersController = async (req, res) => {
    try {
        const order = await orderModel.find({}).populate('products', '-photo').populate('buyer', 'name').sort({ createdAt: "-1" })
        res.json(order)
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting all orders',
            error
        })
    }
}

//order status
export const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
};