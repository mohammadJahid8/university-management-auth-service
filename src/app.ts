import express, { Application, Response } from "express";
const app: Application = express();
const port = 3000;

app.get("/", (req, res: Response) => {
  res.send("Hello World!");
});

export default app;
