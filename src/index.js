// 2. Pixabay API поддерживает пагинацию, пусть в ответе приходит по 12 объектов, установлено в параметре per_page. По умолчанию параметр page равен 1. При каждом последующем запросе page увеличивается на 1, а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.
// 3. Тебе интересны следующие свойства:

// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение (смотри пункт 'дополнительно')
// likes - количество лайков
// views - количество просмотров
// comments - количество комментариев
// downloads - количество загрузок
// 4. Кнопка 'Load more'
// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими.

// Страница должна автоматически плавно проскроливаться после рендера изображений, чтобы перевести пользователя на следующие загруженные изображения. Используй метод Element.scrollIntoView().

// const element = document.getElementById('.my-element-selector');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });

import hitsTpl from './templates/hits.hbs';
import './sass/main.scss';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import ApiService from './js/apiService';

const refs = getRefs();
const apiService = new ApiService();

// 1. Запрос к серверу через инпут
refs.input.addEventListener('input', debounce(onInputChange, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onInputChange(event) {
  apiService.query = event.target.value;

  if (apiService.query.trim() === '') {
    return;
  }

  clearGallery();

  apiService.resetPage();
  apiService.fetchImages().then(appendHitsMarkup);
}

function onLoadMore() {
  apiService.fetchImages().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));

  refs.loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
