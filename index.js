const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const app = express();
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");

dotenv.config();

app.use(express.json());

const allowedOrigins = ['https://travelpin-5ad2.onrender.com'];
app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connected!")
    })
    .catch((err) => console.log(err));
    
app.use("/api/users", userRoute);

app.use("/api/pins", pinRoute);


const port = 8801;

app.listen(port, () => {
    console.log("Backend server is running")
})