export function findMatches(searchInput, symbols) {
    if (!searchInput) return []

    return symbols.filter(({ symbol }) =>
        symbol
            .toLowerCase()
            .includes(searchInput.toLowerCase().replace(/[^a-z0-9]/g, '')),
    )
}
