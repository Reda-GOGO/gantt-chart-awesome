import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { months, days } from '../../data/calendarData'

function TaskChartHeader() {
    const zoomType = useSelector(state => state.zoomtype.value)
    const tasks = useSelector(state => state.tasksdata.value)
    const timeline_area = useRef()

    const subtimeline_value = useRef([])
    const supertimeline_value = useRef([])
    const lastDate = new Date(tasks[tasks.length - 1].start)
    lastDate.setDate(lastDate.getDate() + tasks[tasks.length - 1].duration)
    const rangeDate = (lastDate - new Date(tasks[0].start)) / (60 * 1000 * 60 * 24)
    const Cells = Array(Math.round((rangeDate / 30)) + 2).fill(0)
    const [timelineRange, setTimelineRange] = useState(0)
    let start = new Date(tasks[0].start).getMonth() - 1

    useEffect(() => {

        setTimelineRange(timeline_area.current.offsetWidth / (Cells.length * 80))
        if (timeline_area.current.offsetWidth / (Cells.length * 80) > 1) {
            timeline_area.current.style.minWidth = (timeline_area.current.offsetWidth / Cells.length) + "px"
            subtimeline_value.current.map((element) => {
                element.style.minWidth = (timeline_area.current.offsetWidth / Cells.length) + "px"
            })
        } else {
            timeline_area.current.style.minWidth = (Cells.length * 80) + "px"
            subtimeline_value.current.map((element) => {
                element.style.minWidth = "80px"
            })

        }
        console.log(timeline_area.current.offsetWidth / (Cells.length * 80))





    }, [])
    return (
        <>
            <div
                ref={timeline_area}
                className="relative w-full h-20 flex flex-col ">
                <div className="flex min-w-full h-10 ">
                    <div className="w-full h-full flex justify-center items-center font-extralight text-sm">
                        2024
                    </div>
                </div>
                <div className="flex w-full h-10 ">
                    {
                        Cells.map((_, i) => {

                            return (
                                <div
                                    ref={el => subtimeline_value.current[i] = el}
                                    key={i}
                                    className="font-extralight h-full  text-sm border-b-[1px] border-t-[1px] border-r-[1px] border-gray-400 flex justify-center items-center">
                                    {months[(i + start) % 12]}
                                </div>
                            )

                        })
                    }
                </div>
            </div>
        </>
    )
}

export default TaskChartHeader