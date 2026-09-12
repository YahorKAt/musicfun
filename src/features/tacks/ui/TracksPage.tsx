import {useInfiniteScroll} from "@/common/hooks";
import {useFetchTracksInfiniteQuery} from "@/features/tacks/api/tracksApi";
import {LoadingTrigger} from "@/features/tacks/ui/LoadingTrigger/LoadingTrigger";
import {TrackList} from "@/features/tacks/ui/TrackList/TrackList";

export const TracksPage = () => {
    const {data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage} = useFetchTracksInfiniteQuery()
    const {observerRef} = useInfiniteScroll({hasNextPage, fetchNextPage, isFetching})

    const pages = data?.pages.flatMap((page) => page.data) || []

    return (
        <div>
            <h1>Tracks page</h1>
            <TrackList tracks={pages}/>
            {hasNextPage && <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>}
            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
        </div>
    )
}