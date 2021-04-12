import galleryItems from "./gallery-items.js";

const galleryEl = document.querySelector('.js-gallery');

const galleryList = galleryItems.map(({ preview, original, description }) => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}" 
  >
    <img
      class="gallery__image"
      src="${preview}" 
      data-source="${original}" 
      alt="${description}"
    />
  </a>
</li>`;
}).join('');

galleryEl.insertAdjacentHTML('beforeend', galleryList);

galleryEl.addEventListener('click', changeImg);

function changeImg(event) {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG') {
    return
  }
  const currentImage = event.target;
  currentImage.src = currentImage.dataset.source;
}


const refs = {
  lightbox: document.querySelector('.js-lightbox'),
  overlay: document.querySelector('.lightbox__overlay'),
  content: document.querySelector('.lightbox__content'),
  imgModal: document.querySelector('.lightbox__image'),
  closeBtn: document.querySelector('button[data-action="close-lightbox"]'),
}


galleryEl.addEventListener('click', openModal);
refs.closeBtn.addEventListener('click', closeModal);
refs.overlay.addEventListener('click', onOverlayClick);

const imageList = document.querySelectorAll('.gallery__image')
let activeIndex = null;


function openModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onScrollImg);
  
  if (event.target.localName !== 'img') {
    return
  };

  refs.lightbox.classList.add('is-open');
  refs.imgModal.src = event.target.dataset.source;
  refs.imgModal.alt = event.target.alt;
 
  imageList.forEach((image, index) => {
   if (image.dataset.source===event.target.src) {
     activeIndex = index;
     }

  });
  
  
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onScrollImg);
  refs.lightbox.classList.remove('is-open');
  refs.imgModal.src = '';
  refs.imgModal.alt = '';
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onScrollImg (event)  {

  if (event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    return;
  }
  
  if (event.code == 'ArrowLeft' && activeIndex > 0){
        activeIndex -= 1;
    changeImageScroll();
  }
  if (event.code == 'ArrowLeft' && activeIndex  === 0){
        activeIndex = imageList.length-1;
    changeImageScroll();
  }
  if (event.code == 'ArrowRight' && activeIndex < imageList.length - 1){
        activeIndex += 1;
    changeImageScroll();
  }
  if (event.code == 'ArrowRight' && activeIndex === imageList.length - 1){
        activeIndex = 0;
    changeImageScroll();
    }
};

function changeImageScroll() {
    refs.imgModal.src= imageList[activeIndex].dataset.source;
    refs.imgModal.alt= imageList[activeIndex].alt;
 }
