import React, { useState,useEffect } from 'react'
import {setDuration,setDurationInHour} from '../../libs/features/tasksdataSlice' 
import { useDispatch,useSelector } from 'react-redux'

function NumberCell({task,isDurationinH, number }) {
    const [writeMode, setWritemode] = useState(false)
    const [num, setnum] = useState(number.toString())
    const tasks = useSelector((state) => state.tasksdata.value)
    const dispatch = useDispatch()
    const handleWritemode = () => {
        setWritemode(true)
    }
    const handleKeypress = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            if(isDurationinH){
                dispatch(setDurationInHour({taskId :task.id,newDurationInHValue : Number(num) }))
            }else{
                dispatch(setDuration({taskId :task.id,newDurationValue :Number(num) }))
            }
            setWritemode(false)
        }
    }
    const handleKeyup = (e)=>{
        if(e.which == 13){
            setWritemode(true)
        }
    }
    const handleNumber = (e) => {
        setnum(e.target.value)
    }
    const handleBlur = (e) => {
        if(isDurationinH){
            dispatch(setDurationInHour({taskId :task.id,newDurationInHValue : Number(num) }))
        }else{
            dispatch(setDuration({taskId :task.id,newDurationValue : Number(num) }))
        }
        setWritemode(false)
    }
    useEffect(()=>{
        setnum(number)
    },[tasks])
    if (!writeMode) {
        return (
            <>
                <span
                   onKeyDown={handleKeyup}
                    tabIndex={0}
                    onClick={handleWritemode}
                    className=' whitespace-nowrap capitalize text-clip overflow-hidden text-sm '>
                    {number}
                </span>
            </>
        )
    } else {
        return (
            <>
                <input
                    className='w-full whitespace-nowrap capitalize text-clip overflow-hidden text-sm '
                    onBlur={handleBlur}
                    onChange={handleNumber}
                    onKeyDown={handleKeypress}
                    value={num}
                    type="text"
                    name="number"
                    autoFocus
                    id="number" />
            </>
        )
    }
}

export default NumberCell