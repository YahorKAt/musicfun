import {Pagination} from "@/common/components";
import {CurrentUserReaction} from "@/common/enums";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import {useMemo, useState} from "react";
import s from './MyLikedPlaylistsTab.module.css'

export const MyLikedPlaylistsTab = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = 8

    // Загружаем ВСЕ плейлисты сразу (большой pageSize)
    const { data: playlists, isLoading } = useFetchPlaylistsQuery({
        pageSize: 40, // Берём максимум
    })

    // Фильтруем лайкнутые один раз (мемоизируем)
    const likedPlaylists = useMemo(() => {
        return (playlists?.data || []).filter(
            (playlist) => playlist.attributes.currentUserReaction === CurrentUserReaction.Like
        )
    }, [playlists?.data])

    // Клиентская пагинация
    const paginatedPlaylists = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return likedPlaylists.slice(start, start + pageSize)
    }, [likedPlaylists, currentPage, pageSize])

    const pagesCount = Math.ceil(likedPlaylists.length / pageSize)

    if (isLoading) {
        return <h1>Skeleton loader...</h1>
    }

    if (likedPlaylists.length === 0) {
        return <h2 className={s.empty}>You haven't liked any playlists yet</h2>
    }


    return (
        <div className={s.list}>
            <PlaylistList playlists={paginatedPlaylists} isPlaylistLoading={isLoading}/>
            <Pagination pagesCount={pagesCount || 1}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageSize={pageSize}
            />
        </div>
    );
};
