import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {IUser, User} from "../models/user.model";
import {HydratedDocument} from "mongoose";

const register = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({email: req.body.email});
    if (user) return res.status(409).json({message: "duplicate signup"});

    // if needed to match data with model's interface then const = user: HydratedDocument<IUser> = User.create({})
    const newUser: HydratedDocument<IUser> = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        surName: req.body.surName,
        email: req.body.email,
        password: req.body.password
    });
    res.status(201).json({message: "registration successful"});
};

const loginWithJustSession = (req: Request, res: Response) => {
    const {username, password} = req.body;
    if (username && password) {
        // @ts-ignore
        if (req.session.user) {
            // @ts-ignore
            res.status(200).json(req.session.user);
        } else {
            // @ts-ignore
            req.session.user = {username};
            res.json(req.session).status(201);
        }
    } else res.send(401);
};

// basically when user login, take data & save it to a custom property on req.session like req.session.user = user
// now this req.session will be available on every request by its maxAge, so it could be used as needed (e.g. index.js) like if req.session.user has data then do something else do something else
const loginWithPassportSessionManual = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.send(401);
    const isMatched = await user.comparePass(password);
    if (isMatched) {
        console.log("authentication successful");
        const {password, ...rest} = user;
        // @ts-ignore
        req.session.user = rest;
    } else {
        console.log("authentication failed");
        return res.send(401);
    }
};

// while as loginWithPassportSessionManual requires manual work, here it does same thing using local strategy
// by using passport local middleware; it generates a session-id & attaches to request.session
const loginWithPassportByLocal = (req: Request, res: Response) => {
    // this here just runs the local strategy
    res.status(200).json({message: "login successful"});
};

// by default when using passport local middleware it will res.cookie with a unique id, but it can be overwritten by using res.cookie() like below
const loginWithPassportAndJwt = async (req: Request, res: Response) => {
    try {
        const {email} = req.body;

        const accessToken = jwt.sign(
            {email},
            process.env.ACCESS_TOKEN_SECRET_IS as string,
            {
                expiresIn: "1h",
            }
        );
        const refreshToken = jwt.sign(
            {email},
            process.env.REFRESH_TOKEN_SECRET_IS as string,
            {expiresIn: "12h"}
        );
        // since session is like a http-only cookie thus send refreshToken as httponly cookie
        // thus modifying the cookie object on res as required before sending to the client
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            accessToken: `Bearer ${accessToken}`,
        });
    } catch (error: any) {
        return res.status(error.status || 500).json({message: error.message});
    }
};

export {
    register,
    loginWithPassportByLocal,
    loginWithJustSession,
    loginWithPassportSessionManual,
    loginWithPassportAndJwt,
};
