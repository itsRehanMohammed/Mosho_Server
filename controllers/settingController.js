import Settings from ".././models/settings"; // Import your Settings

const settingsController = {
  // API endpoint to add a pincode to the pincodes array
  async addPincode(req, res) {
    try {
      const { pincode } = req.body;

      // Validate the incoming pincode value
      if (typeof pincode !== "number") {
        return res.status(400).json({
          success: false,
          message: "Invalid pincode value.",
        });
      }

      // Find the existing settings document or create a new one if it doesn't exist
      let settings = await Settings.findOne();

      if (!settings) {
        settings = new Settings({});
      }

      // Check if the pincode already exists in the pincodes array
      if (settings.pincodes.includes(pincode)) {
        return res.status(400).json({
          success: false,
          message: "Pincode already exists.",
        });
      }

      // Add the pincode to the pincodes array
      settings.pincodes.push(pincode);

      // Save the updated settings document
      await settings.save();

      // Return a success response
      res.status(200).json({
        success: true,
        message: "Pincode added successfully!",
        pincode,
      });
    } catch (error) {
      console.error("Error adding pincode:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
  async updateRestaurantStatus(req, res) {
    try {
      const { restaurantAvailable } = req.body;

      // Validate the incoming restaurantAvailable value
      if (typeof restaurantAvailable !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "Invalid restaurantAvailable value.",
        });
      }

      // Fetch the settings document from the database
      let settings = await Settings.findOne();

      if (!settings) {
        // If no settings are found, create a new document
        const newSettings = new Settings({ restaurantAvailable });
        await newSettings.save();

        return res.status(200).json({
          success: true,
          message: "Restaurant status created successfully!",
          restaurantAvailable: newSettings.restaurantAvailable,
        });
      }

      // Update only the restaurantAvailable field
      settings.restaurantAvailable = restaurantAvailable;

      // Save the updated settings document
      settings = await settings.save();

      // Return a success response with the updated restaurantAvailable status
      res.status(200).json({
        success: true,
        message: "Restaurant status updated successfully!",
        restaurantAvailable: settings.restaurantAvailable,
      });
    } catch (error) {
      console.error("Error updating restaurant status:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },

  // API endpoint to retrieve the settings
  async getSettings(req, res) {
    try {
      // Fetch the admin settings from the database
      const settings = await Settings.findOne();

      if (!settings) {
        // If no settings are found, return a default value
        return res.status(200).json({
          restaurantAvailable: false,
          Pincodes: [],
        });
      }

      // Return the settings
      res.status(200).json(settings);
    } catch (error) {
      console.error("Error fetching settings:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
  async deletePincode(req, res) {
    try {
      const { index } = req.body;

      // Convert the index to a number
      const indexToDelete = parseInt(index);

      // Fetch the settings document from the database
      const settings = await Settings.findOne();

      if (!settings || !settings.pincodes) {
        return res.status(404).json({
          success: false,
          message: "Settings not found or pincodes array is empty.",
        });
      }

      // Check if the index is valid
      if (
        isNaN(indexToDelete) ||
        indexToDelete < 0 ||
        indexToDelete >= settings.pincodes.length
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid index.",
        });
      }

      // Remove the pincode from the pincodes array by index
      const deletedPincode = settings.pincodes.splice(indexToDelete, 1)[0];

      // Save the updated settings document
      await settings.save();

      // Return a success response
      res.status(200).json({
        success: true,
        message: "Pincode deleted successfully!",
        pincode: deletedPincode,
      });
    } catch (error) {
      console.error("Error deleting pincode:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error." });
    }
  },
};

export default settingsController;
