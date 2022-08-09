const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermisions,
} = require("../middleware/authentication");
const {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  uploadImage,
} = require("../controllers/productController");

router
  .route("/")
  .post([authenticateUser, authorizePermisions("admin")], createProduct)
  .get(getAllProduct);

router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermisions("admin")], uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermisions("admin")], updateProduct)
  .delete(deleteProduct);

module.exports = router;
