export default function getRefs() {
  return {
    searchForm: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    photoCard: document.querySelector('.photo-card'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  };
}
