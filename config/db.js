import mongoose from "mongoose"

const mongoDB = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the mongodb")
    }
    catch (error) {
        console.log(`Error while connecting${error}`)
    }
}

export default mongoDB;