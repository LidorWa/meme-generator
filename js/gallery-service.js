'use strict'


// will handle the gallery's MODEL

let gImgs = [];
let gImgId = 1;

createImages();

function createImage(keyword){
    return {
        id: gImgId++,
        url: `assets/images/${gImgId-1}.jpg`,
        keyword,
    }
}

function createImages(){
    gImgs.push(createImage(['politics','trump','hot blonde']));
    gImgs.push(createImage(['animals','dogs','puppies', 'cute']));
    gImgs.push(createImage(['animals','dogs','babys','puppies', 'cute']));
    gImgs.push(createImage(['animals','cats','cute']));
}


function sendImgsToDom(){
    return gImgs;
}