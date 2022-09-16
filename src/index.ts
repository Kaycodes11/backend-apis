import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: "Homepage" });
});

try {
  app.listen(PORT, (): void => {
    console.log(`server started on the ${PORT}`);
  });
} catch (e) {}
