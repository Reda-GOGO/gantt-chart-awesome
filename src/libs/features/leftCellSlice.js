import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const leftCellSlice = createSlice({
  name: 'leftCell',
  initialState,
  reducers: {
    updateleftCell:(state,actions)=>{
      state.value = actions.payload ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateleftCell } = leftCellSlice.actions

export default leftCellSlice.reducer