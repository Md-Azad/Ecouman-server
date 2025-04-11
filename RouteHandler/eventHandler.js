const express = require("express");
const router = express.Router();

const Event = require("../schemas/eventSchema");

// Add an Event
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const newEvent = new Event(data);
    const result = await newEvent.save();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// get all the events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    res.send(err);
  }
});

// get an event
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.findOne({ _id: id });
    res.send(result);
  } catch (error) {
    res.send("something went wrong.");
  }
});

// update an Event

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      createdBy,
      eventName,
      eventLocation,
      eventDate,
      donationNeed,
      volunteerNeed,
      eventPhoto,
      description,
    } = req.body;
    const result = await Event.findOne({ _id: id });
    if (createdBy !== result?.createdBy) {
      res.send("you are not the creator of this event.");
    } else {
      const updatedEvent = await Event.findOneAndUpdate(
        { _id: id },
        {
          createdBy,
          eventName,
          eventLocation,
          eventDate,
          donationNeed,
          volunteerNeed,
          eventPhoto,
          description,
        },
        { new: true }
      );
      if (!updatedEvent) {
        return res.status(404).json({ error: "Updating failed" });
      }
      res.status(202).send(updatedEvent);
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
