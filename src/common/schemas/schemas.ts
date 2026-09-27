import {currentUserReactionSchema} from "@/common/enums";
import * as z from "zod";

export const tagSchema = z.object({
    id: z.string(),
    name: z.string(),
})

export const userSchema = z.object({
    id: z.string(),
    name: z.string()
})

export const coverSchema = z.object({
    type: z.enum(['original', 'medium', 'thumbnail']),
    width: z.number().int().positive(),
    height: z.number().int().positive(),
    fileSize: z.number().int().positive(),
    url: z.url(),
})

export const imagesSchema = z.object({
    main: z.array(coverSchema)
})

export const reactionOutputSchema = z.object({
    objectId: z.string(),
    value: currentUserReactionSchema,
    likes: z.number().int().min(0),
    dislikes: z.number().int().min(0),
})

