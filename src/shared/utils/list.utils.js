export function sortListByParam(list, param) {
    return list.sort(sortByStringParam(param));
}

function sortByStringParam(param) {
    return (a, b) => { return a.get(param).localeCompare(b.get(param)) }
}