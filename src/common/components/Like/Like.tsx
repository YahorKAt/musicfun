import {LikeIcon} from "@/common/components";
import s from "./style.module.css"

type Props = {
    isLiked?: boolean
    onClick?: () => void
}

export const Like = ({isLiked, onClick}: Props) => {
    return (
        <button className={`${s.actionBtn} ${isLiked ? s.active : ""}`}
                aria-label="Like" onClick={onClick}>
            <LikeIcon filled={isLiked}/>
        </button>
    )
}