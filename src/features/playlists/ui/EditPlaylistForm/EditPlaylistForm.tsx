import {useUpdatePlaylistMutation} from "@/features/playlists/api/playlistsApi";
import type {
    UpdatePlaylistAttributes, UpdatePlaylistData,
} from "@/features/playlists/api/playlistsApi.types";
import type {SubmitHandler, UseFormHandleSubmit, UseFormRegister} from "react-hook-form";

type Props = {
    playlistId: string,
    setPlaylistId: (playlistId: null) => void,
    editPlaylist: (playlist: null) => void,
    register: UseFormRegister<UpdatePlaylistAttributes>,
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistAttributes>
}

export const EditPlaylistForm = ({playlistId, setPlaylistId, editPlaylist, register, handleSubmit}: Props) => {
    const [updatePlaylist] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistAttributes> = (formData) => {
        if (!playlistId) return

        const payload: UpdatePlaylistData = {
            data: {
                type: "playlists",
                attributes: {
                    ...formData
                }
            }
        }
        updatePlaylist({playlistId, body: payload})
        setPlaylistId(null)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('description')}
                       placeholder={'description'}/>
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    );
};

