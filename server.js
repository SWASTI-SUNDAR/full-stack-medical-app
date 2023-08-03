const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/ConnectDb");
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(morgan("dev"));

//conmect to db
connectDB();

//Routes
app.use("/api/v1/user", require("./routes/userRoutes"));

//app listening to port
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.NODEENV} mode port ${PORT}`.bgYellow
      .black
  );
});
