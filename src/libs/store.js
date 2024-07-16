import { configureStore } from '@reduxjs/toolkit'
import columnswidthReducer from './features/columnswidthSlice.js'
import tasksdataReducer from './features/tasksdataSlice.js'
import disableselectiontableReducer from './features/disableSelectionTableSlice.js'
import zoomtypeReducer from './features/zoomtypeSlice.js'
import panelsWidthReducer from './features/panelsWidthSlice.js'
import expandLinesReducer from './features/expandLinesSlice.js'
import scrollableLeftReducer from './features/scrollableLeftSlice.js'
import widthCellReducer from './features/widthCellSlice.js'
import totalCellReducer from './features/totalCellSlice.js'
import leftCellReducer from './features/leftCellSlice.js'
import currenttotalCellReducer from './features/currenttotalCellSlice.js'
import taskCoordinatesReducer from './features/taskCoordinatesSlice.js'
import linksDataReducer from './features/linksDataSlice.js'
export const store = configureStore({
  reducer: {
    columnswidth : columnswidthReducer,
    tasksdata : tasksdataReducer,
    disableselectiontable : disableselectiontableReducer,
    zoomtype : zoomtypeReducer ,
    panelsWidth : panelsWidthReducer,
    expandLines : expandLinesReducer,
    scrollableLeft  : scrollableLeftReducer,
    widthCell : widthCellReducer,
    leftCell : leftCellReducer,
    totalCell : totalCellReducer,
    currenttotalCell :currenttotalCellReducer,
    taskCoordinates : taskCoordinatesReducer,
    linksData : linksDataReducer,
  },
})