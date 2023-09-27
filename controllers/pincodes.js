// const Joi = require("joi");
// // import { Pincode } from ".././models/settings"; // Import your Pincode schema

// const pincodeController = {
//   // API endpoint to add a pin code
//   async addPincode(req, res) {
//     try {
//       // Define Joi schema for pin code validation
//       const pincodeSchema = Joi.number().integer().positive().required();
//       const { pincode } = req.body;

//       // Validate the incoming pin code using Joi
//       const { error } = pincodeSchema.validate(pincode);

//       if (error) {
//         // Return a validation error response
//         return res
//           .status(400)
//           .json({ success: false, message: error.details[0].message });
//       }

//       // Check if the pin code already exists in the database
//       const existingPincode = await Pincode.findOne({ pincode });

//       if (existingPincode) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Pin code already exists." });
//       }

//       // Create a new Pincode document and save it to the database
//       const newPincode = new Pincode({ pincode });
//       await newPincode.save();

//       // Return a success response
//       res.status(200).json({
//         success: true,
//         message: "Pin code added successfully!",
//         pincode,
//       });
//     } catch (error) {
//       console.error("Error adding pincode:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error." });
//     }
//   },

//   // API endpoint to retrieve the list of pin codes
//   async store(req, res) {
//     try {
//       // Fetch all pincodes from the database
//       const pincodes = await Pincode.find({}, { _id: 0, __v: 0 });

//       // Return the list of pincodes
//       res.status(200).json(pincodes);
//     } catch (error) {
//       console.error("Error fetching pincodes:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error." });
//     }
//   },

//   // API endpoint to delete a pin code by index
//   async deletePincode(req, res) {
//     try {
//       const { index } = req.params;
//       const indexToDelete = parseInt(index);

//       // Check if the index is valid
//       if (isNaN(indexToDelete) || indexToDelete < 0) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid index." });
//       }

//       // Find the pin code to delete
//       const deletedPincode = await Pincode.findOneAndDelete({
//         index: indexToDelete,
//       });

//       if (!deletedPincode) {
//         return res
//           .status(400)
//           .json({ success: false, message: "Invalid index." });
//       }

//       // Return a success response
//       res.status(200).json({
//         success: true,
//         message: "Pin code deleted successfully!",
//         pincode: deletedPincode,
//       });
//     } catch (error) {
//       console.error("Error deleting pincode:", error);
//       res
//         .status(500)
//         .json({ success: false, message: "Internal server error." });
//     }
//   },
// };

// export default pincodeController;
