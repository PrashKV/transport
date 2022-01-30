const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { checkSeats, updateRecord, createTicket, getAllTickets } = require("../controllers/ticket");
const { getUserById } = require("../controllers/user");
const router = express.Router();

router.param("UserId",getUserById)

router.post("/ticket/create/:UserId",isSignedIn,isAuthenticated, checkSeats, updateRecord, createTicket)


router.get("/tickets/:UserId",isSignedIn,isAuthenticated, isAdmin, getAllTickets)
module.exports = router;