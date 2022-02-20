'use strict'

// will handle the meme's section DOM

let gIsDownloadOrShare = false;


// functions handling the canvas appearance

function renderCanvas() {
  let meme = getMemeFromService();

  const imgSrc = getImgSrcById(meme.selectedImgId);

  const image = new Image(gCanvas.width, gCanvas.height);
  image.src = imgSrc;

  gCtx.drawImage(image, 0, 0, gCanvas.width, gCanvas.height);

  drawText();
}

function drawText() {
  let meme = getMemeFromService();

  meme.lines.forEach((line, idx) => {
    let linePos = getTextPosition(line);

    if (!gIsDownloadOrShare) drawRectBorderForText(line, idx);
    gCtx.lineWidth = 0.5;
    gCtx.font = `${line.size}px ${line.font}`;


    gCtx.fillStyle = line.fillColor;
    gCtx.fillText(line.txt, linePos.x, linePos.y);

    gCtx.strokeStyle = line.strokeColor;
    gCtx.strokeText(line.txt, linePos.x, linePos.y);
  })
}


function drawRectBorderForText(line, idx) {
  let meme = getMemeFromService();

  if (meme.selectedLineIdx === idx) gCtx.strokeStyle = 'red';
  else gCtx.strokeStyle = 'white';

  gCtx.setLineDash([10, 5]);
  gCtx.strokeRect(0, line.posY - line.size, gCanvas.width, line.size + 4);
  gCtx.setLineDash([]);
}

function getTextPosition(line) {
  let position = {};
  position.y = line.posY;

  if (line.align === 'left') {
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

// functions handling adding eventlisteners:

// writing to the canvas

function addTypeOnInputEventListener() {
  let elTextInput = document.getElementById('meme-text');

  elTextInput.addEventListener('input', (event) => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;
    meme.lines[line].txt = event.target.value;

    renderCanvas();
  });
}

// changing the text line height up and down

function addTextLineDownEventListener() {
  let elLineDownBtn = document.getElementById('move-line-down');

  elLineDownBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].posY += 2;

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  });
}


function addTextLineUpEventListener() {
  let elLineUpBtn = document.getElementById('move-line-up');

  elLineUpBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].posY -= 2;
    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  });
}

// increasing and decreasing font size

function addTextIncreaseFontSizeEventListener() {
  let elIncreaseBtn = document.getElementById('increase-font-size');

  elIncreaseBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].size += 0.5;

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();


    renderCanvas();
  });
}

function addTextDecreaseFontSizeEventListener() {
  let elIncreaseBtn = document.getElementById('decrease-font-size');

  elIncreaseBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let currLine = meme.selectedLineIdx;

    meme.lines[currLine].size -= 0.5;
    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  });
}

// adding and deleting lines

function addNewTextLineEventListener() {
  let elNewLineBtn = document.getElementById('add-text-line');

  elNewLineBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    if (!meme.lines || !meme.lines.length) {
      let elEnableController = document.querySelectorAll('.controller');
      elEnableController.forEach(enableController => {
        enableController.disabled = false;

      })
      let linePosY = 20;
      onCreateNewLines(linePosY);
      meme.selectedLineIdx = 0;
      renderCanvas();
    } else {
      let linePosY = gCanvas.height / 2;
      let currLine;

      onCreateNewLines(linePosY);
      meme.selectedLineIdx = meme.lines.length - 1;
      currLine = meme.selectedLineIdx;

      document.getElementsByName('meme-text')[0].placeholder = `Text line ${currLine + 1}`;
      document.getElementById('meme-text').value = (meme.lines[currLine].txt === '') ? '' : meme.lines[currLine].txt;
      if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
      renderCanvas();
    }
  })
}

function onCreateNewLines(linePosY) {
  createNewLines(linePosY);
}

function addDeleteTextLineEventListener() {
  let elDeleteLineBtn = document.getElementById('delete-text-line');

  elDeleteLineBtn.addEventListener('click', () => {

    let meme = getMemeFromService();

    let currLine = meme.selectedLineIdx;
    onDeleteLines(currLine);


    meme.selectedLineIdx = meme.lines.length - 1;
    currLine = meme.selectedLineIdx

    if (meme.lines && meme.lines.length > 0) {
      document.getElementsByName('meme-text')[0].placeholder = `Text line ${currLine + 1}`;
      document.getElementById('meme-text').value = (meme.lines[currLine].txt === '') ? '' : meme.lines[currLine].txt;
      // document.getElementById("meme-text").focus();
    } else {
      let elDisableController = document.querySelectorAll('.controller');
      elDisableController.forEach(disableController => {
        if (disableController.id !== 'add-text-line') disableController.disabled = 'true';
      })
    }
    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  })
}

function onDeleteLines(currLine) {
  deleteLines(currLine);
}

// changing text alignment

function addTextAlignLeftEventListener() {
  let elAlignLeftBtn = document.getElementById('align-text-left');

  elAlignLeftBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'left';

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();

    renderCanvas();
  })
}

function addTextAlignRightEventListener() {
  let elAlignLeftBtn = document.getElementById('align-text-right');

  elAlignLeftBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'right';

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  });
}

