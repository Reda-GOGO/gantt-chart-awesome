import { createSlice } from '@reduxjs/toolkit'
import { taskData } from '../../data/taskData'


const initialState = {
    value: taskData
}

export const tasksdataSlice = createSlice({
    name: 'tasksdata',
    initialState,
    reducers: {
        setOne: (state, actions) => {
            state.value[actions.payload.indexCol] = actions.payload.ValueCol
        },

    },
})

// Action creators are generated for each case reducer function
export const { updateOne } = tasksdataSlice.actions

export default tasksdataSlice.reducer