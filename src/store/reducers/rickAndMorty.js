const initState = {
  pages: {
    page: 1,
    total_pages: 0,
  },
  characters: [],
  search: '',
  sortBy: '',
}

export function rickAndMorty(state = initState, action){
  const newState = {...state}
  switch (action.type){
    case 'characters/set':
      newState.characters = action.payload;
      break;
    case 'characters/sortBy':
      newState.sortBy = action.payload;
      break;
    case 'characters/search':
      newState.search = action.payload;
      break;
    case 'characters/pages':
      newState.pages = action.payload;
      break;
    default:
      return state
  }
  return newState
}