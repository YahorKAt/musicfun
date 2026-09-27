import {store} from "@/app/model/store";
import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {HashRouter} from "react-router";
import App from './app/ui/App/App.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>
)
