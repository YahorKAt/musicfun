import {Pagination} from "@/common/components";
import {useDebounceValue} from "@/common/hooks";
import {
    useFetchPlaylistsQuery,
} from "@/features/playlists/api/playlistsApi";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import {type ChangeEvent, useState} from "react";
import s from './PlaylistsPage.module.css'

export const PlaylistsPage = () => {
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
            <h1>Playlists page</h1>
            <input type='search' placeholder='Search playlist by title' onChange={e => searchPlaylistHandler(e)}/>
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