import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:{}
}

export const expandLinesSlice = createSlice({
    name: 'expandLines',
    initialState,
    reducers: {
        setexpandLines: (state, actions) => {
            state.value = actions.payload
        },


    }
})

export const { setexpandLines } = expandLinesSlice.actions

export default expandLinesSlice.reducer