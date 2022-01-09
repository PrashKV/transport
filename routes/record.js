const express = require("express");
const router = express.Router();
const { addRecord, getRecordbyID } = require("../controllers/record");



router.post("/addrecord", addRecord);
router.get("/getrecord", getRecordbyID);

module.exports = router;
