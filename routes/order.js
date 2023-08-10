const express =require('express');
const router = express.Router()
const {  addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,} =require('../controllers/order')
const {authenticate , admin} =require('../middleware/authMiddleware')

    router.route('/').post(authenticate, addOrderItems).get(authenticate, admin, getOrders);
    router.route('/mine').get(authenticate, getMyOrders);
    router.route('/:id').post(authenticate, getOrderById);
    router.route('/:id/pay').put(authenticate, updateOrderToPaid);
    router.route('/:id/deliver').put(authenticate, admin, updateOrderToDelivered);

module.exports =router