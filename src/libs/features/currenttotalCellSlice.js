import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const currenttotalCellSlice = createSlice({
  name: 'currenttotalCell',
  initialState,
  reducers: {
    updatecurrenttotalCell:(state,actions)=>{
      state.value = actions.payload ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updatecurrenttotalCell } = currenttotalCellSlice.actions

export default currenttotalCellSlice.reducer