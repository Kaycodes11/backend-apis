import express, {
    Application,
    ErrorRequestHandler,
    NextFunction,
    Request,
    Response,
} from "express";
import {Server} from "http";
import {config} from "dotenv";
// import createHttpError from "http-errors";
import AuthRoutes from "./routes/auth.route";
import GroceryRoutes from './routes/groceries-session.route';
import database from "./database";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from "passport";
import {LocalPassport} from './strategies/localStrategy';
import {JwtStrategy} from './strategies/jwtStrategy';

const app: Application = express();
const memoryStore = new session.MemoryStore();
config();
database();

const PORT = Number(process.env.PORT);

app.use(express.json()); // to parse json from request
app.use(express.urlencoded({ extended: true })); // basically parse url-encoded data from request
app.use(cookieParser())
// session store data at server & this data only accessible through api at frontend not within the browser like normal cookie

// noinspection SpellCheckingInspection
app.use(
    session({
        secret: "AGDSGDSGDSHGDFHFDHFDHDF",
        resave: false,
        saveUninitialized: false,
        store: memoryStore,
    })
);

app.use(passport.initialize());
// app.use(passport.session());

LocalPassport();
JwtStrategy();

// app.get("/", (req: Request, res: Response, next: NextFunction): Response => {
//     return res.status(200).json({message: "Homepage"});
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//     next(new createHttpError.NotFound());
// });

app.use("/api/auth", AuthRoutes);
app.use("/groceries", GroceryRoutes); // using session for these routes

// app.use((req, res, next) => {
//     // @ts-ignore
//     if (req.session?.user) return next();
//     res.status(401);
// });

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message: err.message  || "server error"});
};

app.use(errorHandler);

try {
    const server: Server = app.listen(PORT, (): void => {
        console.log(`server started on the ${PORT}`);
    });
} catch (e: any) {
    console.log(e.message);
}
