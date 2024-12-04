var express = require("express");
const getAllInvoice = require("../controllers/invoice/getAllInvoice");
const createInvoice = require("../controllers/invoice/createInvoice");
const getUserInvoices = require("../controllers/invoice/getInvoiceUser");
const getInvoiceById = require("../controllers/invoice/getInvoiceById");
const authenticateUser = require("../middlewares/authenticateUser");
const validationMiddleware = require("../middlewares/validation.middleware");
const commonSchema = require("../middlewares/commonValidator");

const deleteInvoice = require("../controllers/invoice/deleteInvoice");

var router = express.Router();

/*
 *@route GET /invoice/
 *@description get all invoice
 *@access private
 */
router.get("/", getAllInvoice);

/*
 *@route POST /invoice/create
 *@description create invoice
 *@access login required
 */
router.post("/create", authenticateUser, createInvoice);

/*
 *@route GET /invoice/user/:id
 *@description get invoice of user
 *@access login required
 */
router.get("/user/:id", authenticateUser, getUserInvoices);

/*
 *@route GET /invoice/:id
 *@description get invoice by id invoice
 *@access login required
 */
router.get("/:id", authenticateUser, getInvoiceById);

/*
 *@route DELETE /invoice/delete/:id
 *@description delete invoice by id
 *@access login required
 */
router.delete("/delete/:id", authenticateUser, deleteInvoice);

module.exports = router;
