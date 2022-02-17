'use strict'

// will handle the meme's section DOM



function drawText(text, x, y) {
    // gCtx.strokeRect(gCanvas.width-gCanvas)
    gCtx.lineWidth = 0.5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';

    // gCtx.textAlign = 'end';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    elTextInput.addEventListener('input', (event) => {
      console.log('meme', meme);

      meme.lines[0].txt = event.target.value;
      renderCanvas();
    })
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    elTextInput.addEventListener('input', (event) => {
      console.log('meme', meme);

      meme.lines[0].txt = event.target.value;
      renderCanvas();
    })
  }


  function addTextIncreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let elIncreaseBtn = document.getElementById('increase-font-size');
    
    elIncreaseBtn.addEventListener('click', () =>{
      console.log('gCtx.font', gCtx.font);
      meme.lines[0].size += 0.5;
      console.log('meme', meme);
      console.log('meme.lines[0].size', meme.lines[0].size);
      gCtx.font = `${meme.lines[0].size}px sans-serif`;
      renderCanvas();
    });
  }

  function addTextDecreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let elIncreaseBtn = document.getElementById('decrease-font-size');
    
    elIncreaseBtn.addEventListener('click', () =>{
      console.log('gCtx.font', gCtx.font);
      meme.lines[0].size -= 0.5;
      console.log('meme', meme);
      console.log('meme.lines[0].size', meme.lines[0].size);
      gCtx.font = `${meme.lines[0].size}px sans-serif`;
      renderCanvas();
    });
  }

function renderCanvas(){
  // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
  let meme = getMemeFromService();

  const imgSrc = getImgSrcById(meme.selectedImgId);
  console.log('in renderCanvas imgSrc', imgSrc);

  const image = new Image(gCanvas.width, gCanvas.height);
  image.src = imgSrc;

  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
  if (meme.lines[0].align === 'left')
  drawText(meme.lines[0].txt, gCanvas.width - gCanvas.width + 1 , gCanvas.height -gCanvas.height + 20);
  else if (meme.lines[0].align === 'center')
  drawText(meme.lines[0].txt, gCanvas.width / 2 , gCanvas.height -gCanvas.height + 20);
  else
  drawText(meme.lines[0].txt, gCanvas.width - 1 , gCanvas.height -gCanvas.height + 20);
  
  
}

function onGetImgFromGallery(memeId){
  return getImgFromGallery(memeId);
}

function addEventListeners() {
  addImageClickEventLisetner();
  addTextTypeEventListener();
  addTextIncreaseFontSizeEventListener();
  addTextDecreaseFontSizeEventListener();
}


  // <input class="controller" id="meme-text" placeholder="Text line 1"><br>
  // <!-- <button class="move-line-down">↧</button>
  // <button class="move-line-up">↥</button> -->  <!-- IN DESKTOP MODE!-->
  
  // <button class="controller" id="switch-text-line"><img src="assets/controller-symbols/up-and-down/up-down.jpg"></button>
  // <button class="controller" id="add-text-line"><img src="assets/controller-symbols/add/add.jpg"></button>
  // <button class="controller" id="delete-text-line"><img src="assets/controller-symbols/trash/trash.jpg"></button><br>
  // <button class="controller" id="align-text-left"><img src="assets/controller-symbols/align-to-left/align-to-left.jpg"></button>
  // <button class="controller" id="align-text-center"><img src="assets/controller-symbols/align-to-center/center-text-alignment.jpg"></button>
  // <button class="controller" id="align-text-right"><img src="assets/controller-symbols/align-to-right/align-to-right.jpg"></button><br>
  // <button class="controller" id="change-font-family">IMPACT</button>
  // <button class="controller" id="change-stroke-color">S</button>
  // <button class="controller" id="change-fill-color"><img src="assets/controller-symbols/brush/paint-board-and-brush.jpg"></button><br>
  // <!-- stickers! -->
  // <button class="controller" id="share-canvas">Share!</button>
  // <button class="controller" id="download-canvas">Download meme!</button>

  // TODO: adding the line up / down buttons to desktop mode
  // TODO: handle moving line up / down
  // TODO: handle switching text line
  // TODO: handle delete text line
  // TODO: handle align text - left, right, center
  // TODO: handle align text - center
  // TODO: handle align text - right
  // TODO: handle change font
  // TODO: handle change stroke color
  // TODO: handle change fill color
  // TODO: handle share canvas
  // TODO: handle download canvas