const Loan = require("../models/Loan");

// Create Loan
exports.createLoan = async (req, res) => {
  try {
    const { name, amount, duration, interestRate } = req.body;

    // Monthly interest (simple monthly calculation)
    const monthlyInterest = (amount * interestRate) / 100;
    const totalInterest = monthlyInterest * duration;
    const totalPayable = amount + totalInterest;

    const paidAmount = parseFloat(req.body.paidAmount || 0);
    const remainingAmount = totalPayable - paidAmount;

    const loan = new Loan({
      name,
      amount,
      duration,
      interestRate,
      monthlyInterest,
      totalInterest,
      totalPayable,
      paidAmount,
      remainingAmount,
      monthlyPayable: totalPayable / duration,
      createdBy: req.user.id,
    });

    await loan.save();
    res.json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update Loan
exports.updateLoan = async (req, res) => {
  try {
    const { amount, duration, interestRate, paidAmount } = req.body;

    const monthlyInterest = (amount * interestRate) / 100;
    const totalInterest = monthlyInterest * duration;
    const totalPayable = amount + totalInterest;

    const paid = parseFloat(paidAmount) || 0;
    const remainingAmount = totalPayable - paid;

    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        monthlyInterest,
        totalInterest,
        totalPayable,
        paidAmount: paid,
        remainingAmount,
        monthlyPayable: totalPayable / duration,
      },
      { new: true }
    );

    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Loan
exports.deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
