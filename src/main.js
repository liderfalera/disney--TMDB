const api_axios = axios.create({
  baseURL: `${API_URL}/${API_VERSION}/`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});


function createMovieElement(movie) {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');
  movieContainer.addEventListener('click', () => {
    location.hash = `#movie=${movie.id}`;
  });

  const movieImg = document.createElement('img');
  movieImg.classList.add('movie-img');
  movieImg.setAttribute('alt', movie.title);
  movieImg.setAttribute(
    'src',
    'https://image.tmdb.org/t/p/w300' + movie.poster_path,
  );

  movieContainer.appendChild(movieImg);

  return movieContainer;
}
function createCategoryElement(category) {
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-container');

  const categoryTitle = document.createElement('h3');
  categoryTitle.classList.add('category-title');
  categoryTitle.setAttribute('id', 'id' + category.id);
  categoryTitle.addEventListener('click', () => {
    location.hash = `#category=${category.id}-${category.name}`;
  });
  const categoryTitle_txt = document.createTextNode(category.name);

  categoryTitle.appendChild(categoryTitle_txt);
  categoryContainer.appendChild(categoryTitle);

  return categoryContainer;
}

async function getTrendingMoviesPreview() {
  const url_trend_movies_preview = 'trending/movie/day';
  const { data } = await api_axios(url_trend_movies_preview);

  const movies = data.results;

  //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

  trendingMoviesPreviewList.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    trendingMoviesPreviewList.appendChild(movieElement);
  });
}

async function getCategoriesPreview() {
  const url_trend_movies_preview = '/genre/movie/list';
  const { data } = await api_axios(url_trend_movies_preview);

  const categories = data.genres;

  //const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list'); It is already defined on nodes.js
  categoriesPreviewList.innerHTML = '';


  categories.forEach(category => {
    const categoryElement = createCategoryElement(category);
    categoriesPreviewList.appendChild(categoryElement);
  });
}

async function getMoviesByCategory(id) {
  const url_trend_movies_preview = 'discover/movie';
  const { data } = await api_axios(url_trend_movies_preview, {
    params: {
      with_genres: id,
    }
  });

  const movies = data.results;

  //const genericSection = document.querySelector('#genericList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });
}

async function getMoviesBySearch(query) {
  const url_trend_movies_preview = 'search/movie';
  const { data } = await api_axios(url_trend_movies_preview, {
    params: {
      query,
    }
  });

  const movies = data.results;

  //const genericSection = document.querySelector('#genericList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });
}

async function getTrendingMovies() {
  const url_trend_movies_preview = 'trending/movie/day';
  const { data } = await api_axios(url_trend_movies_preview);

  const movies = data.results;

  //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });
}

async function getMovieById(id) {
  const url_movies_by_id = 'movie/' + id;
  const { data: movie } = await api_axios(url_movies_by_id);

  //Add the main movie img
  const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;



  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);

  movieDetailCategoriesList.innerHTML = '';

  movie.genres.forEach(category => {
    const categoryElement = createCategoryElement(category);
    movieDetailCategoriesList.appendChild(categoryElement);
  });

  getRelatedMoviesById(id);

}

async function getRelatedMoviesById(id) {

  const url_related_movies_by_id = `movie/${id}/similar`;
  const { data } = await api_axios(url_related_movies_by_id);

  const relatedMovies = data.results;

  relatedMoviesContainer.innerHTML = '';

  relatedMovies.forEach(relatedMovie => {
    const relatedMovieElement = createMovieElement(relatedMovie);
    relatedMoviesContainer.appendChild(relatedMovieElement);
  });

}






//NO-AXIOS example.
{// async function getTrendingMoviesPreview() {
  //   const url_trend_movies_preview = `${API_URL}/${API_VERSION}/trending/movie/day?${CONCAT_API_KEY}`;

  //   const res = await fetch(url_trend_movies_preview);
  //   const data = await res.json();

  //   const movies = data.results;

  //   const trendingPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

  //   movies.forEach(movie => {
  //     const movieElement = createMovieElement(movie);
  //     trendingPreviewContainer.appendChild(movieElement);
  //   });
  // }
}