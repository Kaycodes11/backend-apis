import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import db from "./database";
import AllRoutes from "./routes";
import { config } from "dotenv";
import createHttpError from "http-errors";

const app: Application = express();

config();

const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(200).json({ message: "Homepage" });
});

app.use("/throw", (req: Request, res: Response, next: NextFunction) => {
  // as the http error status used with next method; so it will go to the next error middleware
  next(new createHttpError.NotFound());
});

// app.use("/api/todo", TodoRoute);

app.use(AllRoutes);

// whenever any argument given to next(); that's assumed to be error, that's how next(...) comes to errorHandler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send({ status: err.status, message: err.message });
};

app.use(errorHandler);

function init() {
  try {
    db()
      .then(() => console.log("database has successfully connected"))
      .catch((error) => console.error(error));
    const server: Server = app.listen(PORT, (): void => {
      console.log(`server started on the ${PORT}`);
    });
  } catch (e: any) {
    console.log(e.message);
  }
}

init();
