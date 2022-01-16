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


const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
            subsets.map(set => [...set, value])
            ),
        [[]]
    );
      array =[1,2,3,4]
f = getAllSubsets(array)
var i, j
minimum_cost = Number.MAX_SAFE_INTEGER;

for (i = 1; i < f.length; i++) {

    
    if (f[i].length === 1) {
        console.log("-",f[i][0],"-")
    }
    else {
        console.log("-", f[i][0])
        for (j = 1; j < f[i].length; j++){
            console.log("+",f[i][j])
        }
        console.log("-")
    }
    console.log("knk", minimum_cost);

}