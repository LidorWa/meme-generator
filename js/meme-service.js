'use strict'

// will handle the meme's MODEL
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
            xPos: 0,
            yPos: 20
        },         {
          txt: '',
          size: 16,
          align: 'left',
          fillColor: 'white',
          strokeColor: 'black',
          xPos: 0,
          yPos: 0
      }
    ]
  }

function getMemeFromService(){
    return gMeme;
  }
