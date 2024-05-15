import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const disabletableselectionSlice = createSlice({
    name:'Disabletableselection',
    initialState,
    reducers:{
        enable:(state)=>{
            state.value = true
        },
        disable:(state)=>{
            state.value = false
        }

    }
})

export const {enable , disable} = disabletableselectionSlice.actions

export default disabletableselectionSlice.reducer