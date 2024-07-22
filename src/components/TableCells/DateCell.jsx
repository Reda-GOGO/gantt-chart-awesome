import React , {useState,useEffect} from 'react'
import {setStart} from '../../libs/features/tasksdataSlice' 
import { useDispatch,useSelector } from 'react-redux'
function DateCell({task, start_date }) {
    const [writeMode, setWritemode] = useState(false)
    const [date, setDate] = useState(start_date)
    const tasks = useSelector((state) => state.tasksdata.value)

    const dispatch = useDispatch()
    const handleWritemode = () => {
        setWritemode(true)
    }
    const handleKeypress = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            dispatch(setStart({taskId :task.id,newStartValue : date }))
            setWritemode(false)
        }
    }
    const handleTitle = (e) => {
        setDate(e.target.value)
    }
    const handleBlur = (e) => {
        dispatch(setStart({taskId :task.id,newStartValue : date }))
        setWritemode(false)
    }
    const handleKeyup = (e)=>{
        if(e.which == 13){
            setWritemode(true)
        }
    }
    useEffect(()=>{
        setDate(start_date)
    },[tasks])
    if (!writeMode) {
        return (
            <>
                <span
                    tabIndex={0}
                    onKeyUp={handleKeyup}
                    onClick={handleWritemode}
                className=' whitespace-nowrap capitalize text-clip overflow-hidden text-sm '>
                    {start_date}
                </span>
            </>
        )
    } else {
        return (
            <>
                <input
                    onBlur={handleBlur}
                    onChange={handleTitle}
                    onKeyDown={handleKeypress}
                    value={date}
                    type="date"
                    name="start"
                    autoFocus
                    id="start" />
            </>
        )
    }
}

export default DateCell