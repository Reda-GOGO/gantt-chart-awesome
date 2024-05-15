import { configureStore } from '@reduxjs/toolkit'
import columnswidthReducer from './features/columnswidthSlice.js'
import tasksdataReducer from './features/tasksdataSlice.js'
import disableselectiontableReducer from './features/disableSelectionTableSlice.js'
import zoomtypeReducer from './features/zoomtypeSlice.js'
export const store = configureStore({
  reducer: {
    columnswidth : columnswidthReducer,
    tasksdata : tasksdataReducer,
    disableselectiontable : disableselectiontableReducer,
    zoomtype : zoomtypeReducer ,
  },
})