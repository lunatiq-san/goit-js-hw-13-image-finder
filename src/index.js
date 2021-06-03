import hitsTpl from './templates/hits.hbs';
import './sass/main.scss';
import getRefs from './js/get-refs';
import debounce from 'lodash.debounce';
import ApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import * as basicLightbox from 'basiclightbox';

const refs = getRefs();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const apiService = new ApiService();

refs.input.addEventListener('input', debounce(onInputChange, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchHits);
refs.gallery.addEventListener('click', onImageGalleryClick);

function onInputChange(event) {
  apiService.query = event.target.value;

  if (apiService.query.trim() === '') {
    return;
  }

  clearGallery();

  loadMoreBtn.show();
  apiService.resetPage();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  apiService.fetchImages().then(hits => {
    appendHitsMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', hitsTpl(hits));
  loadMoreBtn.refs.button.scrollIntoView({
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
