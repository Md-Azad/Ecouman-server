require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

const userHandler = require("./RouteHandler/userHandler");
const eventHandler = require("./RouteHandler/eventHandler");
const dbConnect = require("./db/dbConnect");

app.use(cors());
app.use(express.json());

//  Database connection

dbConnect();

//   routers
app.get("/", async (req, res) => {
  res.send("your server is running.");
});

app.use("/users", userHandler);
app.use("/events", eventHandler);

app.listen(port, () => {
  console.log(`your server is running on : http://localhost:${port}`);
});
