const mongoose = require("mongoose");
const User = require("../schemas/userSchema");

const verifyAdmin = async (req, res, next) => {
  console.log("email from request: ", email);
  const query = { email: email };
  const result = await User.findOne(query);

  const isAdmin = result?.role === "admin";

  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access from admin" });
  }

  next();
};

module.exports = verifyAdmin;
