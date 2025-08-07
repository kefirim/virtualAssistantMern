
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    console.log("Received userId:", req.userId);
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser error:", error);
    return res.status(400).json({ message: "get current user error" });
  }
};
