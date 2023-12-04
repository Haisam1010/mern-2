import  Jwt  from "jsonwebtoken";

// Function to create a JWT token
export const createToken = (payload)=> {
  const token = Jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRE});
    return token;
}
export const verifyJWT = (token)=> {
  const decoded = Jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}