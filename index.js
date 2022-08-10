require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const app = express();

// Middlewares
app.use(helmet());
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(
  cors({
    credentials: false,
    origin: [
      "http://localhost:3003",
      "http://localhost:5000",
      "http://localhost:3000",
      "http://localhost:5500",
    ],
  })
);

// Middlewares for DDoS and bruteforce attacks
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  delayMs: 0,
});

const url = process.env.DB_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.use(limiter);

// Routes
app.use(require("./routes/index"));

// Static s
app.use(express.static(path.join(__dirname, "public")));

// Listen server
app.listen(process.env.PORT || 3000, () => {
  console.log("listening on port", 3000);
});
