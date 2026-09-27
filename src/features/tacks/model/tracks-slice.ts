import {createSlice} from "@reduxjs/toolkit";

export const tracksSlice = createSlice({
    name: "tracks",
    initialState: {
        isOpen: false as boolean
    },
    selectors: {
        selectIsOpenUploadTrackModalAC: (state) => state.isOpen,
    },
    reducers:
        (create) => ({
            setIsOpenUploadTrackModalAC: create.reducer<{ isOpen: boolean }>((state, action) => {
                state.isOpen = action.payload.isOpen
            }),
        }),
})

export const {setIsOpenUploadTrackModalAC} = tracksSlice.actions
export const {selectIsOpenUploadTrackModalAC} = tracksSlice.selectors
export const tracksReducer = tracksSlice.reducer