const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../schemas/userSchema");
const verifyToken = require("../middlewares/token");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/jwt", async (req, res) => {
  const token = jwt.sign({ data: req.body.user }, "secret", {
    expiresIn: "1h",
  });

  res.send(token);
});

// Get all users from user database.
router.get("/allUser/:email", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get single user from user database.
router.get("/singleuser/:email", async (req, res) => {
  const email = req.params.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const user = await User.findOne({ email });
  res.json(user);
});

// save a new user to the database.
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newUser = new User(data);
    const savedUser = await newUser.save(); // Wait for the save to complete

    res.status(201).json(savedUser); // 201 status for successful creation
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ error: error.message }); // Send error details
  }
});

// update an existing user in the database.
router.put("/:email", async (req, res) => {
  const email = req.params.email; // Now using req.query

  const { role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Email and new role are required" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { role: role },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message }); // Send error details
  }
});

// delete user

router.delete("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const result = await User.deleteOne({ email: email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
