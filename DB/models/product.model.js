import { Schema, Types, model } from "mongoose";

//schema
const productSchema = new Schema({
    name:{
        type:String,
        required : true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number
    },
    userID : { 
        type: Types.ObjectId ,
        ref : "user"
    }
},
    { timestamps: true })

// model
    export const productModel = model("product" , productSchema)