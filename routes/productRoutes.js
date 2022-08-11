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

const { getSingleProductReviews } = require("../controllers/reviewController");
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
router.route("/:id/reviews").get(getSingleProductReviews);
module.exports = router;
