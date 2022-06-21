export function getGenres(g) {
    if (g[0] === 16) return 'Comedy'
    if (g[0] === 28) return 'Action'
    if (g[0] === 53) return 'Detective'
    if (g[0] === 878) return 'Fantasy'
    if (g[0] === 18) return 'Thriller'
    if (g[0] === 27) return 'Horror'
}