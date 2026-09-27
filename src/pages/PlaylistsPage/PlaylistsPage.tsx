import {Pagination} from "@/common/components";
import {Search} from "@/common/components/Search/Search";
import {Sort} from "@/common/components/Sort/Sort";
import {TagsFilter} from "@/common/components/TagsFilter/TagsFilter";
import {useDebounceValue} from "@/common/hooks";
import {
    useFetchPlaylistsQuery,
} from "@/features/playlists/api/playlistsApi";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import {type ChangeEvent, useState} from "react";
import s from './PlaylistsPage.module.css'

const availableHashTags = ["rock", "pop", "electronic", "jazz", "classical", "hip-hop"]

export const PlaylistsPage = () => {
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest")

    const [selectedHashTags, setSelectedHashTags] = useState<string[]>([])

    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(8)
    const debounceSearch = useDebounceValue(search)

    const {data, isLoading} = useFetchPlaylistsQuery({
        search: debounceSearch,
        pageSize,
        pageNumber: currentPage
    })

    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
        setCurrentPage(1)
    }

    const changePageSizeHandler = (size: number) => {
        setCurrentPage(1)
        setPageSize(size)
    }

    if (isLoading) {
        return <h1>Skeleton loader...</h1>;
    }


    return (
        <div className={s.container}>
            <h2 className={s.title}>All Playlists</h2>

            <div className={s.searchSortContainer}>
                <Search placeholder={'Search playlist'} onSearchChange={searchPlaylistHandler}/>
                <Sort onSortChange={setSortBy} sortBy={sortBy}/>
            </div>

            <div className={s.tagsContainer}>
                <TagsFilter title={'Hashtags'}
                            selectedTags={selectedHashTags}
                            availableTags={availableHashTags}
                            onTagsChange={setSelectedHashTags}/>
            </div>

            <PlaylistList playlists={data?.data || []} isPlaylistLoading={isLoading}/>
            <Pagination pagesCount={data?.meta.pagesCount || 1}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
                        changePageSize={changePageSizeHandler}
            />
        </div>
    )
}