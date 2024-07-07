import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function TaskChartBody() {
    const taskData = useSelector((state) => state.tasksdata.value)
    const expandLines = useSelector((state) => state.expandLines.value)
    const scrollableLeft = useSelector(state => state.scrollableLeft.value);
    const [selectIndex, setselectIndex] = useState(0);
    const widthCell = useSelector((state) => state.widthCell.value);
    const totalCell = useSelector((state) => state.totalCell.value);
    const currenttotal = useSelector((state) => state.currenttotalCell.value);
    const leftCell = useSelector((state) => state.leftCell.value);
    useEffect(() => {
        setselectIndex(Math.floor(scrollableLeft / widthCell))
    }, [scrollableLeft, widthCell])
    return (
        <>
            {
                taskData.map((task) => {
                    return (
                        <div key={task.id}
                            style={{ minWidth: widthCell * currenttotal, display: !expandLines[task.id] ? 'flex' : 'none' }}
                            className="relative flex w-full h-6 border-b-[1px] border-gray-300 ">
                            {Array(totalCell).fill(0).map((_, i) => {
                                if (i + selectIndex < leftCell.length) {
                                    return (
                                        <div key={i} className="absolute h-full border-r-[1px] border-gray-300 "
                                            style={{ width: widthCell, left: leftCell[i + selectIndex] }}>

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