import {DisLikeIcon} from "@/common/components";
import s from "./style.module.css";

type Props = {
    isDisLiked?: boolean
    onClick?: () => void
}

export const DisLike = ({isDisLiked, onClick}: Props) => {
    return (
        <button className={`${s.actionBtn} ${isDisLiked ? s.active : ""}`}
                aria-label="Dislike" onClick={onClick}>
            <DisLikeIcon filled={isDisLiked}/>
        </button>
    );
};
