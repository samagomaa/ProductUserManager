import { Error } from "mongoose"
import { userModel } from "../../DB/models/user.model.js";



export const checkEmailExist = async (req,res,next)=>{
    try{
        const {email} = req.body;
        const isExist = await userModel.findOne({email})
        if(isExist){
            
            throw new Error("user already exist");
        }
        next()
    } catch(err) {
        return res.json({
            success: false,
            message:"fail",
            err: err.message,
        })
    }
    
}