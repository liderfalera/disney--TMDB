let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
  location.hash = `#search=${searchFormInput.value}`;
})

trendingBtn.addEventListener('click', () => {
  location.hash = "#trends=";
})

arrowBtn.addEventListener('click', () => {
  history.back();
  //location.hash = "#home";
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll);

function navigator() {
  console.log({ location });
  //Cada vez que se cambie a alguna página, borrar la variable infinite scroll.
  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  //Llega aquí y en alguna de esas posiblemente se agregue un event de 'scroll'
  if (location.hash.startsWith('#trends')) {
    goTrendsPage()
  } else if (location.hash.startsWith('#search=')) {
    goSearch()
  } else if (location.hash.startsWith('#movie=')) {
    goMovieDetail();
  } else if (location.hash.startsWith('#category=')) {
    goCategoriesPage();
  } else {
    goHome();
  }
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  //Por lo que aquí lo quitamos y después 
  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, { passive: false });
  }

}

function goHome() {
  //Delete a big header container.
  headerSection.classList.remove('header-container--long');

  //Delete styles of header section background.
  headerSection.style.background = '';

  //Delete the arrow button
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');

  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  likedMoviesSection.classList.remove('inactive');

  categoriesPreviewSection.classList.remove('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');


  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
}
function goCategoriesPage() {
  console.log('ESTAMOS EN CATEGORIES!!')
  //Delete a big header container.
  headerSection.classList.remove('header-container--long');

  //Delete styles of header section background.
  headerSection.style.background = '';

  //Delete the arrow button
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');

  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, categoryData] = location.hash.split('='); // [#category,id-name]
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = decodeURI(categoryName);
  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function goMovieDetail() {
  console.log('ESTAMOS EN DETALLE DE PELÍCULAS');

  //Delete a big header container.
  headerSection.classList.add('header-container--long');

  //Delete styles of header section background.
  //headerSection.style.background = '';

  //Delete the arrow button
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');

  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');

  const [_, movieId] = location.hash.split('='); // [#movie,'123']

  getMovieById(movieId);

}

function goSearch() {
  console.log('ESTAMOS EN VISTA SEARCH!!')

  //Delete a big header container.
  headerSection.classList.remove('header-container--long');

  //Delete styles of header section background.
  headerSection.style.background = '';

  //Delete the arrow button
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');

  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');

  categoriesPreviewSection.classList.add('inactive');
  likedMoviesSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  const [_, query] = location.hash.split('='); // [#search,input]

  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function goTrendsPage() {
  console.log('ESTAMOS EN TRENDS!!');

  //Delete a big header container.
  headerSection.classList.remove('header-container--long');

  //Delete styles of header section background.
  headerSection.style.background = '';

  //Delete the arrow button
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');

  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');

  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');

  categoriesPreviewSection.classList.add('inactive');

  likedMoviesSection.classList.add('inactive');

  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');

  headerCategoryTitle.innerHTML = 'Tendencias';
  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
}