const express = require("express");
const router = express.Router();
const {
    getAllBusRoutes,
    getBusById,
    createBus,
    updateBusRoute,
    deleteBus,
    getAllBusProfiles,
    getBus,
} = require("../controllers/bus");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { check } = require("express-validator");

//parameters
router.param("userId", getUserById);
router.param("busId", getBusById);

//create
router.post(
    "/bus/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createBus
);

//read
router.get("/bus/getbuses", getAllBusRoutes);
router.get("/bus/getbusprofiles", getAllBusProfiles);
router.get("/bus/:busId", getBus);

//update
router.put(
    "/bus/update/:busId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateBusRoute
);

//delete
router.delete(
    "/bus/:busId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteBus
);

module.exports = router;
