const Joi = require("joi");

// Sample existing pin codes array
let pincodes_pin = [400088, 400021, 400089];

const pincodeController = {
  // API endpoint to add a pin code
  addPincode(req, res) {
    // Define Joi schema for pin code validation
    const pincodeSchema = Joi.number().integer().positive().required();
    const { pincode } = req.body;

    // Validate the incoming pin code using Joi
    const { error } = pincodeSchema.validate(pincode);

    if (error) {
      // Return a validation error response
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    // Check if the pin code already exists in the array
    if (pincodes_pin.includes(pincode)) {
      return res.status(400).json({ success: false, message: "Pin code already exists." });
    }

    // Add the pin code to the array
    pincodes_pin.push(pincode);

    // Return a success response
    res.status(200).json({ success: true, message: "Pin code added successfully!", pincode });
  },

  // API endpoint to retrieve the list of pin codes
  store(req, res) {
    res.status(200).json(pincodes_pin);
  },
};

export default pincodeController;
