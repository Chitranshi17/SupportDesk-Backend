const Ticket = require("../models/ticketModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  // Get User id from jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found!!");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.send(ticket);
});

// Get Tickets
const getTickets = asyncHandler(async (req, res) => {
  //  Get User Id From JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found!");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  if (!tickets) {
    res.status(404);
    throw new Error("Tickets Not Found");
  }

  res.status(200).json(tickets);
});

// Get Single Ticket
const getTicket = asyncHandler(async (req, res) => {
  //  Get User Id From JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }
  res.status(200).json(ticket);
});

// Delete Ticket
const deleteTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  } else {
    await Ticket.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "Ticket Deleted!!",
    });
  }
});

// const updateTicket = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user.id);
//   if (!user) {
//     res.status(401);
//     throw new Error("User Not Found");
//   }

//   const ticket = await Ticket.findById(req.params.id);
//   if (!ticket) {
//     res.status(401);
//     throw new Error("Ticket Not Found");
//   }

//   if (ticket.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("Not Authorized");
//   }

//   const updatedTicket = await Ticket.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );

//   res.status(200).json(updateTicket);
// });

// Update Ticket

const updateTicket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket Not Found!");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
