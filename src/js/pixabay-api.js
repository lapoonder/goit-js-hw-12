'use strict';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';

export default async function fetchImages(
  searchImagesQuery,
  currentPage,
  imagePerPage
) {
  const axiosRequest = await axios.get('/api/', {
    params: {
      key: '47257785-d72a0dbe5696a4dd8bfb23e2a',
      q: `${searchImagesQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: `${imagePerPage}`,
      page: `${currentPage}`,
    },
  });
  return axiosRequest.data;
}
