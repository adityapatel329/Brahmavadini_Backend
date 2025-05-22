const User = require('../models/User');
const crypto = require('crypto');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_FROM_NUMBER;
const client = twilio(accountSid, authToken);

// Helper to generate a 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper to send SMS
async function sendSMS(mobile, otp) {
  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: twilioFrom,
    to: mobile
  });
}

// Register user and send OTP
async function registerUser({ mobile }) {
  const userId = crypto.randomUUID();
  const otp = generateOTP();

  // Save user with OTP
  const user = new User({
    userId,
    mobile,
    otp,
    isVerified: false
  });
  await user.save();

  // Send OTP via SMS
  await sendSMS(mobile, otp);

  return { userId, mobile };
}

// Verify OTP
async function verifyOTP({ userId, otp }) {
  const user = await User.findOne({ userId });
  if (!user) return false;
  if (user.otp === otp) {
    user.isVerified = true;
    user.otp = undefined;
    await user.save();
    return true;
  }
  return false;
}

module.exports = { registerUser, verifyOTP }; 