
function sortdataIndex(datas) {
    
    const lists = Object.keys(datas[0]).map((key)=>{
        return key.replace('_',' ')
    })
    return lists
}

export default sortdataIndex