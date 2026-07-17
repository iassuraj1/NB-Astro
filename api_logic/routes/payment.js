// routes/payment.js
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { razorpay, isRazorpayConfigured, assertRazorpayConfigured } = require("../Utils/razorpay");
const Appointment = require("../models/Appointment");
const ConsultationService = require("../models/ConsultationService");
const Course = require("../models/Course");

const parseAmount = (value) => {
  if (typeof value === "number") return value;
  const numeric = String(value || "").replace(/[^\d.]/g, "");
  return Number(numeric) || 0;
};

const hashValue = (value) => {
  if (!value) return undefined;
  return crypto.createHash("sha256").update(String(value)).digest("hex");
};

const getPaymentGatewayErrorMessage = (error) => {
  if (error?.statusCode === 401) {
    return "Razorpay authentication failed. Please check that RAZORPAY_KEY_ID starts with rzp_test_ or rzp_live_, and RAZORPAY_KEY_SECRET is the matching secret for the same key from Razorpay Dashboard.";
  }

  return (
    error?.error?.description ||
    error?.error?.reason ||
    error?.description ||
    error?.message ||
    "Could not create payment order."
  );
};

const resolveBookingProduct = async (formData = {}) => {
  const productType = formData.productType === "course" ? "course" : "consultation";
  const productId = formData.productId || formData.courseId || formData.serviceId;
  const product = productType === "course"
    ? await Course.findById(productId)
    : await ConsultationService.findById(productId);

  if (!product) return null;

  return {
    product,
    productType,
    productPrice: product.price || product.courseFee || String(product.priceNumeric || ""),
    productCategory: product.category || product.type || productType,
    productAmount: formData.amountPaid || parseAmount(product.priceNumeric || product.courseFee || product.price),
  };
};

router.get("/config", (req, res) => {
  const configured = isRazorpayConfigured();
  res.json({
    success: true,
    configured,
    keyId: configured ? process.env.RAZORPAY_KEY_ID : "",
    message: configured
      ? "Razorpay is configured."
      : "Razorpay is not configured correctly. Use API Key ID starting with rzp_test_ or rzp_live_. Merchant ID is not valid for Checkout orders.",
  });
});

const buildRazorpayInfo = ({ order, payment, signature, signatureVerified, error } = {}) => ({
  orderId: order?.id || payment?.order_id,
  paymentId: payment?.id,
  receipt: order?.receipt,
  orderStatus: order?.status,
  paymentStatus: payment?.status,
  method: payment?.method,
  captured: payment?.captured,
  international: payment?.international,
  email: payment?.email,
  contact: payment?.contact,
  bank: payment?.bank,
  wallet: payment?.wallet,
  vpa: payment?.vpa,
  cardId: payment?.card_id,
  fee: payment?.fee,
  tax: payment?.tax,
  errorCode: error?.code || payment?.error_code,
  errorDescription: error?.description || payment?.error_description,
  signatureVerified,
  signatureHash: hashValue(signature),
  verifiedAt: signatureVerified ? new Date() : undefined,
});

