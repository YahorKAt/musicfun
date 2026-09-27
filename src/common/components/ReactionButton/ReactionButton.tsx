import {DisLike, Like} from "@/common/components";
import s from './ReactionButton.module.css'
type Props = {
    currentUserReaction: number,
    onLike: () => void,
    onDislike: () => void,
}

export const ReactionButton = ({currentUserReaction, onLike, onDislike}: Props) => {
    return (
        <div className={s.reactions}>
            <div className={s.reaction}>
                <Like isLiked={currentUserReaction === 1} onClick={onLike}/>
            </div>
            <div className={s.reaction}>
                <DisLike isDisLiked={currentUserReaction === -1} onClick={onDislike}/>
            </div>
        </div>
    );
};
