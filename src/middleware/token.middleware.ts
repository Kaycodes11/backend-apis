import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// either use this "verifyToken" or passport.authenticate('jwt') on the protected route as 1st middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const token = req.headers["authorization"].split(" ")[1] ?? null;
  if (!token) return res.status(400).json({ message: "User is not found" });
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(403).json({ message: "invalid token" });

    // @ts-ignore
    req.user = decoded.email;
    // go to next middleware
    next();
  });
};

export { verifyToken };
