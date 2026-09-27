import {Search} from "@/common/components/Search/Search";
import {TagsFilter} from "@/common/components/TagsFilter/TagsFilter";
import {useInfiniteScroll} from "@/common/hooks";
import {useFetchTracksInfiniteQuery} from "@/features/tacks/api/tracksApi";
import {LoadingTrigger} from "@/features/tacks/ui/LoadingTrigger/LoadingTrigger";
import {TrackListTable} from "@/features/tacks/ui/TrackList/TrackListTable/TrackListTable";
import {type ChangeEvent, useState} from "react";
import s from './TracksPage.module.css'

const availableHashTags = ["rock", "pop", "electronic", "jazz", "classical", "hip-hop"]
const availableArtistTags = ["Artist", "Art", "RNB"]

export const TracksPage = () => {
    const {data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage} = useFetchTracksInfiniteQuery()
    const {observerRef} = useInfiniteScroll({hasNextPage, fetchNextPage, isFetching})

    const pages = data?.pages.flatMap((page) => page.data) || []

    const [selectedHashTags, setSelectedHashTags] = useState<string[]>([])
    const [selectedArtistTags, setSelectedArtistTags] = useState<string[]>([])

    const [search, setSearch] = useState('')

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }


    return (
        <div className={s.container}>
            <h2 className={s.title}>All Tracks</h2>

            <div className={s.searchContainer}>
                <Search placeholder={"Search tracks"} onSearchChange={searchPlaylistHandler}/>
            </div>

            <div className={s.tagsContainer}>
                <TagsFilter title={'Hashtags'}
                            selectedTags={selectedHashTags}
                            availableTags={availableHashTags}
                            onTagsChange={setSelectedHashTags}/>
                <TagsFilter title={'Artist'}
                            selectedTags={selectedArtistTags}
                            availableTags={availableArtistTags}
                            onTagsChange={setSelectedArtistTags}/>
            </div>

            <TrackListTable tracks={pages}/>
            {hasNextPage && <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage}/>}
            {!hasNextPage && pages.length > 0 && <p className={s.notification}>Nothing more to load</p>}
        </div>
    )
}