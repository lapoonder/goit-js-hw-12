'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import errorImage from '../img/error.png';
import cautionImage from '../img/caution.png';

iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  animateInside: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  position: 'topRight',
  titleColor: '#fff',
  titleLineHeight: '24',
  backgroundColor: '#ef4040',
  progressBarColor: '#b51b1b',
  messageColor: '#fff',
  messageSize: '16',
  messageLineHeight: '24',
});

export const galleryShow = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionClass: 'imageTitle',
});

// Функция вывода сообщений об ошибках
export function message(textMessage) {
  iziToast.error({
    class: 'error_message',
    iconUrl: `${errorImage}`,
    message: textMessage,
  });
}

export function messageInfo(textMessage) {
  iziToast.info({
    class: 'caution_message',
    iconUrl: `${cautionImage}`,
    message: textMessage,
  });
}

// Создания галлереи
export function renderData(hits) {
  const gallery = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-item">
        <div class="image_prev">
  <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image"
      src="${webformatURL}"
      alt="${tags}" />
  </a>
  </div>
  <div class="img_info">
  <ul class="information_list">
  <li>Likes</li>
  <li>${likes}</li>
  </ul>
    <ul class="information_list">
  <li>Views</li>
  <li>${views}</li>
  </ul>
    <ul class="information_list">
  <li>Comments</li>
  <li>${comments}</li>
  </ul>
    <ul class="information_list">
  <li>Downloads</li>
  <li>${downloads}</li>
  </ul>
  </div>
</li>
`;
      }
    )
    .join('');
  return gallery;
}
