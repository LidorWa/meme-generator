'use strict'

// will handle the gallery's DOM



function renderGallery(){
    let strHtml = '';
    let elGallery = document.querySelector('.grid-container');
    var images = sendImgsToDom();

    images.forEach(img => {
        strHtml +=`<article class="items item${img.id}"><img src="assets/images/${img.id}.jpg"></article>`
    });
    console.log(strHtml);
    elGallery.innerHTML = strHtml;
}

