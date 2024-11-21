import { Router } from "express";
import { UpdateMetaDataSchema } from "../../types";
import client from "../../../../db/index";
import { userMiddleware } from "../../middleware/user";

const userRouter = Router();


userRouter.put("/metadata", userMiddleware , async (req: any, res: any) => {
    const parsedData = UpdateMetaDataSchema.safeParse(req.body);
    console.log(parsedData)
    if (!parsedData.success){
        res.status(400).json({message : "Validation failed"});
        return
    };

    const avatar = await client.avatar.findUnique({
        where : {
            id : parsedData.data.avatarId
        }
    });

    if (!avatar) {
        res.status(404).json({message : "Avatar not found"});
        return;
    };

    await client.user.update({
        where : {
            id : req.userId
        },
        data : {
            avatarId : parsedData.data.avatarId
        }
    });

    res.json({message : "Metadata updated"});
});

userRouter.get("/metadata/bulk", async (req: any, res : any)=> {
    const usersList = req.query.ids.replace("[", "").replace("]", "").replace(" ", "").split(",");

    const metadata = await client.user.findMany({
        where : {
            id : {
                in : usersList
            }
        }, select : {
            id : true,
            avatar : true
        }
    });

    res.json({
        avatars : metadata.map(item => ({
            userId : item.id,
            imageUrl : item.avatar?.imageUrl
        }))
    })

});







export default userRouter;