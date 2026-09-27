import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {Path} from "@/common/routing";
import {setIsOpenModalAC} from "@/features/playlists/model/playlist-slice";
import {setIsOpenUploadTrackModalAC} from "@/features/tacks/model";
import {NavLink} from "react-router";
import {Home, Library, PlusCircle, Upload, Music, ListMusic, type LucideIcon} from "lucide-react"
import s from './Sidebar.module.css'

type ModalType = 'createPlaylist' | 'uploadTrack'

interface NavItem {
    to?: string              // Опционально, так как у модалок нет пути
    label: string
    icon: LucideIcon
    end?: boolean
    modalType?: ModalType        // Опциональный флаг
}

interface NavGroup {
    group: string
    items: NavItem[]
}

const navItems: NavGroup[] = [
    {
        group: "main",
        items: [
            {to: Path.Home, label: "Home", icon: Home, end: true},
            {to: Path.Library, label: "Your Library", icon: Library},
        ]
    },
    {
        group: "create",
        items: [
            {label: "Create Playlist", icon: PlusCircle,  modalType: 'createPlaylist'},
            {label: "Upload Track", icon: Upload, modalType: 'uploadTrack'},
        ]
    },
    {
        group: "browse",
        items: [
            {to: Path.Tracks, label: "All Tracks", icon: Music},
            {to: Path.Playlists, label: "All Playlist", icon: ListMusic},
        ]
    }
]

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    return (
        <aside className={s.sidebar}>
            <nav className={s.nav}>
                {navItems.map((group, groupIndex) => (
                    <div key={group.group} className={s.navGroup}>
                        {group.items.map(item => {
                            const Icon = item.icon

                            // Если это модалка — рендерим кнопку
                            if (item.modalType === 'createPlaylist') {
                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={s.navItem}
                                        onClick={() => dispatch(setIsOpenModalAC({isOpen: true}))} // ← Твой экшен для плейлиста
                                    >
                                        <Icon size={24} className={s.icon} />
                                        <span className={s.label}>{item.label}</span>
                                    </button>
                                )
                            }

                            if (item.modalType === 'uploadTrack') {
                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={s.navItem}
                                        onClick={() => dispatch(setIsOpenUploadTrackModalAC({isOpen: true}))} // ← Твой экшен для трека
                                    >
                                        <Icon size={24} className={s.icon} />
                                        <span className={s.label}>{item.label}</span>
                                    </button>
                                )
                            }

                            // Иначе — обычная ссылка
                            return (
                                <NavLink key={item.to} to={item.to!}
                                         className={({isActive}) => `${s.navItem} ${isActive ? s.active : ""}`}>
                                    <Icon size={24} className={s.icon}/>
                                    <span className={s.label}>{item.label}</span>
                                </NavLink>
                            )
                        })}
                        {groupIndex < navItems.length - 1 && (
                            <div className={s.divider}/>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    )
};