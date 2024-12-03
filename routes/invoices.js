var express = require("express");
const getAllInvoice = require("../controllers/invoice/getAllInvoice");
const createInvoice = require("../controllers/invoice/createInvoice");
const getUserInvoices = require("../controllers/invoice/getInvoiceUser");
const getInvoiceById = require("../controllers/invoice/getInvoiceById");
const authenticateUser = require("../middlewares/authenticateUser");

var router = express.Router();

//Gett All Invoice (Admin Feature)
router.get("/", getAllInvoice);

//Create Invoice
router.post("/create", authenticateUser, createInvoice);

//Get Invoice User
router.get("/user/:id", authenticateUser, getUserInvoices);

//GetInvoiceId
router.get("/:id", getInvoiceById);

module.exports = router;
