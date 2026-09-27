import {z} from "zod";

export const CurrentUserReaction = {
    Like: 1,
    Dislike: -1,
    None: 0,
} as const

export const currentUserReactionSchema = z.enum(CurrentUserReaction)
export type CurrentUserReaction = z.infer<typeof currentUserReactionSchema>
