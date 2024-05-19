import { productModel } from "../../../DB/models/product.model.js"
import { userModel } from "../../../DB/models/user.model.js"


//add product
export const addProduct = async (req,res,next)=>{
    const isExist = await userModel.findById(req.body.userID)
    if(isExist){
        const addedProduct = await productModel.insertMany(req.body)
        if(addedProduct){
            res.json({success: true,  message:"product added successfuly"})
        }else{
            res.json({success: false, message:"failed to add product"})
        }
    }else{
        res.json({success: false, message:"user doesn't exist"})
    }
    
    
}

//delete product 
export const deleteproduct = async(req,res,next)=>{
    const {userID} = req.body
    const deletedProduct = await productModel.findOneAndDelete({
        _id:req.params.id,
        userID: userID
    })
    if(!deletedProduct) res.json({success:true, message:"product not found"})
    else{
        res.json({success:true,message:"product deleted successfully"})
    }
    
}

//update product 
export const updateproduct = async(req,res,next)=>{
    const  updateFields = req.body
    const owner = await productModel.find({userID: updateFields.userID , _id : req.params.id})
    if(owner.length) {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id , updateFields , {new: true})
        if(updatedProduct){
            res.json({
                success:true,
                message:"product updated successfully",
                product : updatedProduct
            })
        }else{
            res.json({
                success:false,
                message:"failed to update product",
            })
        }
    }
    else{
        res.json({success:true,message:"you are not the product owner"})
    }
    
}

//get all products
export const getAllProducts = async(req,res,next)=>{
    const allProducts = await productModel.find()
    res.json({success:true, allProducts})
}

//get product with owners 
export const productsWithOwners = async(req,res,next)=>{
    const productWithUser = await productModel.find().populate('userID');
    res.json({success:true, productWithUser})
}

// sort products descending
export const sortProducts = async(req,res,next)=>{
    const sortedProducts = await productModel.find().sort({createdAt : -1})
    if(sortedProducts.length){
        res.json({
            success: true,
            products: sortedProducts
        })
    }else{
        res.json({success: false , message:"thier is no product"})
    }
}

