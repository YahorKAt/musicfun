import {EditProfileForm} from "@/features/auth/ui/EditProfileForm/EditProfileForm";
import {Pencil} from "lucide-react"
import {useState} from "react";
import s from "./ProfileHeader.module.css"

type Props = {
    name: string | undefined
    avatarUrl: string
    playlistsCount: number
    tracksCount: number
    onEditProfile?: () => void
}

export const ProfileHeader = ({name, avatarUrl, playlistsCount, tracksCount, onEditProfile}: Props) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const onEditProfileHandler = () => {
        setIsEditModalOpen(true)
        if(onEditProfile){
            onEditProfile()
        }
    }

    return (
        <div className={s.container}>
            <div className={s.avatarWrapper}>
                <img src={avatarUrl} alt={name} className={s.avatar}/>
            </div>

            <h2 className={s.name}>{name}</h2>

            <button className={s.editButton} onClick={onEditProfileHandler}>
                <Pencil size={14} className={s.editIcon}/>
                <span>Edit profile</span>
            </button>

            <div className={s.stats}>
                <div className={s.stat}>
                    <span className={s.statValue}>{playlistsCount}</span>
                    <span className={s.statLabel}>PLAYLISTS</span>
                </div>
                <div className={s.stat}>
                    <span className={s.statValue}>{tracksCount.toLocaleString()}</span>
                    <span className={s.statLabel}>TRACKS</span>
                </div>
            </div>




            <EditProfileForm isOpen={isEditModalOpen}
                             onClose={() => setIsEditModalOpen(false)}
                             currentName={name}
                             currentSurname=''
                             currentAvatarUrl={avatarUrl}/>
        </div>
    )
}