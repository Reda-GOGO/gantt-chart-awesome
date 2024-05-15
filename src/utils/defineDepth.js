function defineDepth(relations, V) {
    // BFS 
    var node = 0  // root of the tree graph is 0 
    var level = Array(V);
    var marked = Array(V).fill(false);
    var que = [];

    // enqueue element x 
    que.push(node);

    // initialize level of source node to 0 
    level[node] = 0;

    // marked it as visited 
    marked[node] = true;
    while (que.length > 0) {
        // get the first element of queue 
        node = que[0];

        // dequeue element 
        que.shift();

        // traverse neighbors of node node 
        for (var i = 0; i < relations[node].length; i++) {
            // b is neighbor of node node 
            var b = relations[node][i];

            // if b is not marked already 
            if (!marked[b]) {

                // enqueue b in queue 
                que.push(b);

                // level of b is level of node + 1 
                level[b] = level[node] + 1;

                // mark b 
                marked[b] = true;
            }
        }
    }
    return level

}
export default defineDepth