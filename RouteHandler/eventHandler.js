const express = require("express");
const router = express.Router();

const Event = require("../schemas/eventSchema");

// Add an Event
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newEvent = new Event(data);

    const result = await newEvent.save();

    res.send(result);
  } catch (error) {
    return res.send(error);
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
    const id = req.params.id;
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
    const findEvent = await Event.findOne({ _id: id });

    if (createdBy !== findEvent.createdBy) {
      return res.send({ message: "You do not own any events" });
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
        return res.send({ message: "updating failed" });
      } else {
        return res.send(updatedEvent);
      }
    }
  } catch (error) {
    return res.send({ message: `something went wrong, ${error}` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Event.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting Event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
