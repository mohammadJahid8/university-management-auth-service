import express, { Application, Response } from "express";
import cors from "cors";
const app: Application = express();
const port = 3000;

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res: Response) => {
  res.send("Welcome to the university server!");
});

export default app;
