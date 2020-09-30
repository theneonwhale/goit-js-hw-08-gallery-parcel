import pictures from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  lightbox: document.querySelector('.js-lightbox'),
  ligtboxImg: document.querySelector('.lightbox__image'),
  btnClose: document.querySelector('[data-action="close-lightbox"]'),
  btnNext: document.querySelector('[data-action="next-lightbox"]'),
  btnPrevious: document.querySelector('[data-action="previous-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

refs.gallery.insertAdjacentHTML('beforeend', makeGalleryMarkup(pictures));

refs.gallery.addEventListener('click', onOpenModal);
refs.btnClose.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayClose);

refs.btnNext.addEventListener('click', onArrowBtnsClick);
refs.btnPrevious.addEventListener('click', onArrowBtnsClick);

function makeGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      loading="lazy"
      class="gallery__image lazyload"
      data-src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onOpenModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.lightbox.classList.add('is-open');

  refs.ligtboxImg.src = event.target.dataset.source;
  refs.ligtboxImg.alt = event.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeysPress);
}

function onCloseModal() {
  if (refs.ligtboxImg.src && refs.ligtboxImg.alt) {
    refs.ligtboxImg.src = '';
    refs.ligtboxImg.alt = '';
  }

  refs.lightbox.classList.remove('is-open');

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeysPress);
}

function onOverlayClose(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onArrowKeysPress(event) {
  const NEXT_ARROW_KEY_CODE = 'ArrowRight';
  const PREVIOUS_ARROW_KEY_CODE = 'ArrowLeft';

  const isNextKey = event.code === NEXT_ARROW_KEY_CODE;
  const isPreviousKey = event.code === PREVIOUS_ARROW_KEY_CODE;

  if (isNextKey) {
    onNextSwitchImg();
  }

  if (isPreviousKey) {
    onPreviousSwitchImg();
  }
}

function onArrowBtnsClick(event) {
  const isNextBtn = event.target === refs.btnNext;
  const isPreviousBtn = event.target === refs.btnPrevious;

  if (isNextBtn) {
    onNextSwitchImg();
  }

  if (isPreviousBtn) {
    onPreviousSwitchImg();
  }
}

function onNextSwitchImg() {
  for (let i = 0; i < pictures.length - 1; i += 1) {
    if (refs.ligtboxImg.src === pictures[i].original) {
      refs.ligtboxImg.src = pictures[i + 1].original;
      refs.ligtboxImg.alt = pictures[i + 1].description;
      break;
    }
  }
}

function onPreviousSwitchImg() {
  for (let i = pictures.length - 1; i > 0; i -= 1) {
    if (refs.ligtboxImg.src === pictures[i].original) {
      refs.ligtboxImg.src = pictures[i - 1].original;
      refs.ligtboxImg.alt = pictures[i - 1].description;
      break;
    }
  }
}
