const express = require('express');
const router = express.Router();
const asycnHandler = require('express-async-handler');
const protectRoute = require('../middleware/authMiddleware')
const {
    registerUser,
    loginUser, 
    getUserById, 
} = require('../controllers/userController');

router.post('/reg', registerUser);
router.post('/login', loginUser);
router.get('/:userId', protectRoute, getUserById);

module.exports = router
