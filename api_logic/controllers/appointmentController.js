// controllers/appointmentController.js
const Appointment = require("../models/Appointment");

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, category, paymentStatus, productType, dateFrom, dateTo } = req.query;
    let filter = {};
    
    if (status && status !== "all") filter.status = status;
    if (category) filter.serviceCategory = category;
    if (paymentStatus && paymentStatus !== "all") filter.paymentStatus = paymentStatus;
    if (productType && productType !== "all") filter.productType = productType;
    if (dateFrom || dateTo) {
      filter.bookingDate = {};
      if (dateFrom) filter.bookingDate.$gte = new Date(dateFrom);
      if (dateTo) {
        const endDate = new Date(dateTo);
        endDate.setHours(23, 59, 59, 999);
        filter.bookingDate.$lte = endDate;
      }
    }
    
    const appointments = await Appointment.find(filter)
      .populate("service", "title type image category price")
      .populate("course", "title type image category price courseFee")
      .sort("-createdAt");
    
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("service", "title type image category price")
      .populate("course", "title type image category price courseFee");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes, consultationLink } = req.body;
    
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }
    
    if (status) appointment.status = status;
    if (adminNotes !== undefined) appointment.adminNotes = adminNotes;
    if (consultationLink !== undefined) appointment.consultationLink = consultationLink;
    
    await appointment.save();
    
    res.json({ success: true, message: "Appointment updated", data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointment stats
exports.getAppointmentStats = async (req, res) => {
  try {
    const total = await Appointment.countDocuments();
    const newBookings = await Appointment.countDocuments({ status: "new" });
    const pending = await Appointment.countDocuments({ paymentStatus: "pending" });
    const success = await Appointment.countDocuments({ paymentStatus: "success" });
    const failed = await Appointment.countDocuments({ paymentStatus: "failed" });
    const confirmed = await Appointment.countDocuments({ status: "confirmed" });
    const completed = await Appointment.countDocuments({ status: "completed" });
    const cancelled = await Appointment.countDocuments({ status: "cancelled" });
    const refunded = await Appointment.countDocuments({ paymentStatus: "refunded" });
    
    const astrology = await Appointment.countDocuments({ serviceCategory: "astrology" });
    const vastu = await Appointment.countDocuments({ serviceCategory: "vastu" });
    
    const revenue = await Appointment.aggregate([
      { $match: { paymentStatus: "success", status: { $nin: ["cancelled", "failed", "refunded"] } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        new: newBookings,
        pending,
        success,
        failed,
        confirmed,
        completed,
        cancelled,
        refunded,
        astrology,
        vastu,
        totalRevenue: revenue[0]?.total || 0,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
