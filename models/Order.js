const mongoose = require("mongoose");
const { Schema } = mongoose;

const SingleOrderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new Schema(
  {
    tax: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    orderItems: [SingleOrderSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "paid", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: {
      type: String,
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
