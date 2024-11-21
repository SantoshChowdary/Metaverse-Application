import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const adminMiddleware = (req : any, res : any, next: any)  => {
    const header: any = req.headers.authorization;
    const token = header?.split(" ")[1];
    
    if (!token) {
        res.status(403).json({ message: "Unauthorized" });
        return;
    };

    try {
        const decodedVToken = jwt.verify(token, JWT_PASSWORD) as { userId: string, role: string};
        // console.log(typeof decodedVToken)

        if (decodedVToken.role !== "Admin") {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        // appending userId to request object
        req.userId = decodedVToken.userId;
        // console.log("is next called")
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
  
};