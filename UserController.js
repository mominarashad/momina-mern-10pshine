const User = require('../Models/User');
const logger = require('../Utils/logger');
const fs = require('fs');
const bcrypt = require('bcrypt');
const path = require('path');

const get_user = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      logger.warn("No user info found");
      return res.status(404).json({
        message: "No user info found",
        success: false
      });
    }

    const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

    // Add BASE_URL to profile picture before sending
    const formattedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture
        ? `${BASE_URL}/${user.profilePicture.replace(/\\/g, "/")}`
        : ""
    };

    logger.info("User info fetched successfully!");
    res.status(200).json({
      message: "User info fetched successfully!",
      success: true,
      content: formattedUser
    });

  } catch (err) {
    logger.error(`Error fetching info ${err}`);
    res.status(500).json({
      message: `Error fetching info ${err}`,
      success: false
    });
  }
};


const update_user = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, email, currentPassword, newPassword, confirmPassword } = req.body;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "User not found", success: false });

    // Profile picture update
    if (req.file) {
      if (user.profilePicture) {
        const oldPicPath = path.join(__dirname, '../uploads', path.basename(user.profilePicture));
        if (fs.existsSync(oldPicPath)) fs.unlinkSync(oldPicPath);
      }
      user.profilePicture = `uploads/profile_pics/${req.file.filename}`;
    }

    // Basic info update
    if (name) user.name = name;
    if (email) user.email = email;

    // Password update
    if (newPassword || confirmPassword) {
      if (!currentPassword)
        return res.status(400).json({ message: "Current password required", success: false });

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match)
        return res.status(400).json({ message: "Current password is incorrect", success: false });

      if (newPassword !== confirmPassword)
        return res.status(400).json({ message: "Passwords do not match", success: false });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    const BASE_URL = process.env.BASE_URL || "http://localhost:8080";

    res.status(200).json({
      success: true,
      message: "User profile updated successfully!",
      content: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
          ? `${BASE_URL}/${user.profilePicture.replace(/\\/g, "/")}`
          : ""
      }
    });

  } catch (err) {
    logger.error(`Error updating user info: ${err}`);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = { get_user, update_user };
