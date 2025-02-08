import "dotenv/config";
import cookieParser from "cookie-parser";

import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs/promises";

import { upload } from "./middlewares/upload-middleware";
import cloudinary from "./configs/cloudinary";
import eventRouter from "./routers/event-router";
import NotFoundMiddleware from "./middlewares/not-found-middleware";
import ErrorMiddleware from "./middlewares/error-middleware";
import authRouter from "./routers/auth-router";
import categoryRouter from "./routers/category-router";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/auth", authRouter);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

/* ------------------------------- PLAYGROUND ------------------------------- */
// Upload file
app.post(
  "/api/v1/uploads",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "Missing image!" });
        return;
      }

      const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog/images",
      });

      fs.unlink(req.file.path);

      res.status(201).json({
        ok: true,
        data: { body: req.body, file: req.file, cloudinary: cloudinaryData },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "General error. Good luck!" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
