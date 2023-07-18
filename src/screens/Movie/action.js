import { API_KEY, BASE_URL } from "../../helper";

//actions
export const MOVIE_LOADING = 'MOVIE_LOADING';
export const GET_MOVIE_LIST = 'GET_MOVIE_LIST';
export const SEARCH_MOVIE_LIST = 'SEARCH_MOVIE_LIST';
export const GET_MOVIE_DETAIL = 'GET_MOVIE_DETAIL';

//initializing axios
const axios = require("axios").default;

const listconfig = async () => {
  const headers = {
      'Content-Type': 'application/json',
  };
  return headers;
}

export const getMovieList = (page) => {
  const params = {
    page: page,
    api_key: API_KEY,
  };
  return async dispatch => {
    dispatch({
      type: MOVIE_LOADING
    });
    axios.get(
      BASE_URL + 'movie/popular',
      {
        params,
        headers: await listconfig(),
      }
    ).then(
      res => {
        dispatch({
          type: GET_MOVIE_LIST,
          payload: res.data,
        })
      }
    ).catch(
      err => {
        console.log('Unable to fetch', err);
      }
    );
  }
}

export const searchMovieList = (query) => {
  const params = {
    query: query,
    api_key: API_KEY,
  };
  return async dispatch => {
    dispatch({
      type: MOVIE_LOADING
    });
    axios.get(
      BASE_URL + 'search/movie',
      {
        params,
        headers: await listconfig(),
      }
    ).then(
      res => {
        dispatch({
          type: SEARCH_MOVIE_LIST,
          payload: res.data,
        })
      }
    ).catch(
      err => {
        console.log('Unable to fetch', err);
      }
    );
  }
}

export const movieDetail = (movieId) => {
  const params = {
    api_key: API_KEY,
    append_to_response: 'credits,similar',
  };
  return async dispatch => {
    dispatch({
      type: MOVIE_LOADING
    });
    axios.get(
      BASE_URL + `/movie/${movieId}`,
      {
        params,
        headers: await listconfig(),
      }
    ).then(
      res => {
        dispatch({
          type: GET_MOVIE_DETAIL,
          payload: res.data,
        })
      }
    ).catch(
      err => {
        console.log('Unable to fetch', err);
      }
    );
  }
}