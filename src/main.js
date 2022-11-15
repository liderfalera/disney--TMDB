// * DATA
const api_axios = axios.create({
  baseURL: `${API_URL}/${API_VERSION}/`,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
});

function likedMovieList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  let movies;
  if (item) {
    movies = item;
  } else {
    movies = {}
  }

  return movies;
}

function likeMovie(movie) {

  const likedMovies = likedMovieList();

  console.log(likedMovies);

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}

// * UTILS
const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imgUrl = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', imgUrl);
    }
  });
});

function createMovieElement(movie) {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');

  const movieImg = document.createElement('img');
  movieImg.classList.add('movie-img');
  movieImg.setAttribute('alt', movie.title);

  movieImg.setAttribute(
    'data-img',
    'https://image.tmdb.org/t/p/w300' + movie.poster_path,
  );

  movieImg.addEventListener('error', () => {
    movieImg.setAttribute('src', `https://via.placeholder.com/300x450/73558b/ffffff?text=${movie.title}`)
  })

  movieImg.addEventListener('click', () => {
    location.hash = `#movie=${movie.id}`;
  });

  const movieBtn = document.createElement('button');
  movieBtn.classList.add('movie-btn');
  //** If movie.id exists then add the movie-btn--liked */
  likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
  movieBtn.addEventListener('click', () => {
    movieBtn.classList.toggle('movie-btn--liked');
    //DEBEMOS AGREGAR LA PELICULA A LOCAL STORAGE
    likeMovie(movie);
  })

  lazyLoader.observe(movieImg);
  movieContainer.appendChild(movieImg);
  movieContainer.appendChild(movieBtn);
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
  maxPage = data.total_pages;
  //const genericSection = document.querySelector('#genericList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });
}

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const url_trend_movies_preview = 'discover/movie';
      const { data } = await api_axios(url_trend_movies_preview, {
        params: {
          with_genres: id,
          page,
        }
      });

      const movies = data.results;

      //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

      movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        genericSection.appendChild(movieElement);
      });

    }
  }
  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);
}

async function getMoviesBySearch(query) {
  const url_trend_movies_preview = 'search/movie';
  const { data } = await api_axios(url_trend_movies_preview, {
    params: {
      query,
    }
  });

  const movies = data.results;
  maxPage = data.total_pages;
  console.log(maxPage);

  //const genericSection = document.querySelector('#genericList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const url_trend_movies_preview = 'search/movie';
      const { data } = await api_axios(url_trend_movies_preview, {
        params: {
          query,
          page,
        }
      });

      const movies = data.results;

      //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

      movies.forEach(movie => {
        const movieElement = createMovieElement(movie);
        genericSection.appendChild(movieElement);
      });

    }
  }
  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);
}

async function getTrendingMovies() {
  const url_trend_movies_preview = 'trending/movie/day';
  const { data } = await api_axios(url_trend_movies_preview);

  const movies = data.results;
  maxPage = data.total_pages;

  //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

  genericSection.innerHTML = '';

  movies.forEach(movie => {
    const movieElement = createMovieElement(movie);
    genericSection.appendChild(movieElement);
  });

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);
}

async function getPaginatedTrendingMovies() {
  const {
    scrollTop,
    scrollHeight,
    clientHeight
  } = document.documentElement;

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const url_trend_movies_preview = 'trending/movie/day';
    const { data } = await api_axios(url_trend_movies_preview, {
      params: {
        page,
      }
    });

    const movies = data.results;

    //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList'); It is already defined on nodes.js

    movies.forEach(movie => {
      const movieElement = createMovieElement(movie);
      genericSection.appendChild(movieElement);
    });

  }

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'Cargar más';
  // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
  // genericSection.appendChild(btnLoadMore);
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

function getLikedMovies() {
  const likedMovies = likedMovieList();
  const moviesArray = Object.values(likedMovies);

  likedMoviesListArticle.innerHTML = '';
  moviesArray.forEach(movie => {
    const movieElement = createMovieElement(movie);
    likedMoviesListArticle.appendChild(movieElement);
  })
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