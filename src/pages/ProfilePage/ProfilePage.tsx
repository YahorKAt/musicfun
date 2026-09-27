import {Path} from "@/common/routing";
import {useGetMeQuery} from "@/features/auth/api/authApi";
import {ProfileHeader} from "@/features/auth/ui/ProfileHeader/ProfileHeader";
import {MyLikedPlaylistsTab} from "@/features/auth/ui/ProfileTabs/MyLikedPlaylistsTab/MyLikedPlaylistsTab";
import {MyLikedTracksTab} from "@/features/auth/ui/ProfileTabs/MyLikedTracksTab/MyLikedTracksTab";
import {MyPlaylistsTab} from "@/features/auth/ui/ProfileTabs/MyPlaylistsTab/MyPlaylistsTab";
import {MyTracksTab} from "@/features/auth/ui/ProfileTabs/MyTracksTab/MyTracksTab";
import {useFetchPlaylistsQuery} from "@/features/playlists/api/playlistsApi";
import {useState} from "react";
import {Navigate} from "react-router";
import s from './ProfilePage.module.css'
import avatar from '@/assets/icons/avatar.png'

const profileTabs = [
    {id: "my-playlists", label: "My Playlists"},
    {id: "my-tracks", label: "My Tracks"},
    {id: "my-liked-playlists", label: "My Liked Playlists"},
    {id: "my-liked-tracks", label: "My Liked Tracks"},
]

export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("my-playlists")
    const {data: meResponse, isLoading: isMeLoading} = useGetMeQuery()

    const {data: playlistsResponse, isLoading} = useFetchPlaylistsQuery(
        {userId: meResponse?.userId},
        {skip: !meResponse?.userId},
    )
    const myPlaylists = playlistsResponse?.data || []

    if (isMeLoading || isLoading) {
        return <h1>Skeleton loader...</h1>;
    }

    if (!isMeLoading && !meResponse) {
        return <Navigate to={Path.Playlists}></Navigate>;
    }

    const handleEditProfile = () => {
        console.log("Edit profile clicked")
    }

    return (
        <div className={s.container}>
            <ProfileHeader name={meResponse?.login} tracksCount={12} playlistsCount={10} avatarUrl={avatar}
                           onEditProfile={handleEditProfile}/>
            <div>
                <div className={s.tabsContainer}>
                    <nav className={s.tabs}>
                        {profileTabs.map(tab => (
                            <button key={tab.id} type="button"
                                    className={`${s.tab} ${activeTab === tab.id ? s.active : ""}`}
                                    onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                    <div className={s.divider}/>
                </div>

                <div>
                    {/* Рендерим только активную вкладку */}
                    {activeTab === "my-playlists" &&
                        <MyPlaylistsTab playlists={myPlaylists} isPlaylistLoading={isLoading || isMeLoading}/>}
                    {activeTab === "my-tracks" &&
                        <MyTracksTab playlists={[]} isPlaylistLoading={isLoading || isMeLoading}/>}
                    {activeTab === "my-liked-playlists" &&
                        <MyLikedPlaylistsTab/>}
                    {activeTab === "my-liked-tracks" && <MyLikedTracksTab/>}
                </div>
            </div>
            {/*<div className={s.list}>*/}
            {/*    <PlaylistList playlists={playlistsResponse?.data || []} isPlaylistLoading={isLoading || isMeLoading} />*/}
            {/*</div>*/}
        </div>
    )
}