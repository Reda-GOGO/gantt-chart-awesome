import React from 'react'
import { useSelector } from 'react-redux'

function TaskChartBody({ widthCell, totalCell }) {
    const taskData = useSelector((state) => state.tasksdata.value)
    return (
        <>
            {taskData.map((task) => {
                return (
                    <div key={task.id} 
                    style={{minWidth : widthCell * totalCell}}
                    className="flex w-full h-6 border-b-[1px] border-gray-300 ">
                        {Array(totalCell).fill(0).map((_) => {
                            return (
                                <div className="h-full border-r-[1px] border-gray-300 "
                                style={{minWidth : widthCell}}>

                                </div>
                            )
                        })
                        }
                    </div>
                )
            })}
        </>
    )
}

export default TaskChartBody