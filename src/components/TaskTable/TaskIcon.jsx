import React from 'react'
import Directory from '../../assets/Directory'
import Document from '../../assets/Document'
import OpenFolder from '../../assets/OpenFolder'
function TaskIcon({isFolder,expandBtn}) {
  if(isFolder){
    if(expandBtn){
        return(
        <>
            <Directory />
        </>
        )
    }else{
        return(
            <>
                <OpenFolder />
            </>
            )
    }
  }else{
    return(
        <>
            <Document/>
        </>
        )
  }
}

export default TaskIcon