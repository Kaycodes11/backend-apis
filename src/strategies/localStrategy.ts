import passport from 'passport';
import {Strategy} from 'passport-local';
import {User} from "../models/user.model";
import {Request} from "express";

// mainly, serialize & deserialize works with session (express-session) data, so unless using session-based no need to serialize & deserialize
// when it serializes as seen it save the data with `req.session` which utilizes express-session's store (memory or db)
passport.serializeUser((user: any, done) => {
    // now passport takes user data that assigned to req.user from local Strategy
    console.log(`serializedUser: `, user);
    // now, invoke done with user.id as 2nd argument then it'll make req.session.passport.user = userId
    done(null, user.id);
});


// when deserializing as seen it gets the data from session and do something
passport.deserializeUser(async (id, done) => {
    console.log(`deserializedUser: `, id);
    // it takes the id from when its serialized req.session.passport.user; then using that id query database;
    // then add the "query result" to req.user i.e. basically by invoking done(null, user), then it added to req.user
    try {
        const user = await User.findById(id);
        if (!user) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("User is not found");
        }
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});


// checking the given password against database i.e. passport-local strategy
// to use request set  passReqToCallback: true
export const LocalPassport = () => {
    passport.use(
        new Strategy({usernameField: "email", passReqToCallback: true}, async (req: Request, email, password, done) => {
            try {
                if (!email || !passport) throw new Error("Missing credentials");

                const userDB = await User.findOne({email});
                if (!userDB) throw new Error("User is not found");

                const isValid = await userDB.comparePass(password);

                if (isValid) {
                    // when done invoked it'll take query result & add to req.user then it'll serialize
                    done(null, userDB);
                    console.log("LOCAL:REQUEST: ", req.user, req.session);
                } else {
                    done(null, null);
                }
            } catch (error) {
                console.log(`localError: `, error);
                done(error, null);
            }
        })
    );
};
