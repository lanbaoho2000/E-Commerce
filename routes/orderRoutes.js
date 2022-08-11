const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermisions,
} = require("../middleware/authentication");
const {
  createOrder,
  getAllOrders,
  getCurrentUserOrder,
  getSingleOrder,
  updateOrder,
} = require("../controllers/orderController");

router
  .route("/")
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermisions("admin")], getAllOrders);

router.route("/showAllMyOrders").get(authenticateUser, getCurrentUserOrder);

router
  .route("/:id")
  .get(authenticateUser, getSingleOrder)
  .patch(authenticateUser, updateOrder);

module.exports = router;
