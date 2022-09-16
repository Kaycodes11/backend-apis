import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import { config } from "dotenv";
import createHttpError from "http-errors";

const app: Application = express();

config();

const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(200).json({ message: "Homepage" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.send({ status: err.status || 500, message: err.message });
};

app.use(errorHandler);

try {
  const server: Server = app.listen(PORT, (): void => {
    console.log(`server started on the ${PORT}`);
  });
} catch (e: any) {
  console.log(e.message);
}
