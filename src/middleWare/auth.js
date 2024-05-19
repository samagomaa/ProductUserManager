import jwt from 'jsonwebtoken'


export const auth = (req,res,next)=>{
    let token = req.headers.token;
    jwt.verify(token , "userTokenForPrivacy" , async (err , decoded)=>{
        if(err){
            res.json({
                success: false,
                err : err
            })
        }else{
            next()
        }
    })
}