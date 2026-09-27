import type {TrackData} from "@/features/tacks/api/tracksApi.types";
import {TrackRow} from "@/features/tacks/ui/TrackList/TrackListTable/TrackRow/TrackRow";
import {Clock} from "lucide-react";
import s from './TrackListTable.module.css'

type Props = {
    tracks: TrackData[],
    currentTrackId?: string
}

export const TrackListTable = ({tracks, currentTrackId}: Props) => {
    return (
        <div className={s.container}>
            <table className={s.table}>
                <thead>
                <tr className={s.headerRow}>
                    <th className={s.number}>
                        <span className={s.headerLabel}>#</span>
                    </th>
                    <th className={s.title}>
                        <span className={s.headerLabel}>TITLE</span>
                    </th>
                    <th className={s.date}>
                        <span className={s.headerLabel}>DATE ADDED</span>
                    </th>
                    <th className={s.reactions}></th>
                    <th className={s.menu}></th>
                    <th className={s.duration}>
                        <Clock size={16} className={s.clockIcon}/>
                    </th>
                </tr>
                </thead>

                <tbody>
                {tracks.map((track, index) => (
                    <TrackRow key={track.id}
                              track={track}
                              number={index + 1}
                              isPlaying={track.id === currentTrackId}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};

