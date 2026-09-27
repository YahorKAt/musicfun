import {Header, LinearProgress, Player, Sidebar} from "@/common/components";
import {useGlobalLoading} from "@/common/hooks";
import {Routing} from "@/common/routing";
import {CreatePlaylistForm} from "@/pages/CreatePlaylistForm";
import {UploadTrackForm} from "@/pages/UploadTrackForm/UploadTrackForm";
import {ToastContainer} from "react-toastify";
import s from '@/app/ui/App/App.module.css'

export const App = () => {

    const isGlobalLoading = useGlobalLoading()

    return (
        <div className={s.layout}>
            {isGlobalLoading && <LinearProgress/>}
            <Sidebar/>

            <div className={s.mainArea}>
                <Header/>
                <main className={s.content}>
                    <Routing/>
                </main>
            </div>
            <Player/>

            <CreatePlaylistForm/>
            <UploadTrackForm/>
            <ToastContainer position="bottom-left" theme={'colored'}/>
        </div>
    )
}

export default App