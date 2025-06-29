import { ACCESS_KEY } from '../config.js';
  
    const IMAGE_COUNT = 12;
    const imageBlock = document.getElementById('unsplash-imgs');
    const searchInput = document.querySelector('.search');
    const searchButton = document.getElementById('search-button');
    const invalidPromptMessage = document.querySelector('.invalid-prompt');

    async function getImages(query) {
        try {
        
            let url;
            
            invalidPromptMessage.classList.remove('show');

            if (query && query.trim() !== '') {

                const regex = /[^a-zA-Z0-9 !$&*\-=\^`|~#%'+\/?_{}]/;
                
                if (regex.test(query)) {
                    invalidPromptMessage.classList.add('show');
                    return;
                }

                url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${IMAGE_COUNT}&client_id=${ACCESS_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                imageBlock.innerHTML = '';

                if (data.results.length === 0) {
                    imageBlock.innerHTML = 'По вашему запросу ничего не найдено.';
                    return;
                }

                data.results.forEach(img => {
                    const imgElem = document.createElement('img');
                    imgElem.src = img.urls.regular;
                    imgElem.alt = img.alt_description || 'Image';
                    imgElem.loading = 'lazy';
                    imageBlock.appendChild(imgElem);
                });

            } 
            else {
            
                url = `https://api.unsplash.com/photos/random?count=${IMAGE_COUNT}&client_id=${ACCESS_KEY}`;
                const response = await fetch(url);
                const data = await response.json();
                imageBlock.innerHTML = '';

                data.forEach(img => {
                    const imgElem = document.createElement('img');
                    imgElem.src = img.urls.regular;
                    imgElem.alt = img.alt_description || 'Image';
                    imgElem.loading = 'lazy';
                    imageBlock.appendChild(imgElem);
                });

            }
        } catch (err) {
            console.error(err);
            imageBlock.innerHTML = 'Ошибка при загрузке изображений.';
        } finally {
            if (window.updateImages) window.updateImages();
        }
    }
  
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchInput.value;
        getImages(query);
    });

    getImages()