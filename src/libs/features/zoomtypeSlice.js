import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: ''
}

export const zoomtypeSlice = createSlice({
    name:'zoomtype',
    initialState,
    reducers:{
        setzoomType:(state,actions)=>{
            state.value = actions.payload
        },
        
    }
})

export const {setzoomType} = zoomtypeSlice.actions

export default zoomtypeSlice.reducer