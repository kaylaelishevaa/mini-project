import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

import cloudinary from "../configs/cloudinary";
import { logger } from "../middlewares/error-middleware";
// import redis from "../configs/redis";
import { publishEvent } from "../crons/post-crons";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

export async function CreateEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      title,
      excerpt,
      content,
      image,
      location,
      slug,
      publishedDate,
      categoryIds,
    } = req.body;

    if (
      !title ||
      !excerpt ||
      !content ||
      !image ||
      !location ||
      !slug ||
      !req.file ||
      !categoryIds ||
      categoryIds.length <= 0 ||
      !publishedDate
    ) {
      const errorMessage = "Missing required fields!";
      logger(errorMessage);
      res.status(400).json({ message: "Missing required fields!" });
      return;
    }

    const cloudinaryData = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog/images",
    });

    fs.unlink(req.file.path);

    const newEvent = await prisma.event.create({
      data: {
        title: title,
        excerpt: excerpt,
        content: content,
        location: location,
        slug: slug,
        image: cloudinaryData.secure_url,
        publishedDate: new Date(publishedDate),
        CategoryEvent: {
          createMany: {
            data: categoryIds.map((category: number) => {
              return { categoryId: +category };
            }),
          },
        },
      },
    });

    if (publishedDate < new Date()) {
      await prisma.event.update({
        where: { id: newEvent.id },
        data: { published: true },
      });
    } else {
      publishEvent(newEvent.id, new Date(publishedDate));
    }

    res.status(201).json({ ok: true, message: "New Event added" });
  } catch (error) {
    next(error);
  }
}

export async function GetAllEvents(
  req: Request,
  res: Response,
  Next: NextFunction
) {
  try {
    const events = await prisma.event.findMany({
      include: { CategoryEvent: { include: { Category: true } } },
    });

    const response = events.map((event) => {
      return {
        id: event.id,
        title: event.title,
        excerpt: event.excerpt,
        image: event.image,
        categories: event.CategoryEvent.map(
          (category) => category.Category.name
        ),
      };
    });

    // await redis.setex("allevents", 60, JSON.stringify(response));

    res.status(200).json({ ok: true, data: response, chache: false });
  } catch (error) {
    Next(error);
  }
}

export async function getPublishedEvents(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const events = await prisma.event.findMany({
    where: { published: true },
    include: { CategoryEvent: { include: { Category: true } } },
  });
}

export async function GetSingleEvent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const event = await prisma.event.findUnique({
      where: { id: +req.params.id },
      include: { CategoryEvent: { include: { Category: true } } },
    });

    const response = {
      id: event?.id,
      title: event?.title,
      content: event?.content,
      image: event?.image,
      categories: event?.CategoryEvent.map(
        (category) => category.Category.name
      ),
      createdAt: event?.createdAt,
      updatedAt: event?.updatedAt,
    };

    res.status(200).json({ ok: true, data: response });
  } catch (error) {
    next(error);
  }
}
