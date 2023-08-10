const jwt = require('jsonwebtoken')
const genToken = (id ,res)=>{
    const token = jwt.sign({userId : id } , process.env.SECRET_KEY ,{
        expiresIn : '30d'
    })
    console.log("token set" ,token)
    res.cookie("jwt",token ,
    {
        httpOnly:true,
        domain: 'localhost',
        path:'/',
        secure : process.env.NODE_ENV !== 'development',
        sameSite : 'lax',
        maxAge : 30*24*60*60*1000
    }
   )
   return token;

}
module.exports = {genToken}