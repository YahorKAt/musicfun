import {baseApi} from "@/app/api/baseApi";
import type {Images} from "@/common/types";
import type {
    CreatePlaylistRequest, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse, UpdatePlaylistRequest
} from "@/features/playlists/api/playlistsApi.types";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => {
                return {
                    url: 'playlists',
                    params
                }
            },
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
        updatePlaylist: build.mutation<void, UpdatePlaylistRequest>({
            query: ({playlistId, body}) => ({url: `playlists/${playlistId}`, method: 'PUT', body}),
            onQueryStarted: async ({playlistId, body}, {queryFulfilled, dispatch, getState}) => {
                const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

                const patchCollections: any[] = []

                args.forEach((arg) => {
                    patchCollections.push(dispatch(
                        playlistsApi.util.updateQueryData('fetchPlaylists', arg, (state) => {
                            const index = state.data.findIndex(pl => pl.id === playlistId)
                            if (index !== -1) {
                                state.data[index].attributes = {...state.data[index].attributes, ...body.data.attributes}
                            }
                        })
                    ))
                })

                try {
                    await queryFulfilled
                } catch (e) {
                    patchCollections.forEach((patchCollection) => patchCollection.undo())
                }

            },
            invalidatesTags: ['PlayList'],
        }),
        uploadPlaylistCover: build.mutation<Images, { playlistId: string, file: File }>({
            query: ({playlistId, file}) => {
                const formData = new FormData()
                formData.append('file', file)

                return ({url: `playlists/${playlistId}/images/main`, method: 'POST', body: formData})
            },
            invalidatesTags: ['PlayList'],
        }),
        deletePlaylistCover: build.mutation<void, { playlistId: string }>({
            query: ({playlistId}) => ({url: `playlists/${playlistId}/images/main`, method: 'DELETE'}),
            invalidatesTags: ['PlayList'],
        }),

    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation
} = playlistsApi