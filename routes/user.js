const express =require('express');
const router = express.Router()
const { login,
    register,
    logout,
    getProfile,
    updateProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById} =require('../controllers/user')
const {authenticate , admin} =require('../middleware/authMiddleware')
router.post("/", login);
router.post("/register", register);
router.post("/logout",authenticate, logout);
router.get("/profile", authenticate, getProfile);
router.put("/profile",authenticate, updateProfile);
router.get("/users", admin,getAllUsers);
router.get("/users/:id",admin, getUserById);
router.put("/users/:id", admin ,updateUserById);
router.delete("/users/:id", admin,deleteUserById);

module.exports =router