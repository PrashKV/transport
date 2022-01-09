const express = require("express")
const router = express.Router()
const { getAllBusRoutes, getBusById, createBus } = require("../controllers/bus")
const {isAdmin,isAuthenticated,isSignedIn } = require("../controllers/auth")
const{getUserById} = require("../controllers/user")


//parameters
router.param("userId", getUserById)
router.param("busId", getBusById)

//create
router.post("/bus/create/:userId",isSignedIn,isAuthenticated,isAdmin,createBus)

//read
router.get("/get")
router.get("/bus/getbuses/:userId", isSignedIn ,isAuthenticated ,isAdmin,getAllBusRoutes)
// router.get("/getbusids", getBusId)
module.exports = router