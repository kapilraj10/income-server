const express = require("express");
const { createIncome,  updateIncome, deleteIncome } = require("../controllers/incomeController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth(["admin"]), createIncome);
router.put("/:id", auth(["admin"]), updateIncome);
router.delete("/:id", auth(["admin"]), deleteIncome);

module.exports = router;
