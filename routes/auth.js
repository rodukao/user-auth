const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

//Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

//Protected route
router.get('/profile', authMiddleware, getProfile);

module.exports = router;