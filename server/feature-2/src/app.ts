import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import errorMiddleware from "./middleware/error-middleware";
import notFoundMiddleware from "./middleware/not-found-middleware";
import registerRouter from "./routes/register-router";
import logRouter from "./routes/log-router";
import refcodeRouter from "./routes/refcode-router";

const app = express();
const PORT = 8000;
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3001" }));

app.get("/api/v1", (req, res) => {
    res.status(200).send("<h1>Welcome!</h1>");
  });

app.use("/api/v1/auth/register", registerRouter);
app.use("/api/v1/auth", logRouter);
app.use("/api/v1", refcodeRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on: ${PORT}`);
});
