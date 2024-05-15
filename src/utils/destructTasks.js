
function destructTasks(tasks) {
    let newTasks = []
    tasks.map((task)=>{
        let {parent,...rest} = task
        newTasks.push(rest)
    })
    return newTasks
}

export default destructTasks