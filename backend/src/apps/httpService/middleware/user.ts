import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const userMiddleware = (req : any, res : any, next: any)  => {
    const header: any = req.headers.authorization;
    const token = header?.split(" ")[1];

    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    };

    try {
        const decodedVToken = jwt.verify(token, JWT_PASSWORD) as { userId: string, role: string};

        // appending userId to request object
        req.userId = decodedVToken.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
};