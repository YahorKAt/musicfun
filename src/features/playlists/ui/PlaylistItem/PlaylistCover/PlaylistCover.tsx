import type {Images} from "@/common/types";
import {errorToast} from "@/common/utils";
import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from "@/features/playlists/api/playlistsApi";
import type {ChangeEvent} from "react";
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistCover.module.css'


type Props = {
    playlistId: string,
    images: Images
}
export const PlaylistCover = ({playlistId, images}: Props) => {
    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

    const originalCover = images.main.find(img => img.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const allowedTypes = ['image/gif', 'image/jpeg', 'image/png']
        const maxSize = 1024 * 1024

        const file = event.target.files?.length && event.target.files[0]

        if (!file) return
        if (!allowedTypes.includes(file.type)) {
            errorToast('Only JPEG, PNG or JPEG are allowed!')
            return
        }
        if (file.size > maxSize) {
            errorToast('Max size is less than 1024КБ')
            return
        }
        uploadPlaylistCover({playlistId, file})
    }

    const deletePlaylistCoverHandler = () => deletePlaylistCover({playlistId})

    return (
        <div className={s.coverWrapper}>
            <img src={src}  className={s.cover} alt='cover'/>
            {/*<input type="file" accept={'image/gif, image/jpeg, image/png'} onChange={uploadPlaylistCoverHandler}/>*/}
            {/*{originalCover && <button onClick={deletePlaylistCoverHandler}>X</button>}*/}
        </div>
    );
};

