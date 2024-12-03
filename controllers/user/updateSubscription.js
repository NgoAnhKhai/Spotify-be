const User = require("../../models/user");
const Invoice = require("../../models/Invoice");
const { sendResponse, AppError } = require("../../helpers/utils");

const updateSubscription = async (req, res, next) => {
  const { subscriptionType } = req.body;

  try {
    // Lấy thông tin người dùng từ token
    const user = await User.findById(req.user.userId);
    if (!user) {
      throw new AppError(404, "User not found", "NotFound");
    }

    // Cập nhật gói dịch vụ của người dùng
    user.subscriptionType = subscriptionType;
    await user.save();

    // Tạo hóa đơn dựa trên subscriptionType
    const newInvoice = new Invoice({
      userID: user._id,
      amount: subscriptionType === "Premium" ? 15 : 0,
      subscriptionType: subscriptionType,
    });
    await newInvoice.save();

    sendResponse(
      res,
      200,
      true,
      { subscription: user.subscriptionType, invoice: newInvoice },
      null,
      "Subscription updated and invoice created!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
