const express = require("express")
const router = express.Router()

const { getUserById, getUser, updateUser, userTicketList } = require("../controllers/user")
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth")

router.param("userId", getUserById)


router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser)
router.get("/tickets/user/:userId", isSignedIn, isAuthenticated, userTicketList)

module.exports = router;