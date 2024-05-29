const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db_config");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();

const PORT = process.env.PORT || 8000;

// DB Connection
connectDB();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO SUPPORT DESK API",
  });
});

// User Routes
app.use("/api/user", require("./routes/userRoutes"));

// Ticket Routes
app.use("/api/ticket", require("./routes/ticketRoutes"));

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`.bgBlue.white);
});
