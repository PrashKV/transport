require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");


mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log("DB connected");
    })
    .catch((e) => {
        console.log("DB NOT CONNECTED", e);
    });

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


const authRoutes = require("./routes/auth");
const busRoutes = require("./routes/bus");
const recordRoutes = require("./routes/record")
const userRoutes = require("./routes/user");

//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", busRoutes)
app.use("/api", recordRoutes)
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is up and running at port ${port}`);
});
