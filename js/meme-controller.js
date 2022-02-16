'use strict'

// will handle the meme's section DOM



function drawText(text, x, y) {
    // gCtx.font = '48px serif';
    // gCtx.fillText(text, x, y);
  
    gCtx.lineWidth = 1
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '20px Arial'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
  }



  function memeMouseListener(){
    let elEditorControllers = document.querySelectorAll('.controller');
    

    elEditorControllers.forEach(elController => elEditorControllers.addEventListener('click', (event) => {
        
    }));
}
