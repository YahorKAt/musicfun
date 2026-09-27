import {baseApi} from "@/app/api/baseApi"
import {playlistReducer, playlistSlice} from "@/features/playlists/model";
import {tracksReducer, tracksSlice} from "@/features/tacks/model";

import {configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [playlistSlice.name]: playlistReducer,
        [tracksSlice.name]: tracksReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

