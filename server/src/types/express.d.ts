import { JwtPayload } from "jsonwebtoken";

interface CostumJwtPayload extends JwtPayload {
  name: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: CostumJwtPayload | null;
    }
  }
}

interface CustomRequest extends Request {
  user?: any;
}
