const sortFunction = (a, b) => a.menuSort - b.menuSort

export const meshObjByPara = function (data, para) {

    let cloneData = JSON.parse(JSON.stringify(data))
    cloneData = cloneData.sort(sortFunction)
    return cloneData.filter(father => {
        let child = cloneData.filter(child => {
            return father.id === child[para]
        })
        child.length && (father.children = child);
        return father[para] === "000000000000000000000000000000000000"
    })
};



