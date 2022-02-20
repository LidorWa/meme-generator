'use strict'

// will handle the meme's MODEL

let gSavedMemes = [];

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 24,
            align: 'left',
            fillColor: 'white',
            strokeColor: 'black',
            font: 'IMPACT',
            posX: 1,
            posY: 20
        },         {
          txt: '',
          size: 24,
          align: 'left',
          fillColor: 'white',
          strokeColor: 'black',
          font: 'IMPACT',
          posX: 1,
          posY: 280
      }
    ]
  }


function getMemeFromService(){
    return gMeme;
  }

  function createNewLine({txt, size, align, fillColor, strokeColor, font, posX, posY}){
    return {
      txt: txt ? txt : '',
      size: size ? size : 16,
      align: align ? align : 'left',
      fillColor: fillColor ? fillColor : 'white',
      strokeColor: strokeColor ? strokeColor : 'black',
      font: font ? font : 'IMPACT',
      posX: posX ? posX : 1,
      posY: posY ? posY : 20
    }
  }

  function createNewLines(posY){
  
    gMeme.lines.push(createNewLine({posY}))
  }


  function deleteLines(currLine){
    if(!gMeme.lines || !gMeme.lines.length) {
      return;
    }

    gMeme.lines.splice(currLine, 1);
  }

  function resetMeme(){
    if (gMeme.lines.length > 2)  gMeme.splice (2)

    gMeme.lines.forEach((line,idx) => {
      line.txt = '';
      line.size = 24;
      line.align = 'left';
      line.fillColor = 'white';
      line.strokeColor = 'black';
      line.font = 'IMPACT';
      line. posX = 1;
      line.posY =  (idx === 1)? 280: 20; 
    })
  }

  function createSavedMemes(){

  }