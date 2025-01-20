const express = require("express");
const {
  sendBulkEmails,
  getSentEmails,
} = require("../controllers/emailsController.js");

const router = express.Router();

router.get("/", getSentEmails);
router.post("/", sendBulkEmails);

module.exports = router;
