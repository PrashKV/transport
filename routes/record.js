const express = require("express");
const router = express.Router();
const {
    addRecord,
    getAllRecordID,
    getRecordById,
    getARecord,
} = require("../controllers/record");
const { check } = require("express-validator");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("recordId",getRecordById)
//create record
router.post(
    "/record/addrecord/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    [check("date").isDate().withMessage("Date pattern incorrect")],
    addRecord
);

//listing records
router.get(
    "/records/:recordId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getARecord
);

router.get(
    "/records/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllRecordID
);


module.exports = router;
