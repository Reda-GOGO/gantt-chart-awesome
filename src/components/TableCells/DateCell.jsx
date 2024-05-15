import React , {useState} from 'react'

function DateCell({ start_date }) {
    const [writeMode, setWritemode] = useState(false)
    const [date, setDate] = useState(start_date)
    const handleWritemode = () => {
        // console.log(date)
        setWritemode(true)
    }
    const handleKeypress = (e) => {
        if (e.keyCode === 13 && e.target.value) {
            setWritemode(false)
        }
    }
    const handleTitle = (e) => {
        setDate(e.target.value)
    }
    const handleBlur = (e) => {
        setWritemode(false)
    }
    const handleKeyup = (e)=>{
        if(e.which == 13){
            setWritemode(true)
        }
    }
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