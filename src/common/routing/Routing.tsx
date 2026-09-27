import {HomePage} from "@/pages/HomePage/HomePage";
import {PageNotFound} from "@/common/components";
import {OAuthCallback} from "@/features/auth/ui/OAuthCallback/OAuthCallback";
import {ProfilePage} from "@/pages/ProfilePage/ProfilePage";
import {PlaylistsPage} from "@/pages/PlaylistsPage/PlaylistsPage";
import {TracksPage} from "@/pages/TracksPage/TracksPage";
import {Route, Routes} from "react-router";
import {Path} from "@/common/routing";

export const Routing = () => {
    return (
        <Routes>
            <Route path={Path.Home} element={<HomePage/>}/>
            <Route path={Path.Library} element={<PageNotFound/>}/>
            <Route path={Path.Playlists} element={<PlaylistsPage/>}/>
            <Route path={Path.Tracks} element={<TracksPage/>}/>
            <Route path={Path.Profile} element={<ProfilePage/>}/>
            <Route path={Path.OAuthRedirect} element={<OAuthCallback/>}/>
            <Route path={Path.NotFound} element={<PageNotFound/>}/>
        </Routes>
    )
}