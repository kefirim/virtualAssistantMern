import User from "../models/user.model.js";
import genToken from "../config/token.js";
import bcrypt from "bcryptjs";

/**
 * Filtre les données sensibles de l'utilisateur (exclut le mot de passe).
 */
const getSafeUser = (user) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt
  };
};

/**
 * Inscription d'un nouvel utilisateur
 */
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      sameSite: "Lax",
      secure: false, // true en production avec HTTPS
    });

    return res.status(201).json(getSafeUser(user));
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: `Signup error: ${error.message}` });
  }
};

/**
 * Connexion d'un utilisateur
 */
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password!" });
    }

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
      sameSite: "Lax",
      secure: false, // true en production avec HTTPS
    });
console.log("Cookie token set:", token);
    return res.status(200).json(getSafeUser(user));
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

/**
 * Déconnexion d'un utilisateur
 */
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false // true en production
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};
