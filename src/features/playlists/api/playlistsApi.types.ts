import {
    createPlaylistSchema,
    playlistAttributesSchema,
    playlistDataSchema,
    playlistMetaSchema,
    playlistsResponseSchema
} from "@/features/playlists/model";
import * as z from "zod";

export type PlaylistMeta = z.infer<typeof playlistMetaSchema>
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>
export type PlaylistData = z.infer<typeof playlistDataSchema>
export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>


// Arguments
export type FetchPlaylistsArgs = {
    pageNumber?: number
    pageSize?: number
    search?: string
    sortBy?: 'addedAt' | 'likesCount'
    sortDirection?: 'asc' | 'desc'
    tagsIds?: string[]
    userId?: string
    trackId?: string
}

export type CreatePlaylistAttributes = z.infer<typeof createPlaylistSchema>

export type CreatePlaylistRequest = {
    data: {
        type: 'playlists';
        attributes: CreatePlaylistAttributes;
    }
}

export type UpdatePlaylistAttributes = {
    title: string
    description: string
    tagIds: string[]
}

export type UpdatePlaylistData = {
    data: {
        type: "playlists",
        attributes: UpdatePlaylistAttributes
    }
}

// WebSocket Events
export type PlaylistCreatedEvent = {
    type: 'tracks.playlist-created'
    payload: {
        data: PlaylistData
    }
}

export type PlaylistUpdatedEvent = {
    type: 'tracks.playlist-updated'
    payload: {
        data: PlaylistData
    }
}