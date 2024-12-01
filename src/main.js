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

function checkInput(e) {
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
    fetchImages(searchText, currentPage, imagePerPage)
      .then(data => {
        const { totalHits, hits } = data;
        // Если поисковый запрос удачен, передать базу изображений в функцию создания галлереи. Иначе сообщить об отсутствии подходящий запросу изображений
        if (hits.length > 0) {
          totalPages = Math.ceil(totalHits / imagePerPage); // Определяю общее кол-во страниц с результатами поиска
          return renderData(hits);
        }
        throw 'Sorry, there are no images matching your search query. Please try again!';
      }) // Обработка введенного запроса
      .then(gallery => {
        loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
        gallerySite.innerHTML = gallery; // Отобразить найденные изображения
        if (totalPages > 1) {
          loadMoreBtn.style.display = 'flex';
        }
        galleryShow.refresh(); // Обновление компонента просмотра увеличенных изображений simplelightbox
      })
      .catch(error => {
        message(error); // Если ничего не найдено в базе изображений, отобразить сообщение об отсутствии результатов поиска по запросу
        loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
      });
  }
}

loadMoreBtn.addEventListener('click', loadMoreImages);

function loadMoreImages(e) {
  currentPage += 1;
  loaderImages.style.display = 'block'; // Отоброзить прогресс загрузки результатов поиска
  fetchImages(searchText, currentPage, imagePerPage)
    .then(data => {
      const { hits } = data;
      if (hits.length > 0) {
        return renderData(hits);
      }
      throw 'Sorry, there are no images matching your search query. Please try again!';
    })
    .then(gallery => {
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
    })
    .catch(error => {
      message(error);
      loadMoreBtn.style.display = 'none'; // Удалить кнопку 'Load more'
      loaderImages.style.display = 'none'; // Скрыть прогресс загрузки результатов поиска
    });

  if (currentPage === totalPages) {
    loadMoreBtn.style.display = 'none'; // Удалить кнопку 'Load more'
    messageInfo(`We're sorry, but you've reached the end of search results.`);
  }
}
