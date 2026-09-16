import {MainPage} from "@/app/ui/MainPage/MainPage";
import {PageNotFound} from "@/common/components";
import {OAuthCallback} from "@/features/auth/ui/OAuthCallback/OAuthCallback";
import {ProfilePage} from "@/features/auth/ui/ProfilePage/ProfilePage";
import {PlaylistsPage} from "@/features/playlists/ui/PlaylistsPage";
import {TracksPage} from "@/features/tacks/ui/TracksPage";
import {Route, Routes} from "react-router";
import {Path} from "@/common/routing";


export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage/>}/>
        <Route path={Path.Playlists} element={<PlaylistsPage/>}/>
        <Route path={Path.Tracks} element={<TracksPage/>}/>
        <Route path={Path.Profile} element={<ProfilePage/>}/>
        <Route path={Path.OAuthRedirect} element={<OAuthCallback/>}/>
        <Route path={Path.NotFound} element={<PageNotFound/>}/>
    </Routes>
)