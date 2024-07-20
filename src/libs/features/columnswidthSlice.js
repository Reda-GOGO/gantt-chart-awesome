import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [200,80,80,80,100,40],
}

export const columnswidthSlice = createSlice({
  name: 'columnswidth',
  initialState,
  reducers: {
    updateOne:(state,actions)=>{
      if(actions.payload){
        if(state.value[actions.payload.indexCol] + actions.payload.widthCol >= 40){
          state.value[actions.payload.indexCol] += actions.payload.widthCol;
        }else{
          state.value[actions.payload.indexCol] = 40;
        }
      }
    },

  },
})

// Action creators are generated for each case reducer function
export const { updateOne } = columnswidthSlice.actions

export default columnswidthSlice.reducer