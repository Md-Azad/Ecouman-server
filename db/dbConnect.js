const mongoose = require("mongoose");
const dbConnect = () => {
  mongoose
    .connect(process.env.url)
    .then(() => {
      console.log("database connected successfull");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
