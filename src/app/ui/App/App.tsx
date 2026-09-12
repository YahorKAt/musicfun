import {Header, LinearProgress} from "@/common/components";
import {useGlobalLoading} from "@/common/hooks";
import {Routing} from "@/common/routing";
import s from '@/app/ui/App/App.module.css'
import {ToastContainer} from "react-toastify";


export const App = () => {

    const isGlobalLoading = useGlobalLoading()

    return (
        <>
            <Header/>
            {isGlobalLoading && <LinearProgress/>}
            <div className={s.layout}>
                <Routing/>
            </div>
            <ToastContainer position="bottom-left" theme={'colored'}/>
        </>
    )
}

export default App