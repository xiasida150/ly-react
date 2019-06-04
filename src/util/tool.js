import { routes } from './../pages/Layout/routers'


const sortFunction = (a, b) => a.menuSort - b.menuSort

export const mergeMenu = function (data, para) {
    let cloneData = JSON.parse(JSON.stringify(data))
    cloneData = cloneData.sort(sortFunction)
    cloneData = cloneData.map(item => {
        routes.map(route => {
            if (route.feUrl && route.menuName === item.menuName) {
                item = { ...route, ...item }
            }
        })
        return item
    })
    return cloneData.filter(father => {
        let child = cloneData.filter(child => {
            return father.id === child[para]
        })
        child.length && (father.children = child);
        return father[para] === "000000000000000000000000000000000000"
    })
};



