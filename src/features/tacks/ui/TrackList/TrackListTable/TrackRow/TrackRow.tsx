import {ReactionButton} from "@/common/components";
import {formatDateRelative} from "@/common/utils";
import {
    useDislikeTrackMutation,
    useLikeTrackMutation,
    useRemoveReactionTrackMutation
} from "@/features/tacks/api/tracksApi";
import type {TrackData} from "@/features/tacks/api/tracksApi.types";
import {TrackCover} from "@/features/tacks/ui/TrackItem/TrackCover/TrackCover";
import {MoreHorizontal} from "lucide-react";
import s from './TrackRow.module.css'

type TrackItemProps = {
    track: TrackData
    number: number
    isPlaying?: boolean
}

export const TrackRow = ({track, number, isPlaying = false}: TrackItemProps) => {
    const [likeTrack] = useLikeTrackMutation()
    const [dislikeTrack] = useDislikeTrackMutation()
    const [removeReaction] = useRemoveReactionTrackMutation()

    const handleLike = async () => {
        if (track.attributes.currentUserReaction === 1) {
            // Логика удаления лайка
            await removeReaction({trackId: track.id}).unwrap()
        } else {
            await likeTrack({trackId: track.id}).unwrap()
        }
    }

    const handleDislike = async () => {
        if (track.attributes.currentUserReaction === -1) {
            // Логика удаления дизлайка
            await removeReaction({trackId: track.id}).unwrap()
        } else {
            await dislikeTrack({trackId: track.id}).unwrap()
        }
    }

    return (
            <tr className={`${s.row} ${isPlaying ? s.playing : ""}`}>
                <td className={s.number}>
                    {isPlaying ? (
                        <div className={s.playingIndicator}>
                            <div className={s.playingBars}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    ) : (
                        <span className={s.numberText}>{number}</span>
                    )}
                </td>
                <td className={s.title}>
                    <div className={s.trackInfo}>
                        <TrackCover images={track.attributes.images} size={'small'}/>
                        <div className={s.trackDetails}>
                            <div className={`${s.trackName} ${isPlaying ? s.activeTrack : ""}`}>
                                {track.attributes.title}
                            </div>
                            <div className={s.artistName}>{"artist name"}</div>
                        </div>
                        {isPlaying && <div className={s.progressBar}><div className={s.progressFill} /></div>}
                    </div>
                </td>
                <td className={s.date}>{formatDateRelative(track.attributes.addedAt)}</td>
                <td className={s.reactions}>
                    <ReactionButton currentUserReaction={track.attributes.currentUserReaction} onLike={handleLike}
                                    onDislike={handleDislike}/>
                </td>
                <td className={s.menu}>
                    <button type="button" className={s.menuBtn}>
                        <MoreHorizontal size={16} />
                    </button>
                </td>
                <td className={s.duration}>2:12</td>
            </tr>
    )
}