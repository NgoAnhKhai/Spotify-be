const { sendResponse, AppError } = require("../../helpers/utils");
const Invoice = require("../../models/invoice");
const User = require("../../models/user");

const createInvoice = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("user", user);

    if (user.subscriptionType === "Premium") {
      return res.status(400).json({
        success: false,
        message: "User already has Premium subscription",
      });
    }

    const newInvoice = new Invoice({
      userID: user._id,
      amount: 15,
      subscriptionType: "Premium",
      paymentStatus: "Paid",
    });

    await newInvoice.save();

    user.subscriptionType = "Premium";
    user.paymentStatus = "Paid";
    await user.save();

    sendResponse(
      res,
      200,
      true,
      { invoice: newInvoice },
      null,
      "Invoice created and user subscription upgraded to Premium!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = createInvoice;
