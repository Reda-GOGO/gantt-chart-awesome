import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [200,80,80,80,100,40],
}

export const columnswidthSlice = createSlice({
  name: 'columnswidth',
  initialState,
  reducers: {
    updateOne:(state,actions)=>{
      state.value[actions.payload.indexCol] += actions.payload.widthCol
    },

  },
})

// Action creators are generated for each case reducer function
export const { updateOne } = columnswidthSlice.actions

export default columnswidthSlice.reducer