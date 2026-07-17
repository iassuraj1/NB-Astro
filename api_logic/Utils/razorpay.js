const Razorpay = require("razorpay");

const isRazorpayConfigured = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  return Boolean(
    keyId &&
    keySecret &&
    /^rzp_(test|live)_/.test(keyId) &&
    keySecret !== "your_razorpay_key_secret"
  );
};

const assertRazorpayConfigured = () => {
  if (!isRazorpayConfigured()) {
    const error = new Error("Razorpay is not configured correctly. RAZORPAY_KEY_ID must start with rzp_test_ or rzp_live_, and RAZORPAY_KEY_SECRET must be the matching API key secret from Razorpay Dashboard. Merchant ID is not valid for Checkout orders.");
    error.statusCode = 503;
    throw error;
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = {
  razorpay,
  isRazorpayConfigured,
  assertRazorpayConfigured,
};
