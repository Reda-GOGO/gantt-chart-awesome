import { useState } from 'react'
import TaskChartHeader from './TaskChart/TaskChartHeader'
import TaskChartBody from './TaskChart/TaskChartBody'

function TaskChart() {
  const [widthCell, setWidthCell] = useState(0)
  const [totalCell, setTotalCell] = useState(0)
  const [currenttotal,setcurrenttotal] = useState(0)
  const [leftCell,setleftCell] = useState([])
  const [selectIndex,setselectIndex] = useState(0)
  return (
    <>
      <div className="w-full h-full relative flex flex-col flex-nowrap ">
        <TaskChartHeader 
          setWidthCell={setWidthCell}
          setTotalCell={setTotalCell}
          setcurrenttotal={setcurrenttotal}
          setleftCell={setleftCell}
          setselectIndex={setselectIndex}
          />
        {/* {totalCell !== 0 && widthCell !== 0 ? */}
          <TaskChartBody 
            totalCell={totalCell} 
            currenttotal={currenttotal}
            widthCell={widthCell}
            leftCell={leftCell}
            selectIndex={selectIndex}
            /> 
          {/* : ''} */}
      </div>
    </>
  )
}

export default TaskChart