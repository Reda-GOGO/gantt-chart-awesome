import React ,{useState,useEffect} from 'react'
import RowLayout from './RowLayout'
import defineRelation from '../../utils/defineRelation'
import defineDepth from '../../utils/defineDepth'


function TableRows({ tasks }) {
  const [datas, setDatas] = useState(tasks)
  const relations = defineRelation(tasks)
  const [expands, setExpands] = useState({})
  const [expandBtn, setExpandBtn] = useState({})
  const depth = defineDepth(relations, tasks.length + 1)
  var level = Array(tasks.length);
  var marked = Array(tasks.length).fill(false);
  var stack = [];
  let node = 0
  let orders = []
  stack.push(node)
  // DFS 
  if (tasks !== datas) {
    setDatas(tasks)
  }
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

  useEffect(() => {
    orders.map((order) => {
      if (order != 0) {  
        setExpands(prevState => ({ ...prevState, [order]: false }))
        setExpandBtn(prevState => ({ ...prevState, [order]: false }))
      }
    })
  }, [])


  return (
    <>
      {
        orders.map((order) => {
          if (order != 0) {

            return (
              <RowLayout
                key={order}
                task={datas.find((task) => task.id == order)}
                relations={relations}
                depth={depth}
                expands={expands}
                setExpands={setExpands}
                expandBtn={expandBtn}
                setExpandBtn={setExpandBtn}
              />
            )
          }
        })
      }
    </>
  )

}

export default TableRows