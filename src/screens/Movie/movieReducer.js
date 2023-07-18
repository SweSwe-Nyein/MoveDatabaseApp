import { GET_MOVIE_DETAIL, GET_MOVIE_LIST, MOVIE_LOADING, SEARCH_MOVIE_LIST } from "./action";

const initialState = {
  movieList: {},
  searchList: {},
  detail: {},
  loading: false,
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE_LOADING:
      return {...state, loading: true};
      case GET_MOVIE_LIST:
        return { ...state, movieList: action.payload || {}, loading: false };
      case SEARCH_MOVIE_LIST:
        return { ...state, searchList: action.payload || {}, loading: false };
      case GET_MOVIE_DETAIL:
        return { ...state, detail: action.payload || {}, loading: false}
      default:
        return state;
  }
};