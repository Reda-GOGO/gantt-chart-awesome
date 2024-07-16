import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const taskCoordinatesSlice = createSlice({
  name: 'taskCoordinates',
  initialState,
  reducers: {
    settaskCoordinates:(state,actions)=>{
      state.value = actions.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { settaskCoordinates } = taskCoordinatesSlice.actions

export default taskCoordinatesSlice.reducer