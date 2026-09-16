import {useCreatePlaylistMutation} from "@/features/playlists/api/playlistsApi";
import type {CreatePlaylistAttributes, CreatePlaylistRequest} from "@/features/playlists/api/playlistsApi.types";
import {type SubmitHandler, useForm} from "react-hook-form";


export const CreatePlaylistForm = () => {
    const {register, handleSubmit, reset} = useForm<CreatePlaylistAttributes>()
    const [createPlaylist] = useCreatePlaylistMutation()

    const onSubmit: SubmitHandler<CreatePlaylistAttributes> = formData => {
        const payload: CreatePlaylistRequest = {
            data: {
                type: "playlists",
                attributes: {
                    title: formData.title,
                    description: formData.description,
                }
            }
        };
        createPlaylist(payload).unwrap().then(() => reset());
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('description')} placeholder={'description'}/>
            </div>
            <button>Create playlist</button>
        </form>
    )
}