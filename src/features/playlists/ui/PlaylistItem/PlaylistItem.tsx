import {
    useDeletePlaylistMutation,
    useDislikePlaylistMutation,
    useLikePlaylistMutation, useRemoveReactionPlaylistMutation,
} from "@/features/playlists/api/playlistsApi";
import type {PlaylistData} from "@/features/playlists/api/playlistsApi.types";
import {PlaylistDescription, PlaylistCover} from "@/features/playlists/ui/PlaylistItem/index";
import {ReactionButton} from "@/common/components";
import s from './PlaylistItem.module.css'

type Props = {
    playlist: PlaylistData,
    editPlaylist: (playlist: PlaylistData | null) => void,
}

export const PlaylistItem = ({playlist, editPlaylist}: Props) => {
    const [deletePlaylist] = useDeletePlaylistMutation()
    const deletePlaylistHandler = (playlistId: string) => {
        deletePlaylist(playlistId)
    }

    const [likePlaylist] = useLikePlaylistMutation()
    const [dislikePlaylist] = useDislikePlaylistMutation()
    const [removeReaction] = useRemoveReactionPlaylistMutation()

    const handleLike = async () => {
        if (playlist.attributes.currentUserReaction === 1) {
            // Логика удаления лайка для трека
            await removeReaction({playlistId: playlist.id})
        } else {
            await likePlaylist({playlistId: playlist.id}).unwrap()
        }
    }

    const handleDislike = async () => {
        if (playlist.attributes.currentUserReaction === -1) {
            // Логика удаления дизлайка
            await removeReaction({playlistId: playlist.id})
        } else {
            await dislikePlaylist({playlistId: playlist.id}).unwrap()
        }
    }

    return (
        <div className={s.item}>
            <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images}/>
            <PlaylistDescription attributes={playlist.attributes}/>
            <ReactionButton currentUserReaction={playlist.attributes.currentUserReaction}
                            onLike={handleLike}
                            onDislike={handleDislike}
            />
            <span className={s.duration}>{playlist.attributes.duration}</span>
            {/*<button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>*/}
            {/*<button onClick={() => editPlaylist(playlist)}>update</button>*/}
        </div>
    );
};

