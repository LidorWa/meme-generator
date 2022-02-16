'use strict'

// will handle the gallery's DOM





function renderGallery(){
    let strHtml = '';
    let elGallery = document.querySelector('.grid-container');
    var images = sendImgsToDom();

    images.forEach(img => {
        strHtml +=`<article class="items item${img.id}"><img src="assets/images/${img.id}.jpg" class="${img.id}" onclick="getImgForMeme(this)"></article>`
    });
    elGallery.innerHTML = strHtml;
}


function getImgForMeme(elImg){
    var imgSrc = elImg.src;
console.log(imgSrc)
    // gCanvas.toDataURL()
}

// the functions below try to create an eventlisteners on the images.
// the events are applied succesfully, but i still havent find a way to retrieve the src of the 
// specific image using the ev. for now i will apply onclick on each image in the 
// renderGallery function


// function galleryMouseListener(){
//     let elImgs = document.querySelectorAll('.items img');
//     elImgs.forEach(elImg => elImg.addEventListener('click', onGalleryImgClick));
// }
        


// function onGalleryImgClick(ev){
//     console.log(ev)
//     let image = ev.srcElement.currentSrc;
//     console.log(image);
//     image.indexOf('a');
//     // var targetElement = ev.srcElement;
//     // var image = toString(targetElement);
//     // // console.log(ev);
//     // // console.log(targetElement)
//     // console.log(image);
// }

