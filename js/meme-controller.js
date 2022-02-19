'use strict'

// will handle the meme's section DOM




function renderCanvas(){
  let meme = getMemeFromService();

  const imgSrc = getImgSrcById(meme.selectedImgId);

  const image = new Image(gCanvas.width, gCanvas.height);
  image.src = imgSrc;
  
  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);
  
  drawText();
}

function getTextPosition(line) {
  console.log('in getTextPos line', line);
  console.log('in getTextPos gCtx.measureText(line.txt).width', gCtx.measureText(line.txt).width);

  let position = {};
  position.y = line.posY;

  if (line.align === 'left'){
    position.x = 1;
    
    line.posX = 1;
  }
  else if (line.align === 'center') {
    position.x = line.posX = (gCanvas.width / 2) - (gCtx.measureText(line.txt).width / 2);

    line.posX = (gCanvas.width / 2) - (gCtx.measureText(line.txt).width / 2);
  }
  else {
    position.x = gCanvas.width - gCtx.measureText(line.txt).width;

    line.posX = gCanvas.width - gCtx.measureText(line.txt).width;
  }

  return position;
}

function drawText() {
  let meme = getMemeFromService();

  meme.lines.forEach(line => {
    let linePos = getTextPosition(line);

    drawRectBorderForText(line);
    gCtx.lineWidth = 0.5;
    gCtx.font = `${line.size}px ${line.font}`;
  

    gCtx.fillStyle = line.fillColor;
    gCtx.fillText(line.txt, linePos.x, linePos.y);
  
    gCtx.strokeStyle = line.strokeColor;
    gCtx.strokeText(line.txt, linePos.x, linePos.y);
  })  
}

function drawRectBorderForText (line){
    gCtx.strokeStyle = 'white';
    gCtx.setLineDash([2,3]);
    gCtx.strokeRect(0, line.posY-line.size, gCanvas.width, line.size + 4);
    gCtx.setLineDash([]);
}

function addTextTypeEventListener(){
  let elTextInput = document.getElementById('meme-text');

  elTextInput.addEventListener('input', (event) => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].txt = event.target.value;

    renderCanvas();
  });
}

function addTextIncreaseFontSizeEventListener (){
  let elIncreaseBtn = document.getElementById('increase-font-size');
  
  elIncreaseBtn.addEventListener('click', () =>{
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].size += 0.5;
    
    document.getElementById("meme-text").focus();


    renderCanvas();
  });
}

function addTextDecreaseFontSizeEventListener (){
  let elIncreaseBtn = document.getElementById('decrease-font-size');
  
  elIncreaseBtn.addEventListener('click', () =>{
    let meme = getMemeFromService();
    let currLine = meme.selectedLineIdx;

    meme.lines[currLine].size -= 0.5;
    document.getElementById("meme-text").focus();
    renderCanvas();
  });
}

function addTextAlignLeftEventListener(){
  let elAlignLeftBtn = document.getElementById('align-text-left');

  elAlignLeftBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'left';

    document.getElementById("meme-text").focus();

    renderCanvas();
  })
}

function addTextAlignRightEventListener(){
  let elAlignLeftBtn = document.getElementById('align-text-right');

  elAlignLeftBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'right';

    document.getElementById("meme-text").focus();
    renderCanvas();
  });
}

function addTextAlignCenterEventListener(){
  let elAlignLeftBtn = document.getElementById('align-text-center');

  elAlignLeftBtn.addEventListener('click', ()=>{
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'center';

    document.getElementById("meme-text").focus();
    renderCanvas();
  })
}

function addStrokeColorEventListener(){
  let elStrokeColorInput = document.querySelector('.stroke-color');

  elStrokeColorInput.addEventListener('input', ()=>{
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    
    meme.lines[line].strokeColor = elStrokeColorInput.value;
    document.getElementById("meme-text").focus();

    renderCanvas();
  })
}

function addFillColorEventListener(){
  let elFillColorInput = document.querySelector('.fill-color');

  elFillColorInput.addEventListener('input', ()=>{
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].fillColor = elFillColorInput.value;
    document.getElementById("meme-text").focus();

    renderCanvas();
  })
}




function addSwitchTextLineEventListener(){

  let meme = getMemeFromService();
  
  let switchTextLineBtn = document.getElementById('switch-text-line');

  switchTextLineBtn.addEventListener('click', ()=>{
    meme.selectedLineIdx = (meme.selectedLineIdx === (meme.lines.length -1))?  0:+1;
    let currLine = meme.selectedLineIdx;
    
    
    document.getElementsByName('meme-text')[0].placeholder = `Text line ${currLine+1}`;
    document.getElementById('meme-text').value = (meme.lines[currLine].txt === '')? '': meme.lines[currLine].txt;
    document.getElementById("meme-text").focus();
     
  })

}

