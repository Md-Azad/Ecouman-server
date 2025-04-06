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
  volunteerNeed: {
    type: Number,
    required: true,
  },
});

module.exports = eventSchema;
