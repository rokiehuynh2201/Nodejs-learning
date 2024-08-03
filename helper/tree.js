const MakeTree = (arr,parentId="") => {
    const tree = []
    arr.forEach(item => {
        if(item.parent == parentId){
            const newItem = item;
            const children = MakeTree(arr,item._id)
            if(children.length > 0){
                newItem["children"] = children
            }
            tree.push(newItem)
        }
    })
    return tree;
}

module.exports = CreateTree = (arr,parent="") => {
    const tree = MakeTree(arr,parent)
    return tree;
}

