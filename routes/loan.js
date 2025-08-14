const express = require("express");
const {
  createLoan,
  updateLoan,
  deleteLoan,
  getLoans,
  getLoanById
} = require("../controllers/loanController");  
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth(["admin", "user"]), getLoans);
router.get("/:id", auth(["admin", "user"]), getLoanById);
router.post("/", auth(["admin"]), createLoan);
router.put("/:id", auth(["admin"]), updateLoan);
router.delete("/:id", auth(["admin"]), deleteLoan);

module.exports = router;
