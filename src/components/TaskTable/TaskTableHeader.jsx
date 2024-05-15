import React, { useEffect, useRef } from 'react'
import Add from '../../assets/Add.jsx'
import { useDispatch, useSelector } from 'react-redux'
import sortdataIndex from '../../utils/sortdataIndex.js'
import { enable, disable } from '../../libs/features/disableSelectionTableSlice.js'
import { updateOne } from '../../libs/features/columnswidthSlice.js'
import destructTasks from '../../utils/destructTasks.js'

function TaskTableHeader({ setSelectedCol, setDeltaX }) {

  const tasks = useSelector((state) => state.tasksdata.value)
  const widthCols = useSelector((state) => state.columnswidth.value)
  const task_titles = sortdataIndex(destructTasks(tasks))
  const tableHeaders = useRef([])
  const resizers = useRef([])
  const dispatch = useDispatch()
  let delta
  useEffect(() => {
    widthCols.map((width, i) => {
      tableHeaders.current[i].style.width = width + "px"
    })
    let tmp = 0
    resizers.current.map((resizer, i) => {

      resizer.onmousedown = (event) => {
        let md = {
          event,
        }
        dispatch(enable())
        document.onmousemove = (e) => {
          delta = e.clientX - md.event.clientX

          setSelectedCol(i)
          setDeltaX(delta)
        }
        document.onmouseup = () => {
          document.onmouseup = ''
          document.onmousemove = ''
          dispatch(disable())
          dispatch(updateOne({ indexCol: i, widthCol: delta }))
          setSelectedCol(-1)
        }
      }
      tmp += widthCols[i]
      resizer.style.left = tmp + "px"
    })


  }, [widthCols])

  return (
    <>
      <div className="relative w-full h-20 flex flex-row border-b-[1px] border-gray-400">

        {task_titles.map((_, i) => {
        
            if (task_titles[i + 1] != undefined) {
              if (task_titles[i + 1] == 'duration hour') {
                return (
                  <div ref={el => { tableHeaders.current[i] = el }} key={i} className="h-full flex flex-col justify-center items-center whitespace-nowrap text-clip overflow-hidden text-sm">
                    <span className="text-sm text-gray-700 font-light capitalize ">
                      Duration
                    </span>
                    <span className="text-sm text-gray-700 font-light ">(hours)</span>
                  </div>
                )
              } else {
                return (
                  <div ref={el => { tableHeaders.current[i] = el }} key={i} className='h-full flex justify-center items-center whitespace-nowrap text-clip overflow-hidden text-sm'>
                    <span className="text-sm text-gray-700 font-light capitalize">{task_titles[i + 1]}</span>
                  </div>)
              }
            } else {
              return (
                <div ref={el => { tableHeaders.current[i] = el }} key={i} className="h-full flex justify-center items-center ">
                  <span className="text-sm font-light capitalize">
                    <Add />
                  </span>
                </div>
              )
            }
          
        })}


        {
          [0, 0, 0, 0, 0].map((element, index) => {
            return (
              <div ref={el => resizers.current[index] = el}
                key={index}
                className="absolute w-1 h-full cursor-e-resize col-resizer">
                <div className="w-[1px] h-full bg-gray-400"></div>
              </div>
            )
          })
        }

      </div>

    </>
  )
}

export default TaskTableHeader