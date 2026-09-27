import {UserMenu} from "@/common/components/UserMenu";
import {useGetMeQuery} from "@/features/auth/api/authApi";
import {Login} from "@/features/auth/ui/Login/Login";
import s from './Header.module.css'
import avatar from "@/assets/icons/avatar.png"

export const Header = () => {
    const {data} = useGetMeQuery()

    return (
        <header className={s.header}>
            {data && (
                <div className={s.userSection}>
                    <UserMenu userName={data.login} userAvatar={avatar}/>
                </div>
            )}
            {!data && <Login/>}
        </header>
    )
}