const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const cookieParser= require("cookie-parser");
const {notFound, errorHandler } =require('./middleware/errorMiddleware')
dotenv.config();
//Routers

const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri, {
  useNewurlParser: true,
});

mongoose.connection
  .once("open", () => {
    console.log("db connected");
  })
  .on("error", (err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send("Ecommerce server");
});
app.use('/products', require('./routes/product'))
app.use('/auth', require('./routes/user'))
app.use('/orders', require('./routes/order'))
app.get('/config/paypal', (req, res) =>{
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
});
app.use(notFound)
app.use(errorHandler)
const server = app.listen(port, () => {
  console.log(`Server is Runnig at port:${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ocuured : ${err}`);
  server.close(() => process.exit(1));
});
