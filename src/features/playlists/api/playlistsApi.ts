import {baseApi} from "@/app/api/baseApi";
import {SOCKET_EVENTS} from "@/common/constants";
import {imagesSchema} from "@/common/schemas";
import {subscribeToEvent} from "@/common/socket";
import type {Images, ReactionOutput} from "@/common/types";
import {withZodCatch} from "@/common/utils";
import type {
    CreatePlaylistRequest, FetchPlaylistsArgs, PlaylistCreatedEvent,
    PlaylistData,
    PlaylistsResponse, PlaylistUpdatedEvent, UpdatePlaylistData
} from "@/features/playlists/api/playlistsApi.types";
import {playlistCreateResponseSchema, playlistsResponseSchema} from "@/features/playlists/model";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({url: '/playlists', params}),
            onCacheEntryAdded: async (_arg, {cacheDataLoaded, updateCachedData, cacheEntryRemoved}) => {
                await cacheDataLoaded

                const unsubscribes = [
                    subscribeToEvent<PlaylistCreatedEvent>(SOCKET_EVENTS.PLAYLIST_CREATED, (msg) => {
                        const newPlaylist = msg.payload.data
                        updateCachedData((state) => {
                            state.meta.totalCount = state.meta.totalCount + 1
                            state.meta.pagesCount = Math.ceil(state.meta.totalCount / state.meta.pageSize)
                            if (state.meta.page === 1) {
                                state.data.unshift(newPlaylist)
                                if (state.data.length > state.meta.pageSize) {
                                    state.data.pop()
                                }
                            }
                        })
                    }),
                    subscribeToEvent<PlaylistUpdatedEvent>(SOCKET_EVENTS.PLAYLIST_UPDATED, (msg) => {
                        const newPlaylist = msg.payload.data
                        updateCachedData((state) => {
                            const index = state.data.findIndex(pl => pl.id === newPlaylist.id)
                            if (index !== -1) {
                                state.data[index] = {...state.data[index], ...newPlaylist}
                            }
                        })
                    })
                ]

                await cacheEntryRemoved
                unsubscribes.forEach(unsubscribe => unsubscribe())

            },
            ...withZodCatch(playlistsResponseSchema),
            providesTags: ['PlayList'],
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistRequest>({
            query: (body) => ({url: '/playlists', method: 'POST', body}),
            ...withZodCatch(playlistCreateResponseSchema),
            invalidatesTags: ['PlayList'],
        }),

        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({url: `/playlists/${playlistId}`, method: 'DELETE'}),
            invalidatesTags: ['PlayList'],
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistData }>({
            query: ({playlistId, body}) => ({url: `/playlists/${playlistId}`, method: 'PUT', body}),
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
                return ({url: `/playlists/${playlistId}/images/main`, method: 'POST', body: formData})
            },
            ...withZodCatch(imagesSchema),
            invalidatesTags: ['PlayList'],
        }),

        deletePlaylistCover: build.mutation<void, { playlistId: string }>({
            query: ({playlistId}) => ({url: `/playlists/${playlistId}/images/main`, method: 'DELETE'}),
            invalidatesTags: ['PlayList'],
        }),
        likePlaylist: build.mutation<ReactionOutput, { playlistId: string }>({
            query: ({playlistId}) => ({url: `/playlists/${playlistId}/likes`, method: 'POST'}),
            invalidatesTags: ['PlayList']
        }),
        dislikePlaylist: build.mutation<ReactionOutput, { playlistId: string }>({
            query: ({playlistId}) => ({url: `/playlists/${playlistId}/dislikes`, method: 'POST'}),
            invalidatesTags: ['PlayList']
        }),
        removeReactionPlaylist: build.mutation<ReactionOutput, { playlistId: string }>({
            query: ({playlistId}) => ({url: `/playlists/${playlistId}/reactions`, method: 'DELETE'}),
            invalidatesTags: ['PlayList']
        }),
    })
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation,
    useLikePlaylistMutation,
    useDislikePlaylistMutation,
    useRemoveReactionPlaylistMutation,
} = playlistsApi