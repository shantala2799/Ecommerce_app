import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import mongoDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoute.js"
import cors from 'cors'
import productRoutes from "./routes/productRoutes.js"
import path from 'path'
import exp from 'constants';

// Configure dotenv
dotenv.config();

// database config
mongoDB()

// rest objects
const app = express();

// middlewares
app.use(cors())
app.use(express.json())//alternative bodyparser
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)

app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})