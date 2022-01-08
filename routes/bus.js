const express = require("express")
const router = express.Router()
const { getAllBusRoutes, getBusId } = require("../controllers/bus")

router.get("/getbuses", getAllBusRoutes)
router.get("/getbusids", getBusId)
module.exports = router