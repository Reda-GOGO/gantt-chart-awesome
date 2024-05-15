import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setzoomType } from '../../libs/features/zoomtypeSlice'

function ControlPanel() {
  const [options, setOptions] = useState([
    'none',
    'years',
    'months',
    'weeks',
    'days',
    'hours'
  ])
  const dispatch = useDispatch()
  const handleChange = (e) => {
    // console.log(e.target.value)
    dispatch(setzoomType(e.target.value))

  }
  return (
    <div className="p-2 max-w-[1300px] w-full h-20 bg-white border border-t-0 border-solid border-gray-400">
      <select
        onChange={handleChange}
        className="w-[100px] h-10 flex justify-center items-center text-sm capitalize"
        defaultValue={options[0]}
        name="datezoom_value"
        id="datezoom_value"
        aria-label="datezoom_value">
        {
          options.map((option, i) => {
            if (option == 'none') {
              return (
                <option 
                className=""
                key={i} 
                value={option} disabled hidden>zoom to :</option>
              )
            } else {
              return (
                <option 
                className="capitalize"
                key={i} value={option}>{option}</option>
              )
            }
          })
        }
      </select>
    </div>
  )
}

export default ControlPanel