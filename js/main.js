'use strict'


// Will include the global variables and the init() function

// let gKeywordSearchCountMap = {'funny': 12, 'cat':16, 'baby': 2}  ---------> will be used in the bonuses

let gCanvas;
let gCtx;


let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function init(){
    console.log('startup');
    renderGallery();
    ongalleryImgClick();
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');


}