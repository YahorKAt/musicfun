import {FilterTags} from "@/common/components/FilterTags/FilterTags";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import s from "@/pages/PlaylistsPage/PlaylistsPage.module.css";
import {useFetchTracksInfiniteQuery} from "@/features/tacks/api/tracksApi";
import {TrackListCards} from "@/features/tacks/ui/TrackList/TrackListCards/TrackListCards";

export const HomePage = () => {
    const {data: playlists, isLoading} = useFetchPlaylistsQuery({
        pageSize: 10,
        pageNumber: 1
    })
    const {data: tracks} = useFetchTracksInfiniteQuery()

    const pages = tracks?.pages.flatMap((page) => page.data) || []

    if (isLoading) {
        return <h1>Skeleton loader...</h1>;
    }
    // const tags = playlists?.data.map((playlist) => {playlist.attributes.tags.forEach((tag) => {tag.name})})
    const tags = ["#Playlists", "#Artists", "#Albums", "#Podcasts & shows"]
    const handleFilterChange = (activeTags: string[]) => {
        console.log("Active filters:", activeTags)
        // Здесь фильтрация контента
    }


    return (
        <div className={s.container}>
            <FilterTags tags={tags} onFilterChange={handleFilterChange}/>
            <div className={s.group}>
                <h2 className={s.title}>New Playlists</h2>
                <PlaylistList playlists={playlists?.data || []} isPlaylistLoading={isLoading}/>
            </div>
            <div className={s.group}>
                <h2 className={s.title}>New Tracks</h2>
                <TrackListCards tracks={pages}/>
            </div>
        </div>
    )
}