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
