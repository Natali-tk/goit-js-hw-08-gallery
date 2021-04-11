const images = [

  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
]

const galleryEl = document.querySelector('.js-gallery');

const imageList = images.map(image => {
  return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${image.original}" 
  >
    <img
      class="gallery__image"
      src="${image.preview}" 
      data-source="${image.original}" 
      alt="${image.description}"
    />
  </a>
</li>`;
});

galleryEl.insertAdjacentHTML('beforeend', imageList.join(''));

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

let activeIndex = null;

function openModal(event) {
  event.preventDefault();
  window.addEventListener('keydown', onEscKeyPress);
  if (event.target.localName !== 'img') {
    return
  }
  
  imageList.forEach((element, index) => {
    if (element.includes(event.target.src)) {
      activeIndex = index;
    }
    if (activeIndex > images.length - 1) {
    activeIndex = 0;
  }
  });

  refs.lightbox.classList.add('is-open');
  refs.imgModal.src = event.target.dataset.source;
  refs.imgModal.alt = event.target.alt;
}

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
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
const imagesReverse = images.reverse();
console.log(imagesReverse);
window.addEventListener('keydown', (event) => {

  if (event.code !== 'ArrowRight' && event.code !== 'ArrowLeft') {
    return
  }

  if (event.code === 'ArrowRight') {
    activeIndex += 1;
    refs.imgModal.src = images[activeIndex].original;
    refs.imgModal.alt = images[activeIndex].description;
  }
  if (event.code === 'ArrowLeft') {
    activeIndex -= 1;
    refs.imgModal.src = images[activeIndex].original;
    refs.imgModal.alt = images[activeIndex].description;
  }   
});


