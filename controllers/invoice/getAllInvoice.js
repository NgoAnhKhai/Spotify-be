const { sendResponse } = require("../../helpers/utils");
const Invoice = require("../../models/Invoice");

const getAllInvoice = async (req, res, next) => {
  const invoice = await Invoice.find();
  if (!invoice || invoice.length === 0) {
    return sendResponse(res, 404, false, null, null, "No found");
  }
  sendResponse(
    res,
    200,
    true,
    { invoices: invoice },
    null,
    "Invoices retrieved successfully"
  );
};
module.exports = getAllInvoice;
