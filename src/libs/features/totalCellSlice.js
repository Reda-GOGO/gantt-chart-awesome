import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const totalCellSlice = createSlice({
  name: 'totalCell',
  initialState,
  reducers: {
    updatetotalCell:(state,actions)=>{
      state.value = actions.payload ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updatetotalCell } = totalCellSlice.actions

export default totalCellSlice.reducer