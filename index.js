require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const userHandler = require("./RouteHandler/userHandler");

app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.url)
  .then(() => {
    console.log("database connected successfull");
  })
  .catch((err) => {
    console.log(err);
  });

//   routers
app.get("/", async(req, res)=>{
  res.send("your server is running.")
})

app.use("/users", userHandler);

app.listen(port, () => {
  console.log(`your server is running on : http://localhost:${port}`);
});
