import { Schema, Types, model } from "mongoose";

//schema
const userSchema = new Schema({
    username:{
        type:String,
        required : true,
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    gender:{
        type: String,
        enum : ['female', 'male'],
    },
    phone: {
        type:Number
    }
},
    { timestamps: true })

// model
    export const userModel = model("user" , userSchema)