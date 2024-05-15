import React, { useEffect, useRef, useState } from 'react'
import adjustSpilter from '../utils/adjustSpilter'
import TaskTable from './TaskTable'
import TaskChart from './TaskChart'

function Container() {
  const [taskChartWidth, setTaskChartWidth] = useState(0)
  const taskContainer = useRef()
  const spilter = useRef()
  const taskTable = useRef()
  const phTaskTable = useRef()
  const phTaskChart = useRef()
  const taskChart = useRef()

  useEffect(() => {
    adjustSpilter(taskContainer.current,
      spilter.current,
      taskTable.current,
      taskChart.current,
      phTaskTable.current,
      phTaskChart.current)
      // if(taskChartWidth !=taskChart.current.offsetWidth){
      //   setTaskChartWidth(taskChart.current.offsetWidth)
      //   console.log(taskChart.current.offsetWidth)
      // }
  }, [])

  return (
    <>

      <div ref={taskContainer} className="relative  max-w-[1300px] w-full min-h-[600px] h-full bg-white ">
        <div className="border flex flex-row border-solid border-gray-400 min-h-[600px] ">
          <div ref={taskTable} className="w-[450px] min-h-[600px] flex flex-wrap overflow-auto ">
            <TaskTable />
          </div>
          <div
            ref={spilter}
            className="divider w-[4px] cursor-e-resize">
            <div className="w-[2px] h-full bg-gray-400"></div>
          </div>
          <div
            ref={taskChart}
            className="w-[850px] min-h-[600px] flex flex-wrap overflow-auto">
            <TaskChart />
          </div>
        </div>

        <div className="absolute flex w-full top-1">
          <div
            ref={phTaskTable}
            className=" flex flex-wrap overflow-auto"></div>
          <div

            className="divider w-[2px] cursor-e-resize">
            <div className="w-[2px] h-full"></div>
          </div>
          <div
            ref={phTaskChart}
            className=" flex flex-wrap overflow-auto"></div>
        </div>
      </div>
    </>
  )
}

export default Container