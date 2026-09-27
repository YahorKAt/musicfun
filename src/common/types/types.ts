import * as z from "zod";
import {imagesSchema, reactionOutputSchema} from "@/common/schemas";

export type Images = z.infer<typeof imagesSchema>
export type ReactionOutput = z.infer<typeof reactionOutputSchema>
