import hitsTpl from './templates/hits.hbs';
import './sass/main.scss';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import ApiService from './js/apiService';
import * as basicLightbox from 'basiclightbox';

const refs = getRefs();
const apiService = new ApiService();

refs.input.addEventListener('input', debounce(onInputChange, 500));
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageGalleryClick);

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

function onImageGalleryClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = event.target.dataset.source;
  openMobalBasic(largeImageUrl);
}

function openMobalBasic(url) {
  const instance = basicLightbox.create(`<img src="${url}" width="1600" height="900">`);
  instance.show();
}
