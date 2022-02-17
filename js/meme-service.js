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
            color: 'red'
        }
    ]
  }

function getMemeFromService(){
    console.log('gMeme', gMeme);
    return gMeme;
  }
