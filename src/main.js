'use strict';
import fetchImages from './js/pixabay-api.js';
import {
  message,
  messageInfo,
  renderData,
  galleryShow,
} from './js/render-functions.js';

const form = document.querySelector('.search-image-form'),
  searchInputField = document.querySelector('.search-img'),
  gallerySite = document.querySelector('.gallery'),
  loaderImages = document.querySelector('.loader'),
  loadMoreBtn = document.querySelector('.load-more'),
  imagePerPage = 15; // кол-во запрашиваемых изображений с сервера для одной стриницы

let searchText = '', // Переменная хранения поискового запроса пользователя
  currentPage = 1, // текущая страница
  totalPages = 0; // кол-во страниц с результатами поиска

form.addEventListener('submit', checkInput);

async function checkInput(e) {
  e.preventDefault();
  searchText = searchInputField.value.trim(); // Поисковый запрос пользователя
  form.reset(); // Очистка поля ввода поискового запроса
  if (!searchText.length) {
    message('Sorry, search query cannot be empty!'); // Если поле поиска пустое
  } else {
    currentPage = 1; // Новый поиск должен получать результаты с первой страницы
    gallerySite.innerHTML = ''; // Удаление текущей галлереи изображений с сайта
    loadMoreBtn.style.display = 'none'; // Удалить кнопку 'Load more'
    loaderImages.style.display = 'block'; // Отоброзить прогресс загрузки результатов поиска
    try {
      const { totalHits, hits } = await fetchImages(
        searchText,
        currentPage,
        imagePerPage
      );

      if (hits.length > 0) {
        totalPages = Math.ceil(totalHits / imagePerPage); // Определяю общее кол-во страниц с результатами поиска
        const gallery = renderData(hits);
        loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
        gallerySite.innerHTML = gallery; // Отобразить найденные изображения
        if (totalPages > 1) {
          loadMoreBtn.style.display = 'flex';
        }
        galleryShow.refresh(); // Обновление компонента просмотра увеличенных изображений simplelightbox
      } else {
        throw 'Sorry, there are no images matching your search query. Please try again!';
      }
    } catch (error) {
      message(`${error}`); // Если ничего не найдено в базе изображений, отобразить сообщение об отсутствии результатов поиска по запросу
      loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
    }
  }
}

loadMoreBtn.addEventListener('click', loadMoreImages);

async function loadMoreImages(e) {
  currentPage += 1;
  loaderImages.style.display = 'block'; // Отоброзить прогресс загрузки результатов поиска
  try {
    const { hits } = await fetchImages(searchText, currentPage, imagePerPage);

    if (hits.length > 0) {
      const gallery = renderData(hits);
      loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
      gallerySite.insertAdjacentHTML('beforeend', gallery); // Добавляю изображения в конец существующих
      galleryShow.refresh(); // Обновление компонента просмотра увеличенных изображений simplelightbox
      const scrollDownLenght =
        document.querySelector('.gallery-item').getBoundingClientRect().height *
        2;
      window.scrollBy({
        top: scrollDownLenght,
        behavior: 'smooth',
      });
    } else {
      throw 'Sorry, there are no images matching your search query. Please try again!';
    }
  } catch (error) {
    message(error);
    loadMoreBtn.style.display = 'none'; // Удалить кнопку 'Load more'
    loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
  }

  if (currentPage === totalPages) {
    loadMoreBtn.style.display = 'none'; // Удалить кнопку 'Load more'
    messageInfo(`We're sorry, but you've reached the end of search results.`);
  }
}
