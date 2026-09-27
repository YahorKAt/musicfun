import type {Images} from "@/common/types";
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './TrackCover.module.css'

type TrackCoverSize = 'small' | 'medium' | 'large'

type Props = {
    images: Images
    size?: TrackCoverSize
}
export const TrackCover = ({images, size = 'medium'}: Props) => {
    const originalCover = images.main.find(img => img.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    return (
        <div className={`${s.coverWrapper} ${s[`size${size.charAt(0).toUpperCase() + size.slice(1)}`]}`}>
            <img src={src} className={s.cover} alt='Track cover'/>
        </div>
    )
};

