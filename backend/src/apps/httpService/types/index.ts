import z from "zod";

export const SignUpSchema = z.object({
    username : z.string(),
    password : z.string().min(6),
    type : z.enum(["User", "Admin"])
});

export const SignInSchema = z.object({
    username : z.string(),
    password : z.string().min(6)
});

export const UpdateMetaDataSchema = z.object({
    avatarId : z.string()
});

export const CreateSpaceSchema = z.object({
    name : z.string(),
    dimensions : z.string(),
    mapId : z.any()
});

export const AddSpaceElementSchema = z.object({
    elementId : z.string(),
    spaceId : z.string(),
    x : z.number(),
    y : z.number()
});

export const DeleteSPaceElementSchema = z.object({
    id : z.string(),
})

export const CreateElementSchema = z.object({
    imageUrl : z.string(),
    width: z.number(),
    height: z.number(),
    static : z.boolean()
});

export const UpdateElementSchema = z.object({
    imageUrl : z.string()
});

export const CreateAvatarSchema = z.object({
    imageUrl : z.string(),
    name : z.string()
});

export const CreateMapSchema = z.object({
    thumbnail : z.string(),
    dimensions : z.string(),
    name : z.string(),
    defaultElements : z.array(z.object({
        elementId : z.string(),
        x : z.number(),
        y : z.number()
    }))
});

