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



function ongalleryImgClick(){
    let elImgs = document.querySelectorAll('.galleryImage');
    

    elImgs.forEach(elImg => elImg.addEventListener('click', (event) => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        document.querySelector('.grid-container').style.display = 'none';
        document.querySelector('.canvas-container').style.display = 'block';
    }));
}

