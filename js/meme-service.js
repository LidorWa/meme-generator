'use strict'

// will handle the meme's MODEL

let gSavedMemes = [];

let gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 16,
            align: 'left',
            fillColor: 'white',
            strokeColor: 'black',
            font: 'IMPACT',
            posX: 1,
            posY: 20
        },         {
          txt: '',
          size: 16,
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

  function createNewLine(txt = '', size = 16, align = 'left', fillColor = 'white', strokeColor = 'black', font = 'IMPACT', posX = 1, posY = 20){
    return {
      txt: txt,
      size: size,
      align: align,
      fillColor: fillColor,
      strokeColor: strokeColor,
      font: font,
      posX: posX,
      posY: posY
    }
  }

  function createNewLines(posY){
  
    gMeme.lines.push(createNewLine(posY))
  }


  function deleteLines(currLine){
    if(!gMeme.lines || !gMeme.lines.length) {
      return;
    }

    gMeme.lines.splice(currLine, 1);
  }

  function createSavedMemes(){

  }