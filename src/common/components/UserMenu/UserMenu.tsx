import {Path} from "@/common/routing";
import {useLogoutMutation} from "@/features/auth/api/authApi";
import {useState, useRef, useEffect} from "react"
import {User, LogOut, ChevronDown} from "lucide-react"
import {useNavigate} from "react-router";
import s from "./UserMenu.module.css"

interface UserMenuProps {
    userName: string
    userAvatar: string
}

export const UserMenu = ({userName, userAvatar}: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()


    const [logout] = useLogoutMutation()


    // Закрытие при клике вне меню
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const handleProfileClick = () => {
        navigate(Path.Profile)
        setIsOpen(false)
    }

    const handleLogoutClick = () => {
        logout()
        navigate(Path.Home)
        setIsOpen(false)
    }

    return (
        <div className={s.wrapper} ref={menuRef}>
            {/* Кнопка-триггер */}
            <button
                className={s.trigger}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <img src={userAvatar} alt={userName} className={s.avatar}/>
                <span className={s.userName}>{userName}</span>
                <ChevronDown size={16} className={`${s.arrow} ${isOpen ? s.arrowOpen : ""}`}/>
            </button>

            {/* Выпадающее меню */}
            {isOpen && (
                <div className={s.dropdown}>
                    <button className={s.dropdownItem} onClick={handleProfileClick}>
                        <User size={24} className={s.itemIcon}/>
                        <span>My profile</span>
                    </button>

                    <button className={s.dropdownItem} onClick={handleLogoutClick}>
                        <LogOut size={24} className={s.itemIcon}/>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    )
}