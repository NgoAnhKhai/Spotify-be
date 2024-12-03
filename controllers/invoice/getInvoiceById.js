const Invoice = require("../../models/Invoice");
const { sendResponse, AppError } = require("../../helpers/utils");

const getInvoiceById = async (req, res, next) => {
  try {
    const filter = req.params.id;

    // Lấy hóa đơn theo ID và populate thông tin của userID
    const invoice = await Invoice.findById(filter).populate("userID");

    if (!invoice) {
      throw new AppError(404, "Invoice not found", "NotFound");
    }
    console.log(invoice);

    // Trả về thông tin hóa đơn
    sendResponse(
      res,
      200,
      true,
      { invoice },
      null,
      "Invoice fetched successfully!"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = getInvoiceById;
