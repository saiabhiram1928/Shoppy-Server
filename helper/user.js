const sendResUser = (res ,user ,token) =>{
     return res.status(200).json({
        _id : user._id,
        email : user.email,
        name : user.name,
        isAdmin : user.isAdmin,
        token 
    })
}
module.exports = {sendResUser}