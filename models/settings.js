const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  pincodes: {
    type: [Number], // Array of numbers
    default: [], // Default to an empty array
  },
  restaurantAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Settings", settingsSchema);
