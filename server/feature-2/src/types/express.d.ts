import { JwtPayload } from "jsonwebtoken";

interface CustomJWTPayload extends JwtPayload {
    name: string, 
    email: string, 
    role: string 
}

declare global {
    namespace Express {
        interface Request {
            user?: CustomJWTPayload | null; 
        }
    }
}