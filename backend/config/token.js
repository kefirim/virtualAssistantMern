import jwt from "jsonwebtoken";

/**
 * Génère un token JWT signé avec l'ID utilisateur.
 * @param {string} userId - ID de l'utilisateur à inclure dans le token.
 * @returns {string} - Le token JWT signé.
 */
const genToken = (userId) => {
  try {
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "10d" }
    );
    return token;
  } catch (error) {
    console.error("Erreur lors de la génération du token JWT:", error);
    return null;
  }
};

export default genToken;

