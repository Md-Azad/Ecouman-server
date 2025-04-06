const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  console.log(bearerToken);
  if (!bearerToken) {
    res.status(403).send({ message: "Unauthorized Access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token Expired" });
      }
      res.status(403).send({ message: "Unauthorized Access" });
    }
    req.decoded = decoded;

    next();
  });
};

module.exports = verifyToken;
