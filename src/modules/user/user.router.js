import { Router } from "express";
import * as usercontroller from "./user.controller.js"
import { checkEmailExist } from "../../middleWare/checkUserExist.js";
import { hashPassword } from "../../middleWare/hashPassword.js";

const router = Router();


//sign-up
    router.post('/signup', checkEmailExist , hashPassword ,usercontroller.signUp)
    router.post('/signin',usercontroller.signIn)
    router.put('/updateuser/:id',usercontroller.updateUser)
    router.delete('/deleteuser/:id',usercontroller.deleteUser)
    router.get('/getallusers',usercontroller.getAllUsers)
    router.get('/finduser',usercontroller.finduser)
    router.get('/userages',usercontroller.userAges)
    router.get('/getuserproducts/:id',usercontroller.getusers)



export default router;