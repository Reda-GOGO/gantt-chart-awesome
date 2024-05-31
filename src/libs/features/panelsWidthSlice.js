import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    first: 450,
    second: 850
}

export const panelsWidthSlice = createSlice({
    name: 'panelsWidth',
    initialState,
    reducers: {
        setPanelsWidth: (state, actions) => {
            state.first = actions.payload.first;
            state.second = actions.payload.second;   
        },


    }
})

export const { setPanelsWidth } = panelsWidthSlice.actions

export default panelsWidthSlice.reducer