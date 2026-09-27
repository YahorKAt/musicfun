import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import s from './MyTracksTab.module.css'

type Props = {
    playlists: PlaylistData[];
    isPlaylistLoading: boolean;
}

export const MyTracksTab = ({playlists, isPlaylistLoading}: Props) => {
    return (
        <div className={s.list}></div>
    );
};
