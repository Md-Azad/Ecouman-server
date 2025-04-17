const User = require("../schemas/userSchema");

const verifyAdmin = async (req, res, next) => {
  const query = { email: req.params.email };
  const result = await User.findOne(query);

  const isAdmin = result?.role === "admin";

  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access from admin" });
  }

  next();
};

module.exports = verifyAdmin;
