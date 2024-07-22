import { createSlice } from '@reduxjs/toolkit'
import { taskData } from '../../data/taskData'
import { calculateParentDates } from '../../utils/trimTaskdata'

const initialState = {
    value: calculateParentDates(taskData)
}

export const tasksdataSlice = createSlice({
    name: 'tasksdata',
    initialState,
    reducers: {
        setStart: (state, actions) => {
            const { taskId, newStartValue } = actions.payload;
            const taskIndex = state.value.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
              state.value[taskIndex].start = newStartValue;
            }
            calculateParentDates(state.value)      
        },
        setDuration: (state, actions) => {
            const { taskId, newDurationValue } = actions.payload;
            const taskIndex = state.value.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
              state.value[taskIndex].duration = newDurationValue;
            }
            calculateParentDates(state.value)      
        },
        setDurationInHour: (state, actions) => {
            const { taskId, newDurationInHValue } = actions.payload;
            const taskIndex = state.value.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
              state.value[taskIndex].duration_hour = newDurationInHValue;
            }
            calculateParentDates(state.value)      
        },
        setName: (state, actions) => {
            const { taskId, newTasknameValue } = actions.payload;
            const taskIndex = state.value.findIndex((task) => task.id === taskId);
            if (taskIndex !== -1) {
              state.value[taskIndex].task_name = newTasknameValue;
            }
            calculateParentDates(state.value)      
        },

    },
})

// Action creators are generated for each case reducer function
export const { setStart,setDuration,setDurationInHour,setName } = tasksdataSlice.actions

export default tasksdataSlice.reducer