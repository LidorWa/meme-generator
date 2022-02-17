'use strict'


// will handle the gallery's MODEL

let gImgs = [];
let gImgId = 1;

createImages();

function createImage(keyword, fullImageName){
    return {
        id: gImgId++,
        url: `assets/images/${fullImageName}`,
        keyword,
    }
}

function createImages(){
    gImgs.push(createImage(['politics','trump','hot blonde'], '1.jpg'));
    gImgs.push(createImage(['animal','dog','puppie', 'cute'], '2.jpg'));
    gImgs.push(createImage(['animal','dog','baby','puppie', 'cute'], '3.jpg'));
    gImgs.push(createImage(['animal','cat','cute'], '4.jpg'));
    gImgs.push(createImage(['baby','strong','angry'], '5.jpg'));
    gImgs.push(createImage(['man','alien','history'], '6.jpg'));
    gImgs.push(createImage(['baby','shock'], '7.jpg'));
    gImgs.push(createImage(['hat','charlie','tell me more', 'interested'], '8.jpg'));
    gImgs.push(createImage(['baby','devious','manipulativ', 'sneakie'], '9.jpg'));
    gImgs.push(createImage(['politics','obama','laugh'], '10.jpg'));
}


function sendImgsToDom(){
    return gImgs;
}

function getImgFromGallery(memeImgId){
    console.log('memeImgId', memeImgId);

    let imgId = gImgs.findIndex((img) =>{ 
        return Number(memeImgId) === img.id
    });

    console.log('imgId', imgId);
    return gImgs[imgId];
}

function getImgSrcById(id) {
    return gImgs.find(img => Number(id) === img.id).url;
}


// TODO: what happens if png image with transparent background is used.
// I think after renderCanvas you'll still see the previous canvas