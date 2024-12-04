const User = require("../../models/user");
const { sendResponse, AppError } = require("../../helpers/utils");
const Invoice = require("../../models/invoice");

const updateSubscription = async (req, res, next) => {
  const { subscriptionType } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }
    if (
      user.subscriptionType === "Premium" &&
      user.subscriptionExpireDate > Date.now()
    ) {
      throw new AppError(400, "You already have a Premium subscription.");
    }

    if (subscriptionType === "Premium") {
      const newInvoice = new Invoice({
        userID: user._id,
        amount: 15,
        subscriptionType: "Premium",
        paymentStatus: "Paid",
      });
      await newInvoice.save();

      user.subscriptionType = "Premium";

      user.subscriptionExpireDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
    } else if (subscriptionType === "Free") {
      user.subscriptionExpireDate = null;
      user.subscriptionType = "Free";
    }

    await user.save();

    sendResponse(
      res,
      200,
      true,
      { subscription: user.subscriptionType },
      null,
      "Subscription updated and invoice created!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
