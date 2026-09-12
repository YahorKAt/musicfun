import type {PlaylistAttributes} from "@/features/playlists/api/playlistsApi.types";

type Props = {
    attributes: PlaylistAttributes
}

export const PlaylistDescription = ({attributes}: Props) => {
    return (
        <>
            <div>title: {attributes.title}</div>
            <div>userName: {attributes.user.name}</div>
        </>
    );
};
