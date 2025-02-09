import { Request, Response, NextFunction } from "express";
import { PrismaClient, Role } from "@prisma/client";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken"
import { Resend } from "resend";
import rateLimit from "express-rate-limit";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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
      res.status(400).json({ message: "User not found! " });
      return;
    }

    if (!existingUser.emailConfirmed) {
      res.status(400).json({ message: "Please complete your registration! " });
      return;
    }

    const isValidPassword = await compare(password, existingUser.password);

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid credentials!" });
      return;
    }

    const jwtPayload = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: false,
      })
      .status(200)
      .json({ ok: true, message: "Login succeded!" });
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
      .json({ message: "Logout succesfully!" });
  } catch (error) {
    next(error);
  }
}

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: "Too many login attempts. Please try again later.",
});
