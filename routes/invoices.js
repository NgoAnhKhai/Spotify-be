var express = require("express");
const getAllInvoice = require("../controllers/invoice/getAllInvoice");
const createInvoice = require("../controllers/invoice/createInvoice");
const getUserInvoices = require("../controllers/invoice/getInvoiceUser");
const getInvoiceById = require("../controllers/invoice/getInvoiceById");
const authenticateUser = require("../middlewares/authenticateUser");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");

var router = express.Router();

//Gett All Invoice (Admin Feature)
router.get("/", getAllInvoice);

//Create Invoice
router.post(
  "/create",
  validationMiddleware(commonSchema, "bodys"),
  authenticateUser,
  createInvoice
);

//Get Invoice User
router.get(
  "/user/:id",
  validationMiddleware(commonSchema, "params"),
  authenticateUser,
  getUserInvoices
);

//GetInvoiceId
router.get(
  "/:id",
  validationMiddleware(commonSchema, "params"),
  getInvoiceById
);

module.exports = router;
