export function findMatches(searchInput, symbols) {
    if (!searchInput) return []

    return symbols.filter(({ symbol }) =>
        symbol
            .toLowerCase()
            .includes(searchInput.toLowerCase().replace(/[^a-z0-9]/g, '')),
    )
}

export function removeDuplicates(duplicates) {
    const flag = {}
    const unique = []

    duplicates.forEach(element => {
        if (!flag[element.symbol]) {
            flag[element.symbol] = true
            unique.push(element)
        }
    })

    return unique
}

export function getObjValueFromPath(obj, path) {
    return path.split('.').reduce((acc, cur) => acc && acc[cur], obj)
}
