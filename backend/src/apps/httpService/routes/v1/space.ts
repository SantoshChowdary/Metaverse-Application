import { Router } from "express";
import { AddSpaceElementSchema, CreateSpaceSchema, DeleteSPaceElementSchema } from "../../types";
import client from "../../../../db/index";
import { userMiddleware } from "../../middleware/user";



const spaceRouter = Router();

spaceRouter.post("/", userMiddleware, async (req : any, res: any) => {
    const parsedData = CreateSpaceSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };
    console.log(parsedData.data.dimensions.split("x"));
    if (!parsedData.data.mapId) {
       const space = await client.space.create({
           data : {
               name : parsedData.data.name,
               width : parseInt(parsedData.data.dimensions.split("x")[0]),
               height : parseInt(parsedData.data.dimensions.split("x")[1]),
            //    creatorId : req.userId,
               creator : {
                    connect : {
                        id : req.userId
                    }
               }
           }
       });

       res.json({spaceId : space.id});
       return;
    };

    const map = await client.map.findUnique({
        where : {
            id : parsedData.data.mapId
        }, select : {
            mapElements : true,
            width : true,
            height : true
        }
    });

    if (!map) {
        res.status(400).json({message : "Map not found"});
        return;
    };

    let space = await client.$transaction( async () => {
        const space = await client.space.create({ 
            data : {
                name : parsedData.data.name,
                width : map.width,
                height : map.height,
                creatorId : req.userId
            }
        });

        await client.spaceElements.createMany({
            data : map.mapElements.map(el => ({
                spaceId : space.id,
                elementId : el.elementId,
                x : el.x!,
                y : el.y!
            }))
        });

        return space;
    });

    res.json({spaceId : space.id});
    return;

    
});

spaceRouter.delete("/:spaceId", userMiddleware , async (req: any, res: any) => {
    const space = await client.space.findUnique({
        where : {
            id : req.params.spaceId
        }, select : {
            creatorId : true
        }
    });

    if (!space) {
        res.status(400).json({message : "Space not found"});
        return;
    };

    if (space.creatorId !== req.userId) {
        res.status(403).json({message : "Unauthorized"});
        return;
    };

    await client.space.delete({
        where : {
            id : req.params.spaceId
        }
    });

    res.json({message : "Space deleted"});

});

spaceRouter.get("/all", userMiddleware, async (req: any, res: any) => {
    const spaces = await client.space.findMany({
        where : {
            creatorId : req.userId
        }
    });

    res.json({
        spaces : spaces.map(space => ({
            id : space.id,
            name : space.name,
            dimensions : `${space.width}x${space.height}`,
            thumbnail : space.thumbnail
        }))
    })
});

spaceRouter.get("/:spaceId", userMiddleware, userMiddleware, async (req: any, res: any) => {
    const space = await client.space.findUnique({
        where : {
            id : req.params.spaceId
        }
    });

    console.log(space)

    const spaceEl = await client.spaceElements.findMany({
        where : {
            spaceId : req.params.spaceId
        }, select : {
            id : true,
            element : true,
            x : true,
            y : true
        }
    });
    console.log(spaceEl)
    if (!space) {
        res.status(400).json({message : "Space not found"});
        return;
    };

    res.json({
        dimensions : `${space.width}x${space.height}`,
        elements : spaceEl
    })


});

spaceRouter.post("/element", userMiddleware, async (req: any, res: any) => {

    const parsedData = AddSpaceElementSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    const space = await client.space.findUnique({
        where : {
            id : parsedData.data.spaceId
        }
    });

    if (!space) {
        res.status(400).json({message : "Space not found"});
        return;
    };

    if (space.creatorId !== req.userId) {
        res.status(403).json({message : "Unauthorized"});
        return;
    };

    const element = await client.element.findUnique({
        where : {
            id : parsedData.data.elementId
        }
    });

    if (!element) {
        res.status(400).json({message : "Element not found"});
        return;
    };

    await client.spaceElements.create({
        data : {
            spaceId : parsedData.data.spaceId,
            elementId : parsedData.data.elementId,
            x : parsedData.data.x,
            y : parsedData.data.y
        }
    });

    res.json({message : "Element added"});


});

spaceRouter.delete("/element", userMiddleware, async (req: any, res: any) => {
    const parsedDate = DeleteSPaceElementSchema.safeParse(req.body);

    if (!parsedDate.success) {
        res.status(400).json({message : "Validation failed"});
        return
    };

    const spaceEl = await client.spaceElements.findUnique({
        where : {
            id : parsedDate.data.id
        }
    });

    const space = await client.space.findUnique({
        where : {
            id : spaceEl!.spaceId
        }
    });

    if (!spaceEl) {
        res.status(400).json({message : "Space element not found"});
        return;
    };

    if (space!.creatorId !== req.userId) {
        res.status(403).json({message : "Unauthorized"});
        return;
    };

    await client.spaceElements.delete({
        where : {
            id : parsedDate.data.id
        }
    });

    res.json({message : "Element deleted"});

});




export default spaceRouter;