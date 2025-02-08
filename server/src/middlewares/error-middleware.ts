import { Request, Response, NextFunction } from "express";
import fs from "node:fs/promises";

export async function logger(errorMessage: string) {
  try {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${errorMessage}\n`;
    await fs.appendFile("logs/errors.log", logMessage, "utf-8");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`error writing to log file: ${error.message}`);
    }
  }
}

export default function ErrorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  logger(error.message);

  res.status(500).json({ message: "general error" });
}
