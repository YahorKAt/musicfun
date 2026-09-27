import {baseApi} from "@/app/api/baseApi";
import type {ReactionOutput} from "@/common/types";
import {withZodCatch} from "@/common/utils";
import type {FetchTracksResponse} from "@/features/tacks/api/tracksApi.types";
import {fetchTracksResponseSchema} from "@/features/tacks/model";

export const tracksApi = baseApi.injectEndpoints({
        endpoints: build => ({
            fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
                infiniteQueryOptions: {
                    initialPageParam: null,
                    getNextPageParam: lastPage => lastPage.meta.nextCursor || null,
                },
                query: ({pageParam}) => {
                    return {
                        url: '/playlists/tracks',
                        params: {cursor: pageParam, pageSize: 10, paginationType: 'cursor'},
                    }
                },
                ...withZodCatch(fetchTracksResponseSchema)
            }),
            likeTrack: build.mutation<ReactionOutput, { trackId: string }>({
                query: ({trackId}) => ({url: `/playlists/tracks/${trackId}/likes`, method: 'POST'}),
                invalidatesTags: ['Tracks']
            }),
            dislikeTrack: build.mutation<ReactionOutput, { trackId: string }>({
                query: ({trackId}) => ({url: `/playlists/tracks/${trackId}/dislikes`, method: 'POST'}),
                invalidatesTags: ['Tracks']
            }),
            removeReactionTrack: build.mutation<ReactionOutput, { trackId: string }>({
                query: ({trackId}) => ({url: `/playlists/tracks/${trackId}/reactions`, method: 'DELETE'}),
                invalidatesTags: ['Tracks']
            }),
        }),
    }
)
export const {
    useFetchTracksInfiniteQuery,
    useDislikeTrackMutation,
    useLikeTrackMutation,
    useRemoveReactionTrackMutation
} = tracksApi