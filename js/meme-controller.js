'use strict'

// will handle the meme's section DOM



function drawText(text, x, y) {
  let meme = getMemeFromService();
  let memeTextStroke = meme.lines[0].strokeColor;
  let memeTextFill = meme.lines[0].fillColor;

  // gCtx.strokeStyle = 'white';
  // gCtx.setLineDash([2,3]);
  // gCtx.strokeRect(gCanvas.width-gCanvas.width, gCanvas.height-gCanvas.height, gCanvas.width,
  //   gCanvas.height / memeFontSize + 2);
     
    gCtx.lineWidth = 0.5;
    gCtx.strokeStyle = `${memeTextStroke}`;
    gCtx.fillStyle = `${memeTextFill}`;

    // gCtx.textAlign = 'end';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    elTextInput.addEventListener('input', (event) => {

      meme.lines[0].txt = event.target.value;
      renderCanvas();
    })
  }

  function addTextTypeEventListener(){
    let elTextInput = document.getElementById('meme-text');
    let meme = getMemeFromService();
    elTextInput.addEventListener('input', (event) => {

      meme.lines[0].txt = event.target.value;
      renderCanvas();
    })
  }


  function addTextIncreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let elIncreaseBtn = document.getElementById('increase-font-size');
    
    elIncreaseBtn.addEventListener('click', () =>{
      meme.lines[0].size += 0.5;
      gCtx.font = `${meme.lines[0].size}px sans-serif`;
      renderCanvas();
    });
  }

  function addTextDecreaseFontSizeEventListener (){
    let meme = getMemeFromService();
    let elIncreaseBtn = document.getElementById('decrease-font-size');
    
    elIncreaseBtn.addEventListener('click', () =>{
      meme.lines[0].size -= 0.5;
      gCtx.font = `${meme.lines[0].size}px sans-serif`;
      renderCanvas();
    });
  }

  function addTextAlignLeftEventListener(){
    let memeLineAlign = getMemeFromService();
    let elAlignLeftBtn = document.getElementById('align-text-left');
    elAlignLeftBtn.addEventListener('click', ()=>{
      memeLineAlign.lines[0].align = 'left';
    })
  }
  function addTextAlignRightEventListener(){
    let memeLineAlign = getMemeFromService();
    let elAlignLeftBtn = document.getElementById('align-text-right');
    elAlignLeftBtn.addEventListener('click', ()=>{
      memeLineAlign.lines[0].align = 'right';
    })
  }

  function addTextAlignCenterEventListener(){
    let memeLineAlign = getMemeFromService();
    let elAlignLeftBtn = document.getElementById('align-text-center');
    elAlignLeftBtn.addEventListener('click', ()=>{
      memeLineAlign.lines[0].align = 'center';
    })
  }

  function addStrokeColorEventListener(){
    let memeStrokeColor = getMemeFromService();
    let elStrokeColorInput = document.querySelector('.stroke-color');
    elStrokeColorInput.addEventListener('input', ()=>{
      memeStrokeColor.lines[0].strokeColor = elStrokeColorInput.value;
      gCtx.strokeStyle = `${memeStrokeColor.lines[0].strokeColor}`;
      renderCanvas();
    })
  }

  function addFillColorEventListener(){
    let memeFillColor = getMemeFromService();
    let elFillColorInput = document.querySelector('.fill-color');
    elFillColorInput.addEventListener('input', ()=>{
      memeFillColor.lines[0].fillColor = elFillColorInput.value;
      gCtx.fillStyle = `${memeFillColor.lines[0].fillColor}`;
      renderCanvas();
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

  function checkTextAlign(meme){
    if (meme.lines[0].align === 'left'){
      drawText(meme.lines[0].txt, gCanvas.width - gCanvas.width + 1 , gCanvas.height -gCanvas.height + 20);
      gCanvas.dir = 'ltr';
    }
    else if (meme.lines[0].align === 'center')
    drawText(meme.lines[0].txt, gCanvas.width / 2 - 10 , gCanvas.height -gCanvas.height + 20);
    else{
    drawText(meme.lines[0].txt, gCanvas.width - 1 , gCanvas.height -gCanvas.height + 20);
    gCanvas.dir = 'rtl';
  }
  
  
}

function onGetImgFromGallery(memeId){
  return getImgFromGallery(memeId);
}

function addEventListeners() {
  addImageClickEventLisetner();
  addTextTypeEventListener();
  addTextIncreaseFontSizeEventListener();
  addTextDecreaseFontSizeEventListener();
  addTextAlignLeftEventListener();
  addTextAlignRightEventListener();
  addTextAlignCenterEventListener();
  addStrokeColorEventListener();
  addFillColorEventListener();
}


  // <input class="controller" id="meme-text" placeholder="Text line 1"><br>
  // <!-- <button class="move-line-down">↧</button>
  // <button class="move-line-up">↥</button> -->  <!-- IN DESKTOP MODE!-->
  
  // <button class="controller" id="switch-text-line"><img src="assets/controller-symbols/up-and-down/up-down.jpg"></button>
  // <button class="controller" id="add-text-line"><img src="assets/controller-symbols/add/add.jpg"></button>
  // <button class="controller" id="delete-text-line"><img src="assets/controller-symbols/trash/trash.jpg"></button><br>
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
  // TODO: handle change font
  // TODO: handle change stroke color
  // TODO: handle change fill color
  // TODO: handle share canvas
  // TODO: handle download canvas