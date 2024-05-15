import React from 'react'
import Container from './Container.jsx'
import ControlPanel from './ControlPanel/ControlPanel.jsx'

function Gantt() {
    return (
        <>
            <div
                className="flex flex-col w-full justify-center items-center p-6 bg-blue-400 max-[500px]:p-1"
            >
                <Container />
                <ControlPanel />
            </div> 
        </>
    )
}

export default Gantt