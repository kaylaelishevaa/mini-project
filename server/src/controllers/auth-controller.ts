import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import crypto from "node:crypto";
import fs from "fs/promises";
import Handlebars from "handlebars";
import { z } from "zod";
import { Role } from "@prisma/client";
import { registrationSchema } from "../schemas/auth-schema";
import { CustomRequest } from "../types/express";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function Register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, username, email, password, role } = registrationSchema.parse(
      req.body
    );

    if (!name || !username || !email || !password || !role) {
      res.status(400).json({ message: "missing required fields" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email, username: username },
    });

    if (existingUser) {
      res.status(400).json({ message: "udah ada akunnya" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role: role as Role,
      },
    });

    const confirmToken = crypto.randomBytes(20).toString("hex");
    const confirmationLink = `http://localhost:8000/api/v1/auth/confirm-email?token=${confirmToken}`;

    await prisma.confirmToken.create({
      data: {
        expiredDate: new Date(Date.now() + 1000 * 60 * 5),
        token: confirmToken,
        userId: newUser.id,
      },
    });

    const templateSource = await fs.readFile(
      "src/templates/email-confirmation-template.hbs"
    );
    const compiledTemplate = Handlebars.compile(templateSource.toString());
    const htmlTemplate = compiledTemplate({
      name: name,
      confirmationLink: confirmationLink,
    });
    const { error } = await resend.emails.send({
      from: "JustBlog <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to our Blog",
      html: htmlTemplate,
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    res.status(201).json({ ok: true, message: "new user added" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors });
      return;
    }
    next(error);
  }
}

export async function confirmEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.query.token;

    if (!token) {
      res.status(400).json({ message: "missing required fields" });
      return;
    }

    const tokenRecord = await prisma.confirmToken.findFirst({
      where: { token: token.toString() },
    });

    if (
      !tokenRecord ||
      tokenRecord.used ||
      tokenRecord.expiredDate < new Date()
    ) {
      res.status(400).json({ message: "invalid token or expired token" });
      return;
    }

    await prisma.confirmToken.update({
      where: { id: tokenRecord.id },
      data: { used: true },
    });

    await prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { emailConfirmed: true },
    });

    res.status(200).send(`<h1>email confirmed</h1>`);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      res.status(400).json({ message: "Missing required fields!" });
      return;
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!existingUser) {
      res.status(400).json({ message: "user not found" });
      return;
    }

    if (!existingUser.emailConfirmed) {
      res.status(400).json({ message: "please complete your registration" });
    }

    const isValidPassword = await compare(password, existingUser.password);

    if (!isValidPassword) {
      res.status(401).json({ message: "invalid credentials" });
    }

    const JwtPayload = { email: existingUser.email, role: existingUser.role };
    const token = jwt.sign(JwtPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .status(200)
      .json({ ok: true, message: "login success" });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.user = null;
    res
      .clearCookie("token")
      .status(200)
      .json({ ok: true, message: "logout account" });
  } catch (error) {
    next(error);
  }
}
