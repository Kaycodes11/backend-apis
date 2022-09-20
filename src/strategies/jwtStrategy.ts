import {Request} from "express";
import passport from 'passport';
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt';
import {User} from "../models/user.model";

// just extracts "bearer token" from header then verify that with the given secret here
export const JwtStrategy = () => {
    passport.use(
        new Strategy(
            {
                secretOrKey: process.env.ACCESS_TOKEN_SECRET_IS,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true
            },
            async (req: Request, payload: any, done: VerifiedCallback) => {
                console.log('async function of jwt-strategy', payload);
                try {
                    console.log("BEFORE: ", req.user, req.session);
                    const user = await User.findOne({email: payload.email});
                    if (!user) throw new Error("User is not found");
                    // whatever user's query value will be available on req.user now
                    console.log("USER:VALUE: ", user);
                    done(null, user); // again here it does  req.user = user & then it'll be serialized
                    console.log("AFTER: ", req.user, req.session);
                } catch (error) {
                    console.log(`JWT-ERROR: `, error);
                    done(error, false);
                }
            }
        )
    )
};

