import React from 'react'
import { useSelector } from 'react-redux'

function TaskChartBody({ widthCell, totalCell,currenttotal,leftCell,selectIndex }) {
    const taskData = useSelector((state) => state.tasksdata.value)
    const expandLines = useSelector((state)=>state.expandLines.value)
    return (
        <>
            {
                taskData.map((task) => {
                    return (
                        <div key={task.id}
                            style={{ minWidth: widthCell * currenttotal , display : !expandLines[task.id] ? 'flex' : 'none' }}
                            className="relative flex w-full h-6 border-b-[1px] border-gray-300 ">
                            {Array(totalCell).fill(0).map((_, i) => {
                                if(i + selectIndex < leftCell.length){
                                    return (
                                        <div key={i} className="absolute h-full border-r-[1px] border-gray-300 "
                                            style={{ width: widthCell ,left : leftCell[i + selectIndex] }}>
    
                                        </div>
                                    )
                                }
                            })
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default TaskChartBody