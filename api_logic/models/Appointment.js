// models/Appointment.js
const mongoose = require("mongoose");

const productInfoSchema = new mongoose.Schema({
  productType: { type: String, enum: ["consultation", "course"] },
  productId: String,
  productName: String,
  productImage: String,
  productPrice: String,
  productCategory: String,
  productRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "productInfo.productModel",
  },
  productModel: {
    type: String,
    enum: ["ConsultationService", "Course"],
  },
}, { _id: false });

const customerInfoSchema = new mongoose.Schema({
  name: String,
  occupation: String,
  email: String,
  phone: String,
  alternatePhone: String,
  gender: String,
  dateOfBirth: Date,
  birthDetails: {
    day: Number,
    month: Number,
    year: Number,
    hour: Number,
    minute: Number,
    second: Number,
    place: String,
  },
  address: String,
  country: String,
  state: String,
  city: String,
  postcode: String,
  pinCode: String,
}, { _id: false });

const bookingInfoSchema = new mongoose.Schema({
  bookingId: String,
  bookingDate: Date,
  consultationDate: Date,
  consultationTime: String,
  timeSlot: String,
  remarks: String,
  status: String,
}, { _id: false });

const paymentInfoSchema = new mongoose.Schema({
  amount: Number,
  amountInPaise: Number,
  currency: { type: String, default: "INR" },
  paymentStatus: String,
  paymentId: String,
  orderId: String,
  method: String,
  gateway: { type: String, default: "razorpay" },
  failureReason: String,
  cancelledAt: Date,
  refundedAt: Date,
  paidAt: Date,
}, { _id: false });

const razorpayInfoSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  receipt: String,
  orderStatus: String,
  paymentStatus: String,
  method: String,
  captured: Boolean,
  international: Boolean,
  email: String,
  contact: String,
  bank: String,
  wallet: String,
  vpa: String,
  cardId: String,
  fee: Number,
  tax: Number,
  errorCode: String,
  errorDescription: String,
  signatureVerified: Boolean,
  signatureHash: String,
  verifiedAt: Date,
}, { _id: false });

const appointmentSchema = new mongoose.Schema({
  // User Details
  name: { type: String, required: true },
  occupation: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  alternatePhone: String,
  gender: String,
  dateOfBirth: Date,

  // Birth Details
  birthDetails: {
    day: Number,
    month: Number,
    year: Number,
    hour: Number,
    minute: Number,
    second: Number,
    place: String,
  },

  address: String,
  country: String,
  state: String,
  city: String,
  postcode: String,
  pinCode: String,
  remarks: String,

  // Slot
  consultationDate: Date,
  consultationTime: String,
  timeSlot: String,

  // Service Link 🔥
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConsultationService",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  productType: {
    type: String,
    enum: ["consultation", "course"],
    default: "consultation",
  },
  productId: String,
  productName: String,
  productImage: String,
  productPrice: String,
  productCategory: String,
  productInfo: productInfoSchema,
  serviceTitle: String,
  serviceCategory: String,

  // Payment
  amount: Number,
  currency: { type: String, default: "INR" },
  paymentId: String,
  orderId: String,
  paymentFailureReason: String,
  paymentCancelledAt: Date,
  refundedAt: Date,
  paymentInfo: paymentInfoSchema,
  razorpayInfo: razorpayInfoSchema,
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed", "cancelled", "refunded"],
    default: "pending",
  },

  // Status
  status: {
    type: String,
    enum: ["pending", "new", "confirmed", "completed", "failed", "cancelled", "refunded"],
    default: "pending",
  },
  
  // Admin Notes
  adminNotes: String,
  consultationLink: String,
  
  // Booking ID for tracking
  bookingId: String,
  bookingDate: { type: Date, default: Date.now },
  customerInfo: customerInfoSchema,
  bookingInfo: bookingInfoSchema

}, { timestamps: true });

appointmentSchema.index({ bookingId: 1 }, { unique: true, sparse: true });
appointmentSchema.index({ orderId: 1 }, { sparse: true });
appointmentSchema.index({ paymentId: 1 }, { sparse: true });
appointmentSchema.index({ "productInfo.productType": 1, createdAt: -1 });

// Generate Booking ID
appointmentSchema.pre('save', async function() {
  if (!this.bookingId) {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    this.bookingId = `NB${timestamp}${random}`;
  }
  if (!this.bookingDate) this.bookingDate = new Date();
  if (this.bookingInfo) {
    this.bookingInfo.bookingId = this.bookingId;
    this.bookingInfo.bookingDate = this.bookingInfo.bookingDate || this.bookingDate;
    this.bookingInfo.status = this.status;
  }
});

module.exports = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
