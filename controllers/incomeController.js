const Income = require("../models/Income");

exports.createIncome = async (req, res) => {
  const entry = new Income({ ...req.body, createdBy: req.user.id });
  await entry.save();
  res.json(entry);
};



exports.updateIncome = async (req, res) => {
  const updated = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteIncome = async (req, res) => {
  await Income.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
