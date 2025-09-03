import jwt from "jsonwebtoken";

// function to generate token for user
export const genToken = (userId) => {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "7d" });
};
