import {
    useDeletePlaylistMutation,
} from "@/features/playlists/api/playlistsApi";
import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import {PlaylistCover} from "@/features/playlists/ui/PlaylistItem/PlaylistCover/PlaylistCover";
import {PlaylistDescription} from "@/features/playlists/ui/PlaylistItem/PlaylistDescription/PlaylistDescription";

type Props = {
    playlist: PlaylistData,
    editPlaylist: (playlist: PlaylistData | null) => void,
}

export const PlaylistItem = ({playlist, editPlaylist}: Props) => {
    const [deletePlaylist] = useDeletePlaylistMutation()
    const deletePlaylistHandler = (playlistId: string) => {
        deletePlaylist(playlistId)
    }


    return (
        <div>
            <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images}/>
            <PlaylistDescription attributes={playlist.attributes}/>
            <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
            <button onClick={() => editPlaylist(playlist)}>update</button>
        </div>
    );
};

