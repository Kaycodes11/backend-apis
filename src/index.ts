import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import { config } from "dotenv";
// import createHttpError from "http-errors";
import AuthRoutes from "./routes/auth.route";
import PostRoutes from "./routes/post.route";
import CommentRoutes from "./routes/comment.route";
import ParentChildRoutes from './routes/parent-child.route'
import GroceryRoutes from "./routes/groceries-session.route";
import database from "./database";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import passport from "passport";
import multer from "multer";
import { LocalPassport } from "./strategies/localStrategy";
import { JwtStrategy } from "./strategies/jwtStrategy";

const app: Application = express();
const memoryStore = new session.MemoryStore();
config();
database();

const PORT = Number(process.env.PORT);

app.use(express.json()); // to parse json from request
app.use(express.urlencoded({ extended: true })); // basically parse url-encoded data
app.use("/images", express.static(path.join(__dirname, "/images"))); // /images/filename
app.use(cookieParser());
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // store within src/images folder; use cb(null, "src/images") or cb(null, "/images")
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body?.name || Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  res.status(200).json("file has been uploaded");
});

// app.get("/", (req: Request, res: Response, next: NextFunction): Response => {
//     return res.status(200).json({message: "Homepage"});
// });

// app.use((req: Request, res: Response, next: NextFunction) => {
//     next(new createHttpError.NotFound());
// });

app.use("/api/auth", AuthRoutes);
app.use("/api/posts", PostRoutes);
app.use("/api/comments", CommentRoutes);
app.use("/api/parent-child", ParentChildRoutes);
app.use("/groceries", GroceryRoutes); // using session for these routes

// app.use((req, res, next) => {
//     // @ts-ignore
//     if (req.session?.user) return next();
//     res.status(401);
// });

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "server error" });
};

app.use(errorHandler);

try {
  const server: Server = app.listen(PORT, (): void => {
    console.log(`server started on the ${PORT}`);
  });
} catch (e: any) {
  console.log(e.message);
}
