import axios from "../axious";

const getAllMovies = (id) => {
  return axios.get(`/api/movie/get-all-movies?id=${id}`, {
    movieID: id,
  });
};

const createNewMovieApi = (movieData) => {
  return axios.post("/api/movie/create-new-movie", {
    movie: movieData,
  });
};

const editMovieApi = (movieData) => {
  return axios.put("/api/movie/edit-movie", {
    movie: movieData,
  });
};

const deleteMovie = (movieID) => {
  return axios.delete("/api/movie/delete-movie", {
    data: {
      movieID: movieID,
    },
  });
};

const getAllCountries = (id) => {
  return axios.get(`/api/country/get-all-countries?id=${id}`, {
    countryID: id,
  });
};

const getAllGenresMovie = (id) => {
  return axios.get(`/api/get-all-moviegenres?id=${id}`, {
    movieID: id,
  });
};

const getAllActorsMovie = (id) => {
  return axios.get(`/api/get-all-movieactors?id=${id}`, {
    movieID: id,
  });
};

const getAllDirectorsMovie = (id) => {
  return axios.get(`/api/get-all-moviedirectors?id=${id}`, {
    movieID: id,
  });
};

const searchMovieApi = (keyword) => {
  return axios.get(`/api/movie/get-search-movie?keyword=${keyword}`, {
    keyword: keyword,
  });
};

const getCountMovies = () => {
  return axios.get(`/api/movies/count`);
};

export {
  getAllMovies,
  createNewMovieApi,
  editMovieApi,
  deleteMovie,
  getAllCountries,
  getAllGenresMovie,
  getAllActorsMovie,
  getAllDirectorsMovie,
  searchMovieApi,
  getCountMovies,
};
