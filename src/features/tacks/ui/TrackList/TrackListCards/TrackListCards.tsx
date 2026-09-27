import type {TrackData} from "@/features/tacks/api/tracksApi.types";
import {TrackCard} from "@/features/tacks/ui/TrackList/TrackListCards/TrackCard/TrackCard";
import s from './TrackListCards.module.css'

type Props = {
    tracks: TrackData[],
}

export const TrackListCards = ({tracks}: Props) => {
    return (
        <div className={s.tracklist}>
            {tracks.map(track => {
                return (
                    <TrackCard key={track.id} track={track}/>
                    // <div key={track.id} className={s.item}>
                    //     <div>
                    //         <p>Title: {title}</p>
                    //         <p>Name: {user.name}</p>
                    //     </div>
                    //     {attachments.length ? <audio controls src={attachments[0].url}/> : 'no file'}
                    // </div>
                )
            })}
        </div>
    );
};

