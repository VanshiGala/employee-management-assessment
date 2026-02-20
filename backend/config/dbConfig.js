import mongoose from "mongoose";

const conn = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo connected")
    } catch (error) {
        console.error(error)
    }
}

export default conn