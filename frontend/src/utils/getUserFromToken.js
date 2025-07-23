import jwt_decode from "jwt-decode";

function getUserFromToken() {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const decoded = jwt_decode(token);
    return {
      id: decoded.user_id,
      username: decoded.username,
      is_staff: decoded.is_staff,  // ce champ doit être dans ton token JWT côté backend
      is_subscribed: decoded.is_subscribed, // si tu l’as inclus aussi
    };
  } catch (error) {
    console.error("Erreur lors du décodage du token :", error);
    return null;
  }
}

export default getUserFromToken;
