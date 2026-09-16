import {Path} from "@/common/routing";
import {useGetMeQuery} from "@/features/auth/api/authApi";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {CreatePlaylistForm} from "@/features/playlists/ui/CreatePlaylistForm";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import {Navigate} from "react-router";
import s from './ProfilePage.module.css'

export const ProfilePage = () => {
    const {data: meResponse, isLoading: isMeLoading} = useGetMeQuery()

    const {data: playlistsResponse, isLoading} = useFetchPlaylistsQuery(
        {userId: meResponse?.userId},
        {skip: !meResponse?.userId},
    )

    if (isMeLoading || isLoading) {
        return <h1>Skeleton loader...</h1>;
    }

    if(!isMeLoading && !meResponse) {
        return <Navigate to={Path.Playlists}></Navigate>;
    }

    return (
        <div>
            <h1>{meResponse?.login}</h1>
            <div className={s.container}>
                <CreatePlaylistForm/>
                <PlaylistList playlists={playlistsResponse?.data || []} isPlaylistLoading={isLoading || isMeLoading} />
            </div>
        </div>
    )
}