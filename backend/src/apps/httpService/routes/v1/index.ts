import { Router } from "express";
import userRouter from "./user";
import spaceRouter from "./space";
import adminRouter from "./admin";
import { SignInSchema, SignUpSchema } from "../../types";
import client from "../../../../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";
import { userMiddleware } from "../../middleware/user";

export const router = Router();

router.post("/signup", async (req, res) => {
    const parsedData = SignUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    try {

        const findUser = await client.user.findUnique({
            where : {
                username : parsedData.data.username
            }
        });

        if (findUser) {
            res.status(400).json({message : "User already exists"});
            return;
        } else {
            const createdUser = await client.user.create({
                data : {
                    username : parsedData.data.username,
                    password : bcrypt.hashSync(parsedData.data.password, 10),
                    // password : parsedData.data.password,
                    role : parsedData.data.type === "Admin" ? "Admin" : "User"
                }
            });
    
            res.json({
                userId : createdUser.id
            })
        }
    } catch(error) {
        res.status(400).json({message : "User already exists"});
    }
});

router.post("/signin", async (req, res) => {
    const parsedData = SignInSchema.safeParse(req.body);
    // console.log(parsedData)
    if (!parsedData.success) {
        res.status(403).json({message : "Validation failed"});
        return
    };

    try {
        const user = await client.user.findUnique({
            where : {
                username : parsedData.data.username
            }
        });

        if (!user) {
            res.status(403).json({message : "User not found"});
            return
        }

        const isValid = await bcrypt.compare(parsedData.data.password, user.password);
        
        if (!isValid) {
            res.status(401).json({message : "Invalid password"});
            return
        };

        const token = jwt.sign({
            userId : user.id,
            role : user.role
        }, JWT_PASSWORD);

        res.json({
            token : token
        })
        // console.log(res)

    } catch {
        res.status(403).json({message : "User not found"});
    }

});

router.get("/elements", userMiddleware,  async (req: any, res: any) => {
    const elements = await client.element.findMany({
        select : {
            id : true,
            imageUrl : true,
            width : true,
            height : true,
            static : true
        }
    })

    res.json(elements);

});

router.get("/avatars", userMiddleware, async (req: any, res: any) => {
    const avatars = await client.avatar.findMany({
        select : {
            id : true,
            imageUrl : true,
            name : true
        }
    });

    res.json(avatars);
});


router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);