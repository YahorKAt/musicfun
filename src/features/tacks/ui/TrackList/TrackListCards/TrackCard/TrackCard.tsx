import {ReactionButton} from "@/common/components";
import {
    useDislikeTrackMutation,
    useLikeTrackMutation,
    useRemoveReactionTrackMutation
} from "@/features/tacks/api/tracksApi";
import type {TrackData} from "@/features/tacks/api/tracksApi.types";
import {TrackCover} from "@/features/tacks/ui/TrackItem/TrackCover/TrackCover";
import s from "./TrackCard.module.css"

type TrackItemProps = {
    track: TrackData
}

export const TrackCard = ({track}: TrackItemProps) => {
    const [likeTrack] = useLikeTrackMutation()
    const [dislikeTrack] = useDislikeTrackMutation()
    const [removeReaction] = useRemoveReactionTrackMutation()

    const handleLike = async () => {
        if (track.attributes.currentUserReaction === 1) {
            // Логика удаления лайка
            await removeReaction({trackId: track.id})
        } else {
            await likeTrack({trackId: track.id}).unwrap()
        }
    }

    const handleDislike = async () => {
        if (track.attributes.currentUserReaction === -1) {
            // Логика удаления дизлайка
            await removeReaction({trackId: track.id})
        } else {
            await dislikeTrack({trackId: track.id}).unwrap()
        }
    }

    return (
        <div className={s.card}>
            <TrackCover images={track.attributes.images}/>
            <div className={s.info}>
                <h3 className={s.title}>{track.attributes.title}</h3>
                <p className={s.artist}>{"artist name"}</p>
            </div>
            <ReactionButton currentUserReaction={track.attributes.currentUserReaction} onLike={handleLike}
                            onDislike={handleDislike}/>
        </div>
    )
}