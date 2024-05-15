

function dfsOrder(task,relations,parentNodeId) {
    var marked = Array(task.length).fill(false);
    var stack = [];
    let node = parentNodeId
    let orders = []
    // DFS 
    stack.push(node)

    while (stack.length != 0) {

        node = stack.pop()
        if (!marked[node]) {
            marked[node] = true
            orders.push(node)
        }
        // sort nodes by id for now *
        relations[node].sort((a, b) => {
            return b - a
        })
        for (var i = 0; i < relations[node].length; i++) {
            stack.push(relations[node][i])
        }
    }

    return orders
}

export default dfsOrder