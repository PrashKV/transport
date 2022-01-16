const express = require("express");
const router = express.Router();
const { addRecord, getRecordbyID , getAllRecords} = require("../controllers/record");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById)

//create record
router.post(
    "/record/addrecord/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    addRecord
);

//listing records
router.get(
    "/record/getrecord/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getRecordbyID
);

router.get("/record/all/:userId",isSignedIn,
isAuthenticated,
isAdmin,getAllRecords)

module.exports = router;
