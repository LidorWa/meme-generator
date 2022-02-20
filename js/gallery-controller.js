'use strict'

// will handle the gallery's DOM


function renderGallery(){
    let strHtml = '';
    let elGallery = document.querySelector('.grid-container');
    var images = sendImgsToDom();

    images.forEach(img => {
        strHtml +=`<article class="items item${img.id}"><img src="assets/images/${img.id}.jpg" id="${img.id}"
         class="galleryImage"></article>`
    });
    elGallery.innerHTML = strHtml;
}



function addImageClickEventLisetner(){
    let elImgs = document.querySelectorAll('.galleryImage');
    let meme;
    
    elImgs.forEach(elImg => elImg.addEventListener('click', () => {
        meme = getMemeFromMemeService();
        meme.selectedImgId = elImg.id;
        renderCanvas();
        document.querySelector('.gallery-page').style.display = 'none';
        // document.querySelector('.search-image-bar').style.display = 'none';
        document.querySelector('.canvas-container').style.display = 'flex';
    }));
}

function getMemeFromMemeService(){
    return getMemeFromService();
}

// function addGallerySearchInputEventListener(){
//     let elSearchInput = document.getElementById('search-gallery');

// }

// function getKeywordsFromService(keyword){
//     getKeywords(keyword);
// }


// function addGalleryEventListeners(){
//     addGallerySearchInputEventListener();
// }