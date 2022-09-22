export function findMatches(searchInput, symbols) {
    if (!searchInput) return []

    return symbols.filter(({ symbol }) =>
        symbol
            .toLowerCase()
            .includes(searchInput.toLowerCase().replace(/[^a-z0-9]/g, '')),
    )
}

export const removeDuplicates = duplicates => {
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
