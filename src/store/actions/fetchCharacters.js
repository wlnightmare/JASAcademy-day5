export const fetchCharacters = ( {search,page = 1, sort="Alive"} = {}) => dispatch => {
fetch (`https://rickandmortyapi.com/api/character/?page=${page}&name=${search}&status=${sort}`)
  .then((res) => res.json())
  .then((data) => {
    dispatch ({
      type: 'characters/set',
      payload: data.results
    })
    dispatch ({
      type: 'characters/pages',
      payload: {
        page: data.info.page,
        total_pages: Math.min(data.info.pages, 42)
      }
    })
  })
}