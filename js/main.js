'use strict'


// Will include the global variables and the init() function

// let gKeywordSearchCountMap = {'funny': 12, 'cat':16, 'baby': 2}  ---------> will be used in the bonuses

let gCanvas;
let gCtx;




function init(){
    renderGallery();
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    // ongalleryImgClick();
    // onMemeTextType()
    // renderCanvas();
    addMemeEventListeners();


}