const buildAppointmentPayload = ({
  formData = {},
  product,
  productType,
  productPrice,
  productCategory,
  productAmount,
  orderId,
  paymentId,
  paymentStatus,
  status,
  order,
  payment,
  razorpaySignature,
  signatureVerified,
  failureReason,
  cancelledAt,
  refundedAt,
}) => ({
  name: formData.name,
  occupation: formData.occupation,
  email: formData.email,
  phone: formData.phone,
  alternatePhone: formData.alternatePhone,
  gender: formData.gender,
  dateOfBirth: formData.dateOfBirth,
  birthDetails: formData.birthDetails,
  address: formData.address,
  country: formData.country,
  state: formData.state,
  city: formData.city,
  postcode: formData.postcode || formData.pinCode,
  pinCode: formData.pinCode || formData.postcode,
  remarks: formData.remarks,
  consultationDate: formData.consultationDate,
  consultationTime: formData.consultationTime,
  timeSlot: formData.timeSlot,
  service: productType === "consultation" ? product._id : undefined,
  course: productType === "course" ? product._id : undefined,
  productType,
  productId: String(product._id),
  productName: product.title,
  productImage: product.image || "",
  productPrice,
  productCategory,
  productInfo: {
    productType,
    productId: String(product._id),
    productName: product.title,
    productImage: product.image || "",
    productPrice,
    productCategory,
    productRef: product._id,
    productModel: productType === "course" ? "Course" : "ConsultationService",
  },
  serviceTitle: product.title,
  serviceCategory: productCategory,
  amount: productAmount,
  currency: formData.currency || "INR",
  paymentId,
  orderId,
  paymentFailureReason: failureReason,
  paymentCancelledAt: cancelledAt,
  refundedAt,
  paymentInfo: {
    amount: productAmount,
    amountInPaise: Math.round(Number(productAmount || 0) * 100),
    currency: formData.currency || "INR",
    paymentStatus,
    paymentId,
    orderId,
    method: payment?.method,
    gateway: "razorpay",
    failureReason,
    cancelledAt,
    refundedAt,
    paidAt: paymentStatus === "success" ? new Date() : undefined,
  },
  razorpayInfo: buildRazorpayInfo({
    order,
    payment,
    signature: razorpaySignature,
    signatureVerified,
    error: failureReason ? { description: failureReason } : undefined,
  }),
  paymentStatus,
  status,
  customerInfo: {
    name: formData.name,
    occupation: formData.occupation,
    email: formData.email,
    phone: formData.phone,
    alternatePhone: formData.alternatePhone,
    gender: formData.gender,
    dateOfBirth: formData.dateOfBirth,
    birthDetails: formData.birthDetails,
    address: formData.address,
    country: formData.country,
    state: formData.state,
    city: formData.city,
    postcode: formData.postcode || formData.pinCode,
    pinCode: formData.pinCode || formData.postcode,
  },
  bookingInfo: {
    bookingDate: new Date(),
    consultationDate: formData.consultationDate,
    consultationTime: formData.consultationTime,
    timeSlot: formData.timeSlot,
    remarks: formData.remarks,
    status,
  },
});

router.post("/create-order", async (req, res) => {
  try {
    assertRazorpayConfigured();

    const { amount, currency = "INR", formData } = req.body;
    const amountInPaise = Math.round(Number(amount || 0) * 100);

    if (!amountInPaise || amountInPaise <= 0) {
      return res.status(400).json({ success: false, message: "Invalid payment amount" });
    }

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency,
      receipt: "receipt_" + Date.now(),
    });

    if (!formData) {
      return res.json(order);
    }

    const resolved = await resolveBookingProduct({ ...formData, currency, amountPaid: amount });
    if (!resolved) {
      return res.status(404).json({ success: false, message: "Booking product not found" });
    }

    const appointment = await Appointment.create(buildAppointmentPayload({
      formData: { ...formData, currency },
      ...resolved,
      productAmount: amount,
      orderId: order.id,
      order,
      paymentStatus: "pending",
      status: "pending",
    }));

    res.json({
      success: true,
      message: "Payment order created. Booking is pending payment.",
      order,
      bookingId: appointment.bookingId,
      appointmentId: appointment._id,
    });
  } catch (err) {
    console.error("Payment order creation error:", err);
    const message = getPaymentGatewayErrorMessage(err);
    res.status(err.statusCode || 500).json({
      success: false,
      message,
      error: message,
    });
  }
});

