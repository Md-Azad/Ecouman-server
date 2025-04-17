const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventLocation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  eventPhoto: {
    type: String,
    required: true,
  },
  donationNeed: {
    type: Number,
    required: true,
  },
  donationCollected: {
    type: Number,
    default: 0,
  },
  volunteerNeed: {
    type: Number,
    required: true,
  },
  volunteerGot: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Event = new mongoose.model("Event", eventSchema);

module.exports = Event;
