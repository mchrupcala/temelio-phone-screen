const express = require("express");
const {
  createNonprofit,
  getNonprofits,
  getNonprofitByEmail,
} = require("../controllers/nonprofitsController.js");

const router = express.Router();

router.get("/", getNonprofits);
router.get("/:email", getNonprofitByEmail);
router.post("/", createNonprofit);

module.exports = router;
