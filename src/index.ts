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
// import moment from "moment";

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
  res.send({ status: err.status || 500, message: err.message });
};

app.use(errorHandler);

// console.log(moment(Date.now()).utcOffset('+0530').format("YYYY-MM-DD HH:mm:ss")); // here '+0530' is indian utc offset
//
// console.log(moment(Math.floor(new Date().valueOf())).utcOffset('+0530').format("YYYY-MM-DD HH:mm A Z")); // working
//
// console.log("unix", moment('2022-12-12T15:21:02.224Z').utcOffset("+0530").unix() ); // unix timestamp
//
// console.log("db", moment('2022-12-12T15:21:02.224Z').utcOffset("+0530").format("YYYY-MM-DD HH:mm:ss A Z") );
//
// const offset = moment(Math.floor(new Date().valueOf())).add("-11.00", "days"); // this is 2days before at the same time
// console.log(moment(offset, 'h:mm:ss A zz')); // working

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
