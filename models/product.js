import mongoose from "mongoose";
import { PROD_URL } from "../config";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    image: {
      type: String,
      required: true,
      get: (image) => {
        // http://localhost:5000/uploads/1616443169266-52350494.png

        return `${PROD_URL}/${image}`;
      },
    },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    coupon_code: { type: String, default: "MOSHO20" },
    isNewproduct: { type: Boolean, default: false },
    isPopularproduct: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Product", productSchema, "products");
