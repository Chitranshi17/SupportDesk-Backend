const express = require("express");
const {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controller/ticketController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// router.post("/", protect, createTicket);

router.route("/").get(protect, getTickets).post(protect, createTicket);

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

// Re Routing Towards /api/ticket/:ticketId/note

router.use("/:ticketId/note", require("./noteRoutes"));
module.exports = router;
