
function defineRelation(taskData) {
    let relation = {}
    let rootChilds = taskData.filter((task) => {
        return task.parent == 0
    })
    relation[0] = rootChilds.map((ts) => { return ts.id })
    taskData.map((task) => {
        let childs = taskData.filter((ts) => {
            return ts.parent == task.id
        })

        relation[task.id] = childs.map((child) => { return child.id })
    })
    return relation

}

export default defineRelation