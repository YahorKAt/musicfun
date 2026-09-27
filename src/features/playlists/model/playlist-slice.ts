import {createSlice} from "@reduxjs/toolkit"

export const playlistSlice = createSlice({
    name: "playlist",
    initialState: {
        isOpen: false as boolean
    },
    selectors: {
        selectIsOpenModal: (state) => state.isOpen,
    },
    reducers:
        (create) => ({
            setIsOpenModalAC: create.reducer<{ isOpen: boolean }>((state, action) => {
                state.isOpen = action.payload.isOpen
            }),
        }),
})

export const {setIsOpenModalAC} = playlistSlice.actions
export const {selectIsOpenModal} = playlistSlice.selectors
export const playlistReducer = playlistSlice.reducer