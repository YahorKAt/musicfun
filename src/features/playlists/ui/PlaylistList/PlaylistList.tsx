import type {
    PlaylistData,
    UpdatePlaylistAttributes
} from "@/features/playlists/api/playlistsApi.types";
import {EditPlaylistForm} from "@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm";
import {PlaylistItem} from "@/features/playlists/ui/PlaylistItem/PlaylistItem";
import {useState} from "react";
import {useForm} from "react-hook-form";
import s from './PlaylistList.module.css'

type Props = {
    playlists: PlaylistData[];
    isPlaylistLoading: boolean;
}

export const PlaylistList = ({playlists, isPlaylistLoading}: Props) => {
    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistAttributes>()

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description ?? '',
                tagIds: playlist.attributes.tags.map(tag => tag.id),
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.items}>
            {!playlists?.length && !isPlaylistLoading && <h2>Playlists not found</h2>}
            {playlists?.map(playlist => {
                const isEditing = playlistId === playlist.id
                return (
                    <div className={s.item} key={playlist.id}>
                        {isEditing
                            ? <EditPlaylistForm playlistId={playlistId}
                                                setPlaylistId={setPlaylistId}
                                                editPlaylist={editPlaylistHandler}
                                                register={register}
                                                handleSubmit={handleSubmit}
                            />
                            : <PlaylistItem playlist={playlist} editPlaylist={editPlaylistHandler}/>
                        }
                    </div>
                )
            })}
        </div>
    );
};

