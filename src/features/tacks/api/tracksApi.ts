import {baseApi} from "@/app/api/baseApi";
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
                    params: {cursor: pageParam, pageSize: 5, paginationType: 'cursor'},
                }
            },
            ...withZodCatch(fetchTracksResponseSchema)
        }),
    }),
})
export const {useFetchTracksInfiniteQuery} = tracksApi