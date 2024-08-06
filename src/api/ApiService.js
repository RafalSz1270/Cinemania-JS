import axios from 'axios';

export const API_KEY = '9d709850c7590845ffb60644b29d6f51';
const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING_END_POINT = 'trending/movie/'; // end-point  
const UPCOMING_END_POINT = 'movie/upcoming'; // end-point  
const SEARCH_END_POINT = 'search/movie'; // end-point  
const DETAILS_END_POINT = 'movie/'; // end-point
const GENRES_END_POINT = 'genre/movie/list'; 

//-----------------------------------------------------------------------з
//-----------------------------------------------------------------------'
export async function getMoviesTrending(timeWindow = 'week', page = 1) {
  try {
    return await axios(
      `${BASE_URL}${TRENDING_END_POINT}${timeWindow}?api_key=${API_KEY}`,
      {
        params: {
          //api_key: API_KEY,
          page: page,
        },
      }
    );
  } catch (error) {
    handlerError(error);
  }
}
//-----------------------------------------------------------------------
export async function getMoviesUpcoming(page = 1) {
  try {
    return await axios(`${BASE_URL}${UPCOMING_END_POINT}?api_key=${API_KEY}`, {
      params: {
        //api_key: API_KEY,
        page: page,
      },
    });
  } catch (error) {
    handlerError(error);
  }
}
//-----------------------------------------------------------------------
export async function getMoviesBySearch(query = '', page = 1, year = '') {
  try {
    return await axios(`${BASE_URL}${SEARCH_END_POINT}?api_key=${API_KEY}`, {
      params: {
        //api_key: API_KEY,
        page: page,
        query: query,
        year: year,
      },
    });
  } catch (error) {
    handlerError(error);
  }
}

//-----------------------------------------------------------------------
export async function getMoviesDetails(movie_id) {
  try {
    return await axios(
      `${BASE_URL}${DETAILS_END_POINT}${movie_id}?api_key=${API_KEY}`,
      {
        params: {
          //api_key: API_KEY,
          //movie_id: movie_id,
        },
      }
    );
  } catch (error) {
    handlerError(error);
  }
}
//-----------------------------------------------------------------
export async function getMoviesVideos(movie_id) {
  try {
    return await axios(
      `${BASE_URL}${DETAILS_END_POINT}${movie_id}/videos?api_key=${API_KEY}`,
      {
        params: {
          //api_key: API_KEY,
        },
      }
    );
  } catch (error) {
    handlerError(error);
  }
}
//-----------------------------------------------------------------
export async function getMoviesGenres() {
  try {
    return await axios(`${BASE_URL}${GENRES_END_POINT}?api_key=${API_KEY}`, {
      params: {
        //api_key: API_KEY,
      },
    });
  } catch (error) {
    handlerError(error);
  }
}

//-----------------------------------------------------------------------
export function handlerError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);

  //alert('there`s something wrong, please see the messages in the console');
}


export const arrayOfGenres = (await getMoviesGenres()).data.genres;

