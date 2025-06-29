document.addEventListener('DOMContentLoaded', () => {
  const imageBlock = document.getElementById('unsplash-imgs');
  const body = document.body
  const blurredBlocks = document.querySelector('.blurred');
  const modal = document.getElementById('carousel');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = document.getElementById('prev-button');
  const nextBtn = document.getElementById('next-button');

  let images = [];
  
  window.updateImages = function() {
    images = Array.from(imageBlock.querySelectorAll('img'));
  };

  updateImages();
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    const img = images[currentIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt || '';
    body.classList.add('on-modal-opened');
    modal.classList.add('show');
    blurredBlocks.classList.add('blur');
  }

  imageBlock.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'img') {
      const clickedIndex = images.indexOf(e.target);
      if (clickedIndex !== -1) {
        openModal(clickedIndex);
      }
    }
  });

  closeBtn.addEventListener('click', () => {
    body.classList.remove('on-modal-opened');
    modal.classList.remove('show');
    blurredBlocks.classList.remove('blur');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      body.classList.remove('on-modal-opened');
      modal.classList.remove('show');
      blurredBlocks.classList.remove('blur');
    }
  });

  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      modalImg.src = images[currentIndex].src;
      modalImg.alt = images[currentIndex].alt || '';
  });
    
  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      modalImg.src = images[currentIndex].src;
      modalImg.alt = images[currentIndex].alt || '';
  });
 
});
