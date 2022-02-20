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



function addBackToGalleryLinkEventListener(){
    let elGalleryLink = document.querySelector('.back-to-gallery');
    let elCanvasContainer = document.querySelector('.canvas-container');
    let elGalleryContainer = document.querySelector('.gallery-page')
  
    elGalleryLink.addEventListener('click',()=>{
      elCanvasContainer.style.display = 'none';
      elGalleryContainer.style.display = 'block';
      clearCanvas ();
      resetMeme();
      document.getElementById('meme-text').value = '';
    })
  }

function clearCanvas (){
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}
  
  function addBackToGalleryLogoLinkEventListener(){
    let elGalleryLink = document.querySelector('.logo');
    let elCanvasContainer = document.querySelector('.canvas-container');
    let elGalleryContainer = document.querySelector('.gallery-page')
  
    elGalleryLink.addEventListener('click',()=>{
      elCanvasContainer.style.display = 'none';
      elGalleryContainer.style.display = 'block';
      clearCanvas ();
      resetMeme();
      document.getElementById('meme-text').value = '';
    })
  }