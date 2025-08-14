const express = require("express");
const {
  createLoan,
  updateLoan,
  deleteLoan,
} = require("../controllers/loanController");  
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth(["admin"]), createLoan);
router.put("/:id", auth(["admin"]), updateLoan);
router.delete("/:id", auth(["admin"]), deleteLoan);

module.exports = router;
