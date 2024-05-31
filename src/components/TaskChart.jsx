import { useState } from 'react'
import TaskChartHeader from './TaskChart/TaskChartHeader'
import TaskChartBody from './TaskChart/TaskChartBody'

function TaskChart() {
  const [widthCell, setWidthCell] = useState(0)
  const [totalCell, setTotalCell] = useState(0)

  return (
    <>
      <div className="w-full h-full relative flex flex-col flex-nowrap ">
        <TaskChartHeader setWidthCell={setWidthCell} setTotalCell={setTotalCell} />
        {/* {totalCell !== 0 && widthCell !== 0 ? */}
          <TaskChartBody totalCell={totalCell} widthCell={widthCell} /> 
          {/* : ''} */}
      </div>
    </>
  )
}

export default TaskChart