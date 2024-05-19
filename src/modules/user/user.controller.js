import {userModel} from "../../../DB/models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { productModel } from "../../../DB/models/product.model.js"
//sign up
    export const signUp = async (req,res,next)=>{
        try{
            const {username , email , password , age , gender , phone} = req.body
                const user = {
                    username,
                    email,
                    password,
                    age,
                    gender,
                    phone
                }
                const newUser = await userModel.create(user)
                res.json({
                    success: true,
                    messsage:"user added successfully",
                    result : newUser
                })
        } catch(err) {
            return res.json({
                success: false,
                message:"fail",
                err: err.message,
            })
        }
    }

//sign in
export const signIn = async (req,res,next)=>{
    const {email , password} = req.body
    let user = await userModel.findOne({email})
    if(user && bcrypt.compareSync(password , user.password) ){ 
        let token = jwt.sign({userID: user.id , email: user.email} , "userTokenForPrivacy")
            return res.json({success: true , message: " log in successfully" , token})
    }
    else{
        return res.json({success: false , message: " wrong email or password..."})
    }
}

// update user
export const updateUser = async(req,res,next)=>{
    const updateFields = req.body;  // Object containing fields to update
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id , updateFields , {new: true})
    if(updatedUser){
        res.json({
            success:true,
            message:"user updated successfully",
            user : updatedUser
        })
    }else{
        res.json({
            success:false,
            message:"failed to update user",
        })
    }
}

//delete user
export const deleteUser = async(req,res,next)=>{
    const deletedUser = await userModel.findByIdAndDelete(req.params.id)
    if(!deletedUser) res.json({success:true, message:"note not found"})
    else{
        res.json({success:true,message:"user deleted successfully"})
    }
    
}

//search for user 
export const finduser = async(req,res,next)=>{
    const users = await userModel.find({
        username: { $regex: req.body.name , $options: 'i' }, // Case-insensitive search
        age: { $lt: req.body.maxAge },
    });
    if(users.length){
        res.json({
            success: true , 
            users : users
        })
    }else{
        res.json({
            success: false , 
            message:"there are no users under these conditions"
        })
    }
}

// search with ages 
export const userAges = async(req,res,next)=>{
    const users = await userModel.find({
        age: { $gte: req.body.minAge, $lte: req.body.maxAge },
    });

    if (users.length) {
        res.json({
            success: true,
            users: users,
        });
    } else {
        res.json({
            success: false,
            message: "There are no users within the specified age range.",
        });
    }
}
//getAllUsers
export const getAllUsers = async(req,res,next)=>{
    const allUsers = await userModel.find()
    res.json({success:true, allUsers})
}

//get user products 
export const getusers = async(req,res,next)=>{
    const userWithProduct = await productModel.find({ userID: req.params.id }).populate('userID' , "username -_id");
    res.json({success:true, userWithProduct})
}



