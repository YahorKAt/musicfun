import {baseApi} from "@/app/api/baseApi";
import type {FetchTracksResponse} from "@/features/tacks/api/tracksApi.types";

export const tracksApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: lastPage => lastPage.meta.nextCursor || null,
            },
            query: ({pageParam}) => {
                return {
                    url: 'playlists/tracks',
                    params: {cursor: pageParam, pageSize: 5, paginationType: 'cursor'},
                }
            },
        }),
    }),
})
export const {useFetchTracksInfiniteQuery} = tracksApi