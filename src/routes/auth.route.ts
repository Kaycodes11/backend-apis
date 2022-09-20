import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import passport from "passport";
import { verifyToken } from "../middleware/token.middleware";

const router = Router();

router.post("/register", AuthController.register);

// router.post("/login/session", AuthController.loginWithJustSession);
// router.post("/login/passport-session", AuthController.loginWithPassportSessionManual);
router.post(
  "/login/passport-with-the-local",
  passport.authenticate("local"),
  AuthController.loginWithPassportByLocal
);
router.post("/login/token-passport", passport.authenticate('local'), AuthController.loginWithPassportAndJwt);

router.get("/protected", verifyToken, (req, res) => {
  console.log("email: ", req.user);
  return res.status(200).json({ message: "protected" });
});

router.get("/protected-v2", passport.authenticate("jwt"), (req, res) => {
  return res.status(200).json({data: req.user});
});

export default router;
