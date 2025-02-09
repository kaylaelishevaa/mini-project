import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function redeemPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, ticketPrice } = req.body;

    const userPoints = await prisma.point.findMany({
      where: { userId, expiresAt: { gte: new Date() } },
    });

    const totalPoints = userPoints.reduce(
      (sum, point) => sum + point.pointsEarned,
      0
    );

    if (totalPoints === 0) {
      res.status(400).json({ message: "No points available for redemption." });
      return;
    }

    let newTicketPrice = ticketPrice;

    if (totalPoints >= ticketPrice) {
      newTicketPrice = 0;
    } else {
      newTicketPrice = ticketPrice - totalPoints;
    }

    for (const point of userPoints) {
      if (newTicketPrice === 0) break;
      if (point.pointsEarned >= newTicketPrice) {
        await prisma.point.update({
          where: { id: point.id },
          data: { pointsEarned: point.pointsEarned - newTicketPrice },
        });
        newTicketPrice = 0;
      } else {
        await prisma.point.delete({ where: { id: point.id } });
        newTicketPrice -= point.pointsEarned;
      }
    }

    res.status(200).json({
      message: "Points redeemed successfully!",
      finalPrice: newTicketPrice,
    });
  } catch (error) {
    next(error);
  }
}

export async function checkoutTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, ticketPrice } = req.body;

    const points = await prisma.point.findMany({
      where: { userId, expiresAt: { gte: new Date() } },
    });

    const coupons = await prisma.coupon.findFirst({
      where: { userId, expiresAt: { gte: new Date() } },
    });

    let totalDiscount = 0;

    if (!coupons) {
      console.log("No valid coupons available.");
    }
    
    const totalPoints = points.reduce(
      (sum, point) => sum + point.pointsEarned,
      0
    );
    if (totalPoints > 0) {
      totalDiscount += Math.min(totalPoints, ticketPrice);
    }

    if (coupons) {
      totalDiscount += (ticketPrice * coupons.discount) / 100;
    }

    const finalPrice = Math.max(0, ticketPrice - totalDiscount);

    res.status(200).json({
      originalPrice: ticketPrice,
      discount: totalDiscount,
      finalPrice: finalPrice,
    });
  } catch (error) {
    next(error);
  }
}
