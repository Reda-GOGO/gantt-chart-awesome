import React, { useEffect, useRef, useState } from 'react'
import TaskTableHeader from './TaskTable/TaskTableHeader'
import TaskTableBody from './TaskTable/TaskTableBody'
import { useSelector } from 'react-redux'


function TaskTable() {
  const widthCols = useSelector((state) => state.columnswidth.value)
  const colsLayout = useRef([])
  const taskTableContainer = useRef()
  const DisableSelectionTable = useSelector((state) => state.disableselectiontable.value)
  const [selectedCol, setSelectedCol] = useState(-1)
  const [deltaX, setDeltaX] = useState(-1)

  useEffect(() => {
    let sumWidth = 0
    widthCols.map((width, i) => {
      colsLayout.current[i].style.left = sumWidth + "px"
      sumWidth += width
      colsLayout.current[i].style.width = width + "px"
    })
    taskTableContainer.current.style.minWidth = sumWidth + "px"
    if (DisableSelectionTable) {
      taskTableContainer.current.style.userSelect = 'none'
    } else {
      taskTableContainer.current.style.userSelect = 'auto'
    }
    if(selectedCol != -1){
      colsLayout.current[selectedCol].style.borderLeftWidth = "1px"
      colsLayout.current[selectedCol].style.borderRightWidth = "1px"
      colsLayout.current[selectedCol].style.borderColor = "rgb(209 213 219)"
      colsLayout.current[selectedCol].style.backgroundColor = "rgb(209 213 219)"
      colsLayout.current[selectedCol].style.width = widthCols[selectedCol] + deltaX + "px"

    }else{
      [0,0,0,0,0,0].map((_,index)=>{
          if(colsLayout.current[index].getAttribute('style')){
              colsLayout.current[index].removeAttribute('style')
          }
      })
  }

  }, [widthCols, DisableSelectionTable,selectedCol,deltaX])
  return (
    <>
      <div ref={taskTableContainer} className=" h-full relative flex flex-nowrap ">
        <div className="absolute w-full h-full  ">
          <div className="absolute w-full z-0 h-full flex flex-row">

            {widthCols.map((_, i) => {
              return (
                <div
                  key={i}
                  ref={el => colsLayout.current[i] = el}
                  className="absolute h-full  flex justify-center items-center ">
                </div>
              )
            })}
          </div>
          {/* this is a header for task table panel */}
          <TaskTableHeader setSelectedCol={setSelectedCol} setDeltaX={setDeltaX} />

          {/* this is body for task table panel  */}
          <TaskTableBody />
        </div>
      </div>
    </>
  )
}

export default TaskTable