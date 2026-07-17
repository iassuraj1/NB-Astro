// routes/adminAppointmentRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  getAppointmentStats
} = require("../controllers/appointmentController");

router.get("/", protect, getAllAppointments);
router.get("/stats", protect, getAppointmentStats);
router.get("/:id", protect, getAppointmentById);
router.put("/:id", protect, updateAppointmentStatus);

module.exports = router;
