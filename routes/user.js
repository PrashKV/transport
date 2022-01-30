const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
    getUserById,
    getUser,
    updateUser,
    userTicketList,
} = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);


//get
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//update
router.put(
    "/user/:userId",
    isSignedIn,
    isAuthenticated,
    [
        check("name")
            .isLength({ min: 3 })
            .withMessage("Name should be at least 3 characters"),
        check("email").isEmail().withMessage("Email pattern is incorrect"),
    ],
    updateUser
);

//get user tickets
router.get(
    "/tickets/user/:userId",
    isSignedIn,
    isAuthenticated,
    userTicketList
);

module.exports = router;
