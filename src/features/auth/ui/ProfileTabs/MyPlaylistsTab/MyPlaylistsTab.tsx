import {Button} from "@/common/components";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import {setIsOpenModalAC} from "@/features/playlists/model/playlist-slice";
import {PlaylistList} from "@/features/playlists/ui/PlaylistList/PlaylistList";
import s from './MyPlaylistsTab.module.css'

type Props = {
    playlists: PlaylistData[];
    isPlaylistLoading: boolean;
}
export const MyPlaylistsTab = ({playlists, isPlaylistLoading}: Props) => {

    const dispatch = useAppDispatch()

    const handleCreatePlaylist = () => {
        dispatch(setIsOpenModalAC({isOpen: true}))
    }

    return (
        <div className={s.list}>
            <div className={s.button}>
                <Button onClick={handleCreatePlaylist}>Create a playlist</Button>
            </div>
            <PlaylistList playlists={playlists} isPlaylistLoading={isPlaylistLoading}/>
        </div>
    );
};
