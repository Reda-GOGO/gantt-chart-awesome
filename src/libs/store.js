import { configureStore } from '@reduxjs/toolkit'
import columnswidthReducer from './features/columnswidthSlice.js'
import tasksdataReducer from './features/tasksdataSlice.js'
import disableselectiontableReducer from './features/disableSelectionTableSlice.js'
import zoomtypeReducer from './features/zoomtypeSlice.js'
import panelsWidthReducer from './features/panelsWidthSlice.js'
import expandLinesReducer from './features/expandLinesSlice.js'
import scrollableLeftReducer from './features/scrollableLeftSlice.js'
export const store = configureStore({
  reducer: {
    columnswidth : columnswidthReducer,
    tasksdata : tasksdataReducer,
    disableselectiontable : disableselectiontableReducer,
    zoomtype : zoomtypeReducer ,
    panelsWidth : panelsWidthReducer,
    expandLines : expandLinesReducer,
    scrollableLeft  : scrollableLeftReducer,
  },
})