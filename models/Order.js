import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
  {
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    order_name: {
      type: String,
      required: true,
    },
    delivery_status: {
      type: String,
      default: "preparing",
    },
    order_qty: {
      type: String,
      required: true,
    },
    order_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrdersSchema, "orders");
