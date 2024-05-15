import React, { useState } from 'react'

function NumberCell({ number }) {
    const [writeMode, setWritemode] = useState(false)
    const [num, setnum] = useState(number.toString())
    const handleWritemode = () => {
        // console.log(num)
        setWritemode(true)
    }
    const handleKeypress = (e) => {
        if (e.keyCode === 13 && e.target.value) {
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
        setWritemode(false)
    }
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
                    className=' whitespace-nowrap capitalize text-clip overflow-hidden text-sm '
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