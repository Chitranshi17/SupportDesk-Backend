const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getNotes, addNotes } = require("../controller/noteController");

const router = express.Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, addNotes);

module.exports = router;
