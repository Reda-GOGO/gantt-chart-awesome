import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const widthCellSlice = createSlice({
  name: 'widthCell',
  initialState,
  reducers: {
    updateWidthCell:(state,actions)=>{
      state.value = actions.payload ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateWidthCell } = widthCellSlice.actions

export default widthCellSlice.reducer