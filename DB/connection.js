import mongoose from "mongoose";
export const connectDB = async ()=>{
    return await mongoose.connect("mongodb://127.0.0.1:27017/productApp")
    .then(()=>{
        console.log("Database is connected...");
    })
    .catch((err)=>{
        console.log("Error in database connection" , err);
    })
}