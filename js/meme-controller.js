'use strict'

// will handle the meme's section DOM


function drawText(text, x, y) {
  let meme = getMemeFromService();
  let line = meme.selectedLineIdx;
  let memeTextStroke = meme.lines[line].strokeColor;
  let memeTextFill = meme.lines[line].fillColor;

  // gCtx.strokeStyle = 'white';
  // gCtx.setLineDash([2,3]);
  // gCtx.strokeRect(gCanvas.width-gCanvas.width, gCanvas.height-gCanvas.height, gCanvas.width,
  //   gCanvas.height / memeFontSize + 2);
     
    gCtx.lineWidth = 0.5;

    gCtx.fillStyle = `${memeTextFill}`;
    gCtx.fillText(text, x, y);

    gCtx.strokeStyle = `${memeTextStroke}`;
    gCtx.strokeText(text, x, y);
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    elTextInput.addEventListener('input', (event) => {

      meme.lines[line].txt = event.target.value;
      renderCanvas();
    })
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    elTextInput.addEventListener('input', (event) => {

      meme.lines[line].txt = event.target.value;
      renderCanvas();
    })
  }


  function addTextIncreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let elIncreaseBtn = document.getElementById('increase-font-size');
    
    elIncreaseBtn.addEventListener('click', () =>{
      meme.lines[line].size += 0.5;
      gCtx.font = `${meme.lines[line].size}px sans-serif`;
      document.getElementById("meme-text").focus();
      renderCanvas();
    });
  }

  function addTextDecreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let elIncreaseBtn = document.getElementById('decrease-font-size');
    let line = meme.selectedLineIdx;
    elIncreaseBtn.addEventListener('click', () =>{
      meme.lines[line].size -= 0.5;
      gCtx.font = `${meme.lines[line].size}px sans-serif`;
      renderCanvas();
    });
  }

  function addTextAlignLeftEventListener(){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let elAlignLeftBtn = document.getElementById('align-text-left');

    elAlignLeftBtn.addEventListener('click', ()=>{
      meme.lines[line].align = 'left';
      renderCanvas();
    })
  }
  function addTextAlignRightEventListener(){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let elAlignLeftBtn = document.getElementById('align-text-right');

    elAlignLeftBtn.addEventListener('click', ()=>{
      meme.lines[line].align = 'right';
      renderCanvas();
    })
  }

  function addTextAlignCenterEventListener(){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let elAlignLeftBtn = document.getElementById('align-text-center');

    elAlignLeftBtn.addEventListener('click', ()=>{
      meme.lines[line].align = 'center';
      renderCanvas();
    })
  }

  function addStrokeColorEventListener(){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let memeStrokeColor = meme.lines[line].strokeColor;
    let elStrokeColorInput = document.querySelector('.stroke-color');
    elStrokeColorInput.addEventListener('input', ()=>{
      memeStrokeColor.lines[line].strokeColor = elStrokeColorInput.value;
      gCtx.strokeStyle = `${memeStrokeColor.lines[line].strokeColor}`;
      renderCanvas();
    })
  }

  function addFillColorEventListener(){
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    let memeFillColor = meme.lines[line].fillColor;
    let elFillColorInput = document.querySelector('.fill-color');
    elFillColorInput.addEventListener('input', ()=>{
      memeFillColor.lines[line].fillColor = elFillColorInput.value;
      gCtx.fillStyle = `${memeFillColor.lines[line].fillColor}`;
      renderCanvas();
    })
  }

  function checkTextAlign(meme){
    let currLine = meme.selectedLineIdx;
    if (meme.lines[currLine].align === 'left'){
      meme.lines[currLine].posX = 1;
      meme.lines[currLine].posY = 20;

      drawText(meme.lines[currLine].txt, meme.lines[currLine].posX , meme.lines[currLine].posY);
    }
    else if (meme.lines[currLine].align === 'center') {
      meme.lines[currLine].posX = (gCanvas.width / 2) - (gCtx.measureText(meme.lines[currLine].txt).width / 2);
      drawText(meme.lines[currLine].txt, meme.lines[currLine].posX , meme.lines[currLine].posY);
    }
    else {
      meme.lines[currLine].posX = gCanvas.width - gCtx.measureText(meme.lines[currLine].txt).width
      drawText(meme.lines[currLine].txt, meme.lines[currLine].posX, 20);
    }
  }

function addBackToGalleryLinkEventListener(){
  let elGalleryLink = document.querySelector('.back-to-gallery');
  let elCanvasContainer = document.querySelector('.canvas-container');
  let elGalleryContainer = document.querySelector('.gallery-page')

  elGalleryLink.addEventListener('click',()=>{
    elCanvasContainer.style.display = 'none';
    elGalleryContainer.style.display = 'block';
  })
}

function addSwitchTextLineEventListener(){
  let switchTextLineBtn = getElementById('add-text-line');
  let meme = getMemeFromMemeService();
  switchTextLineBtn.addEventListener('click', ()=>{
   meme.selectedLineIdx += (meme.selectedLineIdx === meme.lines.length -1)?  0:1;

  })

}

function renderCanvas(){
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  let meme = getMemeFromService();

  const imgSrc = getImgSrcById(meme.selectedImgId);

  const image = new Image(gCanvas.width, gCanvas.height);
  image.src = imgSrc;
  
  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
  
  checkTextAlign(meme);
  }

function onGetImgFromGallery(memeId){
  return getImgFromGallery(memeId);
}

function addMemeEventListeners() {
  addImageClickEventLisetner();
  addTextTypeEventListener();
  addTextIncreaseFontSizeEventListener();
  addTextDecreaseFontSizeEventListener();
  addTextAlignLeftEventListener();
  addTextAlignRightEventListener();
  addTextAlignCenterEventListener();
  addStrokeColorEventListener();
  addFillColorEventListener();
  addBackToGalleryLinkEventListener();
}


  // <input class="controller" id="meme-text" placeholder="Text line 1"><br>
  // <!-- <button class="move-line-down">↧</button>
  // <button class="move-line-up">↥</button> -->  <!-- IN DESKTOP MODE!-->
  
  // <button class="controller" id="switch-text-line"><img src="assets/controller-symbols/up-and-down/up-down.jpg"></button>
  // <button class="controller" id="add-text-line"><img src="assets/controller-symbols/add/add.jpg"></button>
  // <button class="controller" id="delete-text-line"><img src="assets/controller-symbols/trash/trash.jpg"></button><br>
  // <button class="controller" id="change-font-family">IMPACT</button>
  // <!-- stickers! -->
  // <button class="controller" id="share-canvas">Share!</button>
  // <button class="controller" id="download-canvas">Download meme!</button>

  // TODO: adding the line up / down buttons to desktop mode
  // TODO: handle moving line up / down
  // TODO: handle switching text line
  // TODO: handle delete text line
  // TODO: handle change font
  // TODO: handle share canvas
  // TODO: handle download canvas
  // TODO: add functionality to header links

  // TODO: fix the bug in which after typing a text to the meme and then changing alignment, 
  // the text will at first appear outside the canvas, and then, after extra typing, will centerize normally