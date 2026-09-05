import {baseApi} from "@/app/api/baseApi";
import type {
    CreatePlaylistRequest,
    PlaylistData,
    PlaylistsResponse, UpdatePlaylistRequest
} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => 'playlists',
            providesTags: ['PlayList'],
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistRequest>({
            query: (body) => ({url: 'playlists', method: 'POST', body}),
            invalidatesTags: ['PlayList'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({url: `playlists/${playlistId}`, method: 'DELETE'}),
            invalidatesTags: ['PlayList'],
        }),
        updatePlaylist: build.mutation<void, UpdatePlaylistRequest >({
            query: ({playlistId, body}) => ({url: `playlists/${playlistId}`, method: 'PUT', body}),
            invalidatesTags: ['PlayList'],
        })
    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation
} = playlistsApi