router.post("/verify-payment", async (req, res) => {
  try {
    assertRazorpayConfigured();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await Appointment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentStatus: "failed",
          status: "failed",
          paymentFailureReason: "Invalid Razorpay signature",
          paymentId: razorpay_payment_id,
        }
      );
      return res.status(400).json({ success: false, message: "Payment verification failed. Invalid signature." });
    }

    const resolved = await resolveBookingProduct(formData);
    if (!resolved) {
      return res.status(404).json({ success: false, message: "Booking product not found" });
    }

    const razorpayPayment = await razorpay.payments.fetch(razorpay_payment_id).catch(() => null);
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id).catch(() => null);

    const successPayload = buildAppointmentPayload({
      formData,
      ...resolved,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      paymentStatus: "success",
      status: "confirmed",
      order: razorpayOrder || { id: razorpay_order_id },
      payment: razorpayPayment || { id: razorpay_payment_id, order_id: razorpay_order_id },
      razorpaySignature: razorpay_signature,
      signatureVerified: true,
    });

    let appointment = await Appointment.findOne({ orderId: razorpay_order_id });
    if (appointment) {
      successPayload.bookingDate = appointment.bookingDate || successPayload.bookingDate;
      successPayload.bookingInfo = {
        ...successPayload.bookingInfo,
        bookingId: appointment.bookingId,
        bookingDate: appointment.bookingDate || appointment.createdAt || new Date(),
      };
      Object.assign(appointment, successPayload);
      await appointment.save();
    } else {
      appointment = await Appointment.create(successPayload);
    }

    // Send email notifications to owner and user
    try {
      const { sendMail } = require("../Utils/mailer");
      
      const ownerEmail = "iassurajbhagat1@gmail.com";
      const userEmail = appointment.email;
      const productName = appointment.productName || "Service/Course";
      const bookingId = appointment.bookingId;
      
      // Email to Owner
      const ownerSubject = `[New Booking Confirmed] Booking ID: ${bookingId} - ${productName}`;
      const ownerHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="color: #00B7B3;">New Confirmed Booking</h2>
          <p>A new payment has been verified, and the booking is confirmed.</p>
          <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px; border: 1px solid #e5e7eb;">
            <tr style="background-color: #f9fafb;"><td colspan="2"><strong>Customer Details</strong></td></tr>
            <tr><td><strong>Name</strong></td><td>${appointment.name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${appointment.email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${appointment.phone}</td></tr>
            <tr><td><strong>City/State</strong></td><td>${appointment.city || 'N/A'}, ${appointment.state || 'N/A'}</td></tr>
            <tr style="background-color: #f9fafb;"><td colspan="2"><strong>Booking Details</strong></td></tr>
            <tr><td><strong>Booking ID</strong></td><td>${bookingId}</td></tr>
            <tr><td><strong>Product/Course</strong></td><td>${productName} (Type: ${appointment.productType})</td></tr>
            <tr><td><strong>Amount Paid</strong></td><td>₹${appointment.amount}</td></tr>
            <tr><td><strong>Payment ID</strong></td><td>${appointment.paymentId}</td></tr>
            <tr><td><strong>Order ID</strong></td><td>${appointment.orderId}</td></tr>
            ${appointment.consultationDate ? `<tr><td><strong>Date/Time</strong></td><td>${appointment.consultationDate} at ${appointment.consultationTime || appointment.timeSlot || 'N/A'}</td></tr>` : ''}
          </table>
        </div>
      `;
      
      await sendMail({
        to: ownerEmail,
        subject: ownerSubject,
        html: ownerHtml,
        replyTo: userEmail
      });
      
      // Email to User
      const userSubject = `Booking Confirmed! ID: ${bookingId} - NB Astro`;
      const userHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #00B7B3; margin-top: 0;">Booking Confirmed!</h2>
          <p>Dear ${appointment.name},</p>
          <p>Thank you for choosing NB Astro. Your booking has been successfully confirmed. Below are your booking details:</p>
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #e5e7eb;">
            <p style="margin: 4px 0;"><strong>Booking ID:</strong> ${bookingId}</p>
            <p style="margin: 4px 0;"><strong>Product/Service:</strong> ${productName}</p>
            <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${appointment.amount}</p>
            ${appointment.consultationDate ? `<p style="margin: 4px 0;"><strong>Schedule:</strong> ${appointment.consultationDate} at ${appointment.consultationTime || appointment.timeSlot || 'N/A'}</p>` : ''}
          </div>
          <p>We will get in touch with you shortly with further details. If you have any questions, please reply to this email or contact us.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 14px; color: #6b7280;">Best regards,<br/><strong>NB Astro Team</strong></p>
        </div>
      `;
      
      await sendMail({
        to: userEmail,
        subject: userSubject,
        html: userHtml
      });
      
      console.log(`✅ Booking confirmation emails sent for Booking ID: ${bookingId}`);
    } catch (mailError) {
      console.error("❌ Failed to send booking confirmation emails:", mailError.message);
    }

    res.json({
      success: true,
      message: "Payment verified successfully. Booking confirmed.",
      appointment,
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    const message = getPaymentGatewayErrorMessage(err);
    res.status(err.statusCode || 500).json({ success: false, message, error: message });
  }
});

router.post("/payment-failed", async (req, res) => {
  try {
    const { orderId, paymentId, reason } = req.body;
    const appointment = await Appointment.findOne({ orderId });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Pending booking not found" });
    }

    appointment.paymentId = paymentId || appointment.paymentId;
    appointment.paymentStatus = "failed";
    appointment.status = "failed";
    appointment.paymentFailureReason = reason || "Payment failed";
    appointment.paymentInfo = {
      ...(appointment.paymentInfo?.toObject ? appointment.paymentInfo.toObject() : appointment.paymentInfo || {}),
      paymentStatus: "failed",
      paymentId: paymentId || appointment.paymentId,
      orderId,
      failureReason: reason || "Payment failed",
      gateway: "razorpay",
    };
    appointment.razorpayInfo = {
      ...(appointment.razorpayInfo?.toObject ? appointment.razorpayInfo.toObject() : appointment.razorpayInfo || {}),
      orderId,
      paymentId: paymentId || appointment.paymentId,
      paymentStatus: "failed",
      errorDescription: reason || "Payment failed",
      signatureVerified: false,
    };
    appointment.bookingInfo = {
      ...(appointment.bookingInfo?.toObject ? appointment.bookingInfo.toObject() : appointment.bookingInfo || {}),
      bookingId: appointment.bookingId,
      bookingDate: appointment.bookingDate || appointment.createdAt,
      status: "failed",
    };
    await appointment.save();

    res.json({ success: true, message: "Payment failed. Booking was not confirmed.", appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/payment-cancelled", async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const appointment = await Appointment.findOne({ orderId });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Pending booking not found" });
    }

    appointment.paymentStatus = "cancelled";
    appointment.status = "cancelled";
    appointment.paymentFailureReason = reason || "Payment cancelled by user";
    appointment.paymentCancelledAt = new Date();
    appointment.paymentInfo = {
      ...(appointment.paymentInfo?.toObject ? appointment.paymentInfo.toObject() : appointment.paymentInfo || {}),
      paymentStatus: "cancelled",
      orderId,
      failureReason: reason || "Payment cancelled by user",
      cancelledAt: appointment.paymentCancelledAt,
      gateway: "razorpay",
    };
    appointment.razorpayInfo = {
      ...(appointment.razorpayInfo?.toObject ? appointment.razorpayInfo.toObject() : appointment.razorpayInfo || {}),
      orderId,
      paymentStatus: "cancelled",
      errorDescription: reason || "Payment cancelled by user",
      signatureVerified: false,
    };
    appointment.bookingInfo = {
      ...(appointment.bookingInfo?.toObject ? appointment.bookingInfo.toObject() : appointment.bookingInfo || {}),
      bookingId: appointment.bookingId,
      bookingDate: appointment.bookingDate || appointment.createdAt,
      status: "cancelled",
    };
    await appointment.save();

    res.json({ success: true, message: "Payment cancelled. Booking was not confirmed.", appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/mark-refunded", async (req, res) => {
  try {
    const { bookingId, reason } = req.body;
    const appointment = await Appointment.findOne({ bookingId });

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    appointment.paymentStatus = "refunded";
    appointment.status = "refunded";
    appointment.paymentFailureReason = reason || "Payment refunded";
    appointment.refundedAt = new Date();
    appointment.paymentInfo = {
      ...(appointment.paymentInfo?.toObject ? appointment.paymentInfo.toObject() : appointment.paymentInfo || {}),
      paymentStatus: "refunded",
      failureReason: reason || "Payment refunded",
      refundedAt: appointment.refundedAt,
      gateway: "razorpay",
    };
    appointment.bookingInfo = {
      ...(appointment.bookingInfo?.toObject ? appointment.bookingInfo.toObject() : appointment.bookingInfo || {}),
      bookingId: appointment.bookingId,
      bookingDate: appointment.bookingDate || appointment.createdAt,
      status: "refunded",
    };
    await appointment.save();

    res.json({ success: true, message: "Booking marked as refunded.", appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/track/:bookingId", async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ bookingId: req.params.bookingId })
      .populate("service", "title type image category price")
      .populate("course", "title type image category price courseFee");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, data: appointment });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
