const express = require('express');
const router = express.Router();
const { register, verify } = require('../controllers/userController');

// Register user
router.post('/register', register);

// Verify OTP
router.post('/verify-otp', verify);

module.exports = router; 