function addDownloadCanvasEventListener() {

  let elDownloadBtn = document.getElementById('download-canvas');

  elDownloadBtn.addEventListener('click',()=>{
    let meme = getMemeFromService();
    let memeId = meme.selectedImgId;

    let elDownloadBtnA = document.getElementById('download-canvas-a');

    let imgContent = gCanvas.toDataURL('image/jpeg');

    elDownloadBtnA.href = imgContent;
    elDownloadBtnA.download = `canvas-img-${memeId}.jpg`;
  })
}

function addShareToFacebookEventListener() {

  let elShareFbBtn = document.getElementById('share-canvas-fb');

  elShareFbBtn.addEventListener('click',()=>{

    let imgDataUrl = gCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
      let encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      
      document.querySelector('.user-msg').innerText = `Your photo is available here:`
      document.querySelector('.share-container').innerHTML = `
      <a class="share-to-fb-btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" 
      target="_blank" onclick="() => onFacebookShareBtnClick(uploadedImgUrl)">
         Share   
      </a>`
  }
  
  doShareImg(imgDataUrl, onSuccess);
})
}

function onFacebookShareBtnClick(uploadedImgUrl) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
  document.querySelector('.user-msg').style.display = 'none'
  document.querySelector('.share-container').style.display = 'none'; 
  return false;
}

function addShareToWhatsappEventListener() {

  let elShareWhatsappBtn = document.getElementById('share-canvas-whatsapp');

  elShareWhatsappBtn.addEventListener('click',()=>{

    let imgDataUrl = gCanvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
      let encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      document.querySelector('.user-msg').innerText = `Your photo is available here:`

      // document.querySelector('.share-container').innerHTML = `
      // <a class="share-to-whatsapp-btn" href="whatsapp://send?text=${encodedUploadedImgUrl}" title="Share to Whatsapp" target="_blank" onclick="window.open(whatsapp://send?text=${encodedUploadedImgUrl});
      // document.querySelector('.user-msg').style.display = 'none'; document.querySelector('.share-container').style.display = 'none';  return false;">
      //    Share   
      // </a>`

      document.querySelector('.share-container').innerHTML = `
      <a class="share-to-whatsapp-btn" href="whatsapp://send?${encodedUploadedImgUrl}" data-action="share/whatsapp/share">
         Share   
      </a>`
  }
  
  doShareImg(imgDataUrl, onSuccess);
})
}

function doShareImg(imgDataUrl, onSuccess) {

  const formData = new FormData();
  formData.append('img', imgDataUrl)
  console.log ('imgDataUrl from doShareToFbImg func', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
      method: 'POST',
      body: formData
  })
  .then(res => res.text())
  .then((url)=>{
      console.log('Got back live url:', url);
      onSuccess(url)
  })
  .catch((err) => {
      console.error(err)
  })
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
  addSwitchTextLineEventListener();
  addBackToGalleryLogoLinkEventListener();
  addDownloadCanvasEventListener();
  addShareToFacebookEventListener();
  addShareToWhatsappEventListener();
}


  // <input class="controller" id="meme-text" placeholder="Text line 1"><br>
  // <!-- <button class="move-line-down">↧</button>
  // <button class="move-line-up">↥</button> -->  <!-- IN DESKTOP MODE!-->

  // <button class="controller" id="add-text-line"><img src="assets/controller-symbols/add/add.jpg"></button>
  // <button class="controller" id="delete-text-line"><img src="assets/controller-symbols/trash/trash.jpg"></button><br>
  // <button class="controller" id="change-font-family">IMPACT</button>
  // <!-- stickers! -->

  // TODO: adding the line up / down buttons to desktop mode
  // TODO: handle moving line up / down
  // TODO: handle switching text line
  // TODO: handle delete text line
  // TODO: handle change font
  // TODO: handle share canvas
  // TODO: add functionality to header links (+ in hamburger)
  
  // TODO: when decrease font size, it also changes it's y axis toward the start. 
  // to make sure increasing the font size afterwards doesnt take the text out of boundaries

  // TODO: fixing a bug - switching to the second line(the bottom one) in the switch lines function
  // makes the initial text dissappear, and the the new text line doesnt appear

  // TODO: added a rectangle around the text. fix it so it would grow with the font growth.
  // TODO: to add a rectangle for every new line


  // TODO: to implement the following function - should fix the canvas getting disfigured when changing screen width.
  // allso make sure it fixes height problems


  // function resizeCanvas() {
  // var elContainer = document.querySelector('.canvas-container');
  // // Note: changing the canvas dimension this way clears the canvas
  // gCanvas.width = elContainer.offsetWidth - 20
  // // Unless needed, better keep height fixed.
  // //   gCanvas.height = elContainer.offsetHeight
// }

