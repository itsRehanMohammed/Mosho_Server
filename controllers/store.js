const Joi = require("joi");

// Sample existing pin codes array
let restaurant = true;

const storeController = {
  // API endpoint to add a pin code
  door(req, res) {
    // Define Joi schema for store validation
    const storeSchema = Joi.boolean().required();
    const { restaurantAvailable } = req.body;

    // Validate the incoming boolean using Joi
    const { error } = storeSchema.validate(restaurantAvailable);

    if (error) {
      // Return a validation error response
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    restaurant = restaurantAvailable;

    // Return a success response
    res.status(200).json({ success: true, message: "Restaurant Closed Successfully!", restaurantAvailable });
  },

  // API endpoint to retrieve the list of pin codes
  store: (req, res) => {
    res.status(200).json({ restaurantAvailable: restaurant });
  },
};

export default storeController;
