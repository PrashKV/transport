const express = require("express")
const router = express.Router()
const { getAllBusRoutes, getBusById, createBus,updateBusRoute,deleteBus } = require("../controllers/bus")
const {isAdmin,isAuthenticated,isSignedIn } = require("../controllers/auth")
const{getUserById} = require("../controllers/user")


//parameters
router.param("userId", getUserById)
router.param("busId", getBusById)

//create
router.post("/bus/create/:userId",isSignedIn,isAuthenticated,isAdmin,createBus)

//read
router.get("/bus/getbuses", getAllBusRoutes)

//update
router.put("/bus/update/:busId/:userId",isSignedIn, isAuthenticated, isAdmin, updateBusRoute)

//delete
router.delete("/bus/:busId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteBus)



module.exports = router