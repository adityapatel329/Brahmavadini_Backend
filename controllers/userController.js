const { registerUser, verifyOTP } = require('../services/userService');

// POST /register
async function register(req, res) {
  try {
    const { mobile } = req.body;
    const result = await registerUser({ mobile });
    res.status(201).json({ success: true, user: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// POST /verify-otp
async function verify(req, res) {
  try {
    const { userId, otp } = req.body;
    const success = await verifyOTP({ userId, otp });
    if (success) {
      res.json({ success: true, message: 'User verified successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP or user.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { register, verify }; 