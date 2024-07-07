import TaskChartHeader from './TaskChart/TaskChartHeader'
import TaskChartBody from './TaskChart/TaskChartBody'

function TaskChart() {

  return (
    <>
      <div className="w-full h-full relative flex flex-col flex-nowrap ">
        <TaskChartHeader
        />
        <TaskChartBody
        />
      </div>
    </>
  )
}

export default TaskChart