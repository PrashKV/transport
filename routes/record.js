const express = require("express")
const router = express.Router()
const{addRecord} = require('../controllers/record')


router.post("/addrecord", addRecord)

module.exports = router