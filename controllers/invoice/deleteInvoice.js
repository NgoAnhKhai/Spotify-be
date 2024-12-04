const { AppError, sendResponse } = require("../../helpers/utils");
const Invoice = require("../../models/invoice");

const deleteInvoice = async (req, res, next) => {
  const { id } = req.params;

  try {
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      throw new AppError("Invoice not found", 404);
    }

    if (invoice.subscriptionType === "Free") {
      throw new AppError("Cannot delete free invoice", 400);
    }

    if (invoice.subscriptionType === "Premium") {
      sendResponse(
        res,
        200,
        true,
        null,
        null,
        "Premium invoice deleted successfully. You will continue to have access until the end of your current premium period."
      );
    }
  } catch (error) {
    next(error);
  }
};

module.exports = deleteInvoice;
