import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import TableRows from './TableRows'


function TaskTableBody() {
  const tasks = useSelector((state) => state.tasksdata.value)


  return (
    <>
      <TableRows tasks={tasks} />

    </>
  )
}

export default TaskTableBody