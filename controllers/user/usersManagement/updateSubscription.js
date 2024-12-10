const Invoice = require("../../../models/invoice");
const User = require("../../../models/user");
const { sendResponse, AppError } = require("../../../helpers/utils");

const updateSubscription = async (req, res, next) => {
  const { subscriptionType, premiumExpiryDate } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }

    if (
      user.subscriptionType === "Premium" &&
      user.premiumExpiryDate > Date.now()
    ) {
      const currentRemainingDays = Math.ceil(
        (user.premiumExpiryDate - Date.now()) / (1000 * 3600 * 24)
      );

      throw new AppError(
        400,
        `You already have a Premium subscription. ${currentRemainingDays} days remaining.`,
        "BadRequest"
      );
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

      const newPremiumExpiryDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      );
      user.premiumExpiryDate = newPremiumExpiryDate;

      user.remainingDays = Math.ceil(
        (newPremiumExpiryDate - Date.now()) / (1000 * 3600 * 24)
      );
    }

    await user.save();

    const remainingDays = Math.ceil(
      (user.premiumExpiryDate - Date.now()) / (1000 * 3600 * 24)
    );

    sendResponse(
      res,
      200,
      true,
      {
        user: {
          ...user.toObject(),
          remainingDays,
        },
      },
      null,
      "Subscription updated successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
