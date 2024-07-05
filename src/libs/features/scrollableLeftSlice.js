import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const scrollableLeftSlice = createSlice({
  name: 'scrollableLeft',
  initialState,
  reducers: {
    updateScrollLeft:(state,actions)=>{
      state.value = actions.payload ;
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateScrollLeft } = scrollableLeftSlice.actions

export default scrollableLeftSlice.reducer