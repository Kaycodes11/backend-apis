import {Router} from "express";
import * as AuthController from "../controllers/auth.controller";
import passport from "passport";
import {verifyToken} from "../middleware/token.middleware";

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
    return res.status(200).json({message: "protected"});
});

router.get("/protected-v2", passport.authenticate("jwt"), (req, res) => {
    return res.status(200).json({data: req.user});
});

// let refreshTokens = [];

router.post('refresh-token', (req, res) => {
// since cookie is persisted between req so get the cookie by its key here i.e. req.cookies.jwt
// if it doesn't exist (i.e. null/undefined) then res.status(403).json({m: "No user is found"})

// but if it has refreshToken, the first verify it, if its invalid then throw error else go to next step
// refreshToken is a valid token, and so find that token from User collection then remove it from db
// now, generate a new pair of token same way "/login/token-passport" api does
// before sending to client update that "User" refreshTokens property
// within database
});

export default router;
