import { connectDB } from "../DB/connection.js";
import userRouter from './modules/user/user.router.js'
import productRouter from './modules/product/product.router.js'

export const bootstrap = (app , express )=>{
    app.use(express.json());
    app.use("/user" , userRouter);
    app.use("/product" , productRouter);
    app.all("*" , (req,res,next)=>{
        return res.json({message:"invalid routing"})
    })
    connectDB() //connect the database
}