const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const eventSchema = require("../schemas/eventSchema");

const Event = new mongoose.model("Event", eventSchema);

router.post("/addevent", async (req, res) => {
  try {
    const data = req.body;
    console.log("data", data);
    const newEvent = new Event(data);
    const result = await newEvent.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
