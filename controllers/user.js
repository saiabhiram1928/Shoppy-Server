const User = require('../models/user.js')
const asyncHandler = require('../middleware/asyncHandler.js')
const {genToken}  =require('../helper/token.js')
const {sendResUser}  =require('../helper/user.js')
//@desc   login user
//@route  POST /auth
//@acess  Public
const login = asyncHandler(async(req, res) => {
    console.log("login called")
    const {email , password} = req.body
    let user = await User.findOne({ email})
    if(user && (await user.matchPassword(password))){
        const token =genToken(user._id , res)
        return sendResUser(res , user ,token)
    }else{
        res.status(401)
        throw new Error('Invalid email Or password')  
    }
})
//@desc   register user
//@route  POST /auth/register
//@acess  Public
const register = asyncHandler(async(req, res) => {
    const  {name,email,password} = req.body
    let user  =await User.findOne({email})
    if(user){
        res.status(400)
        throw new Error('User already exists')
    }
    user = await User.create({name,email,password})
    if(user){
       const token = genToken(user._id , res)
       return sendResUser(res, user,token)
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.send('register user')
})
//@desc   logout user
//@route  POST /auth/logout
//@acess  Private
const logout = asyncHandler(async(req, res) => {
    res.cookie('jwt' , '' , { 
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({message : "Sucessfully Logged Out"})
})
//@desc   get user profile
//@route  GET /auth/profile
//@acess  Private
const getProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        return sendResUser(res,user , req.body.token)
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})
//@desc   update profile
//@route  PUT /auth/profile
//@acess  Private
const updateProfile = asyncHandler(async(req, res) => {
    let user = await User.findById(req.body.id)
    if(user){
        user.name = req.body.name || user.name 
        user.email = req.body.email
        if(req.body.password){
            user.password = req.body.password
        }
        user = await user.save()
        return sendResUser(res , user,req.body.token )
    }else{
        res.status(400)
        throw new Error('user not found')
    }
})

//@desc   Get all users(admin)
//@route  GET /auth/users
//@acess  Private
const getAllUsers = asyncHandler(async(req, res) => {
    res.send("get all users");
  })
//@desc   Get single users(admin)
//@route  GET /auth/users/:id
//@acess  Private
const getUserById = asyncHandler(async(req, res) => {
    res.json("get single user");
})
//@desc   update single users(admin)
//@route  PUT /auth/users/:id
//@acess  Private
const updateUserById = asyncHandler(async(req, res) => {
    res.json("update single user");
})
//@desc   delete single users(admin)
//@route  DELETE /auth/users/:id
//@acess  Private
const deleteUserById = asyncHandler(async(req, res) => {
    res.json("delete single user");
})
module.exports = {
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}