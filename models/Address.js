import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    locality: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    landmark: {
      type: String,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Address", AddressSchema);
