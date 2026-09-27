import {formatDateRelative} from "@/common/utils";
import type {PlaylistAttributes} from "@/features/playlists/api/playlistsApi.types";
import s from './PlaylistDescription.module.css'

type Props = {
    attributes: PlaylistAttributes
}

export const PlaylistDescription = ({attributes}: Props) => {
    return (
        <div className={s.content}>
            <h3 className={s.title}>{attributes.title}</h3>
            <p className={s.author}>
                Made for <span>{attributes.user.name}</span>
            </p>
            <p className={s.meta}>
                {attributes.tracksCount} Tracks • Created {formatDateRelative(attributes.addedAt)}
            </p>
        </div>
    );
};
