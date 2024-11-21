import { Router } from "express";
import { CreateElementSchema, UpdateElementSchema, CreateAvatarSchema, CreateMapSchema } from "../../types";
import client from "../../../../db/index";
import { adminMiddleware } from "../../middleware/admin";

const adminRouter = Router();

adminRouter.post("/element", adminMiddleware, async (req: any, res: any) => {
    const parsedData = CreateElementSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    const element = await client.element.create({
        data : {
            imageUrl : parsedData.data.imageUrl,
            width : parsedData.data.width,
            height : parsedData.data.height,
            static : parsedData.data.static
        }
    });

    res.json({elementId : element.id});


});

adminRouter.put("/element/:elementId", adminMiddleware, async (req: any, res: any) => {
    const parsedData = UpdateElementSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };
    
    const element = await client.element.findUnique({
        where : {
            id : req.params.elementId
        }
    });

    if (!element) {
        res.status(404).json({message : "Element not found"});
        return
    };

    await client.element.update({
        data : {
            imageUrl : parsedData.data.imageUrl,
        }, where : {
            id : req.params.elementId
        }
    });

    res.json({message : "Element updated"});
});

adminRouter.post("/avatar", adminMiddleware, async (req: any, res: any) => {
    const parseData = CreateAvatarSchema.safeParse(req.body);

    if (!parseData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    const avatar = await client.avatar.create({
        data : {
            imageUrl : parseData.data.imageUrl,
            name : parseData.data.name
        }
    });

    res.json({avatarId : avatar.id});
});

adminRouter.post("/map", adminMiddleware, async (req: any, res: any) => {
    const parsedData = CreateMapSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    const map = await client.map.create({
        data : {
            name : parsedData.data.name,
            width : parseInt(parsedData.data.dimensions.split("x")[0]),
            height : parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail : parsedData.data.thumbnail
        }
    });

    await client.mapElements.createMany({
        data : parsedData.data.defaultElements.map(item => ({
            mapId : map.id,
            elementId : item.elementId,
            x : item.x,
            y : item.y
        }))
    });
    res.json({mapId : map.id});

    
});

export default adminRouter;