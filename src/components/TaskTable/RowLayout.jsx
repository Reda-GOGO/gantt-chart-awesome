import React, { useState, useRef, useEffect } from 'react'
import TitleCell from '../TableCells/TitleCell'
import { useDispatch, useSelector } from 'react-redux'
import { setexpandLines } from '../../libs/features/expandLinesSlice'
import DateCell from '../TableCells/DateCell'
import NumberCell from '../TableCells/NumberCell'
function RowLayout({ task, relations, depth, expands, setExpands, expandBtn, setExpandBtn }) {
    const rows = useRef([])
    const widthCols = useSelector((state) => state.columnswidth.value)
    const expandLines = useSelector((state)=>state.expandLines.value)
    const dispatch = useDispatch()

    // const [bold,setBold] = useState()
    const [expandST, setExpandST] = useState(expands)
    useEffect(() => {
        widthCols.map((width, i) => {
            rows.current[task.id].childNodes[i].style.minWidth = width + "px"
        })
        if (expands != expandST) {
            setExpandST(expands)
            dispatch(setexpandLines(expands))
        }
        if (expandLines[task.id]) {
            if (rows.current[task.id]) {
                rows.current[task.id].style.display = 'none'
            }
        } else {
            if (rows.current[task.id]) {
                rows.current[task.id].style.display = 'flex'
            }
        }

    }, [expandLines, expandBtn, rows, widthCols])
    // border-b-[1px] border-gray-400
    return (
        <>
            <div
                key={task.id}
                className="relative w-full h-6  flex flex-row  hover:bg-amber-200"
                ref={el => rows.current[task.id] = el}
                draggable
            >
                <div className="pl-2 z-0 h-6 flex flex-nowrap gap-1 items-center overflow-hidden">
                    <TitleCell
                        key={task.id}
                        task={task}
                        relations={relations}
                        depth={depth}
                        expands={expands}
                        setExpands={setExpands}
                        expandBtn={expandBtn}
                        setExpandBtn={setExpandBtn} />
                </div>
                <div
                    style={relations[task.id].length != 0 ? { fontWeight: 600 } : { fontWeight: 400 }}
                    className="h-full z-10 flex justify-center items-center  whitespace-nowrap text-clip overflow-hidden text-sm ">
                    <DateCell task={task} start_date={task.start} />
                </div>
                <div
                    style={relations[task.id].length != 0 ? { fontWeight: 600 } : { fontWeight: 400 }}
                    className="h-full flex justify-center items-center  whitespace-nowrap text-clip overflow-hidden text-sm ">
                    <NumberCell task={task} isDurationinH={false}  number={task.duration} />
                </div>
                <div
                    style={relations[task.id].length != 0 ? { fontWeight: 600 } : { fontWeight: 400 }}
                    className="h-full flex justify-center items-center  whitespace-nowrap text-clip overflow-hidden text-sm ">
                    <NumberCell task={task} isDurationinH={true}  number={task.duration * 24} />
                </div>
                <div className="h-full "></div>
                <div className="h-full "></div>

            </div>
        </>
    )
}

export default RowLayout