function addTextAlignCenterEventListener() {
  let elAlignLeftBtn = document.getElementById('align-text-center');

  elAlignLeftBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].align = 'center';

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  })
}

// changing text color (stroke and fill)

function addStrokeColorEventListener() {
  let elStrokeColorInput = document.querySelector('.stroke-color');

  elStrokeColorInput.addEventListener('input', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].strokeColor = elStrokeColorInput.value;

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  })
}

function addFillColorEventListener() {
  let elFillColorInput = document.querySelector('.fill-color');

  elFillColorInput.addEventListener('input', () => {
    let meme = getMemeFromService();
    let line = meme.selectedLineIdx;

    meme.lines[line].fillColor = elFillColorInput.value;

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();
  })
}

// switching text line

function addSwitchTextLineEventListener() {

  let switchTextLineBtn = document.getElementById('switch-text-line');

  switchTextLineBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    meme.selectedLineIdx = (meme.selectedLineIdx === (meme.lines.length - 1)) ? 0 : meme.selectedLineIdx + 1;
    let currLine = meme.selectedLineIdx;

    document.getElementsByName('meme-text')[0].placeholder = `Text line ${currLine + 1}`;
    document.getElementById('meme-text').value = (meme.lines[currLine].txt === '') ? '' : meme.lines[currLine].txt;

    if (checkisPageWidthDesktop()) document.getElementById("meme-text").focus();
    renderCanvas();

  })
}

// checking is page width mobile or desktop (for the input focus - canceled on mobiles to prevent the virtual keyboard from popping every time)

function checkisPageWidthDesktop() {
  return (window.innerWidth >= 555) ? true : false;
}

// download / share functions

function addDownloadCanvasEventListener() {

  let elDownloadBtn = document.getElementById('download-canvas');

  elDownloadBtn.addEventListener('click', () => {
    let meme = getMemeFromService();
    let memeId = meme.selectedImgId;
    
    gIsDownloadOrShare = true;
    renderCanvas();
    gIsDownloadOrShare = false;


    let elDownloadBtnA = document.getElementById('download-canvas-a');

    let imgContent = gCanvas.toDataURL('image/jpeg');

    elDownloadBtnA.href = imgContent;
    elDownloadBtnA.download = `canvas-img-${memeId}.jpg`;
    renderCanvas()
  })
}

function addShareToFacebookEventListener() {

  let elShareFbBtn = document.getElementById('share-canvas-fb');

  elShareFbBtn.addEventListener('click', () => {
    gIsDownloadOrShare = true;
    renderCanvas();
    gIsDownloadOrShare = false;

    let imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
      let encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

      document.querySelector('.user-msg').innerText = `Your photo is available here:`
      document.querySelector('.share-container').innerHTML = `<span onclick="onFacebookShareBtnClick('${uploadedImgUrl}')">
      <a class="share-to-fb-btn"   href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" 
      target="_blank">
         Share   
      </a></span>`
    }

    doShareImg(imgDataUrl, onSuccess);

  })
}

function onFacebookShareBtnClick(uploadedImgUrl) {
  renderCanvas();
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}`);
  document.querySelector('.user-msg').style.display = 'none'
  document.querySelector('.share-container').style.display = 'none';

  return false;
}

function addShareToWhatsappEventListener() {

  let elShareWhatsappBtn = document.getElementById('share-canvas-whatsapp');

  elShareWhatsappBtn.addEventListener('click', () => {

    let imgDataUrl = gCanvas.toDataURL("image/jpeg");

    function onSuccess(uploadedImgUrl) {
      let encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
      document.querySelector('.user-msg').innerText = `Your photo is available here:`

      // document.querySelector('.share-container').innerHTML = `
      // <a class="share-to-whatsapp-btn" href="whatsapp://send?text=${encodedUploadedImgUrl}" title="Share to Whatsapp" target="_blank" onclick="window.open(whatsapp://send?text=${encodedUploadedImgUrl});
      // document.querySelector('.user-msg').style.display = 'none'; document.querySelector('.share-container').style.display = 'none';  return false;">
      //    Share   
      // </a>`
      // console.log(encodedUploadedImgUrl);
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

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData
  })
    .then(res => res.text())
    .then((url) => {
      console.log('Got back live url:', url);
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

// getting the meme from meme service

function onGetImgFromGallery(memeId) {
  return getImgFromGallery(memeId);
}

// initializing the event listeners

function addMemeEventListeners() {
  addImageClickEventLisetner();
  addTypeOnInputEventListener();
  addTextIncreaseFontSizeEventListener();
  addTextDecreaseFontSizeEventListener();
  addTextAlignLeftEventListener();
  addTextAlignRightEventListener();
  addTextAlignCenterEventListener();
  addStrokeColorEventListener();
  addFillColorEventListener();
  addBackToGalleryLinkEventListener();
  addSwitchTextLineEventListener();
  addTextLineDownEventListener();
  addTextLineUpEventListener()
  addNewTextLineEventListener();
  addDeleteTextLineEventListener();
  addBackToGalleryLogoLinkEventListener();
  addDownloadCanvasEventListener();
  addShareToFacebookEventListener();

  // addShareToWhatsappEventListener();
}



