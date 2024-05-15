import { useState } from 'react'

import TaskIcon from '../TaskTable/TaskIcon'
import dfsOrder from '../../utils/dfsOrder'
function TitleCell({ task, relations, depth, expands, setExpands, expandBtn, setExpandBtn }) {
    const [writeMode, setWritemode] = useState(false)
    const [title, setTitle] = useState(task.task_name)
    const arr = Array(depth[task.id] - 1).fill(0)
    const handleWritemode = () => {
        setWritemode(true)
    }
    const handleKeypress = (e)=>{
        if(e.keyCode === 13 && e.target.value){
            setWritemode(false)
        }
    }
    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleBlur = (e)=>{
        setWritemode(false)
    }
    const handleKeyup = (e)=>{
        if(e.which == 13){
            setWritemode(true)
        }
    }
    const handleChildrows = (e, parentNodeId) => {

        setExpandBtn(prevState => ({ ...prevState, [parentNodeId]: !prevState[parentNodeId] }))
        let orders = dfsOrder(task, relations, parentNodeId)
        let hideenNode = []
        let newOrder = []

        orders.map((order) => {
            if (order != parentNodeId) {
                if (relations[order].length != 0 && expandBtn[order]) {
                    dfsOrder(task, relations, order).map((node) => {
                        if (node != order) {
                            hideenNode.push(node)
                        }
                    })
                }
            }
        })
        orders.map((order) => {
            if (!hideenNode.includes(order) && order != parentNodeId) {
                newOrder.push(order)
            }
        })
        newOrder.map((order) => {
            setExpands(prevState => {
                return { ...prevState, [order]: !prevState[order] }
            })
        })
        //  set expand state to hide/show rows *** need to finished 

    }


    return (
        <>
            <div 
            
            className="pl-2 z-0 h-6 flex flex-nowrap gap-1 items-center overflow-hidden">
                {
                    relations[task.id].length != 0 ?
                        <button
                            onClick={e => handleChildrows(e, task.id)}
                            className="min-w-3 h-3 flex justify-center text-sm items-center bg-gray-200 border-[1px] border-gray-800" >
                            {expandBtn[task.id] ? '+' : '-'}
                        </button>
                        :
                        <div className="min-w-3 h-3" > </div>
                }
                {
                    arr.map((el, i) => {
                        return (<div key={i} className="min-w-6 h-6 flex border-r border-gray-500 "></div>)
                    })
                }
                <span className='flex flex-wrap pl-2'>

                    <TaskIcon isFolder={relations[task.id].length != 0} expandBtn={expandBtn[task.id]} />
                </span>
                {
                    !writeMode ? (
                    <span 
                    tabIndex={0}
                    onKeyUp={handleKeyup}
                    onClick={handleWritemode}
                        style={relations[task.id].length != 0 ? { fontWeight: 600 } : { fontWeight: 400 }}
                        className=' whitespace-nowrap capitalize text-clip overflow-hidden text-sm '>
                        {task.task_name}
                    </span>
                    ) : (
                        <input
                        className='pl-1 whitespace-nowrap capitalize text-clip overflow-hidden text-sm '
                        onBlur={handleBlur}
                        onChange={handleTitle}
                        onKeyDown={handleKeypress}
                        value={title}
                        type="text" 
                        name="title" 
                        autoFocus
                        id="title" />
                    )
                }
            </div>

        </>
    )
}

export default TitleCell






