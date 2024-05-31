import React, { useEffect, useRef } from 'react'
import TaskTable from './TaskTable'
import TaskChart from './TaskChart'
import useAdjustPanel from '../hooks/useAdjustPanel'

function Container() {
  const taskContainer = useRef()
  const spilter = useRef()
  const taskTable = useRef()
  const phTaskTable = useRef()
  const phTaskChart = useRef()
  const taskChart = useRef()

  useAdjustPanel(
    taskContainer,
    spilter,
    taskTable,
    taskChart,
    phTaskTable,
    phTaskChart
  )

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