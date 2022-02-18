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
    gImgs.push(createImage(['politics','usa','america','trump','president','hot blonde'], '1.jpg'));
    gImgs.push(createImage(['animal','dog','puppie', 'cute'], '2.jpg'));
    gImgs.push(createImage(['animal','dog','baby','puppie', 'cute'], '3.jpg'));
    gImgs.push(createImage(['animal','cat','cute'], '4.jpg'));
    gImgs.push(createImage(['baby','strong','angry'], '5.jpg'));
    gImgs.push(createImage(['man','alien','history'], '6.jpg'));
    gImgs.push(createImage(['baby','shock'], '7.jpg'));
    gImgs.push(createImage(['hat','charlie','tell me more', 'interested'], '8.jpg'));
    gImgs.push(createImage(['baby','devious','manipulativ', 'sneakie'], '9.jpg'));
    gImgs.push(createImage(['politics','obama','president','usa','america','laugh'], '10.jpg'));
    gImgs.push(createImage(['love','man','box'], '11.jpg'));
    gImgs.push(createImage(['man','television','tv','point','haim', 'hecht'], '12.jpg'));
    gImgs.push(createImage(['man','glass','movie','salute', 'leonardo','dicaprio'], '13.jpg'));
    gImgs.push(createImage(['man','movie','matrix','morpheus','laurence', 'fishburne'], '14.jpg'));
    gImgs.push(createImage(['man','movie','lord','rings','boromir','sean','bean'], '15.jpg'));
    gImgs.push(createImage(['man','movie','star','trek','sir','patrick','stewart', 'jean', 'luc', 'picard'], '16.jpg'));
    gImgs.push(createImage(['politics','russia', 'vladimir','putin','kgb','president'], '17.jpg'));
    gImgs.push(createImage(['toys','movie','toy','story','baz','lightyear',
    'tim','allen','sherrif','woodie','tom','hanks', 'vladimir','putin','kgb','president'], '18.jpg'));
}


function sendImgsToDom(){
    return gImgs;
}

function getImgFromGallery(memeImgId){
    let imgId = gImgs.findIndex((img) =>{ 
        return Number(memeImgId) === img.id
    });

    return gImgs[imgId];
}

function getImgSrcById(id) {
    return gImgs.find(img => Number(id) === img.id).url;
}

// function getKeywords(keyword){

// }


// TODO: what happens if png image with transparent background is used.
// I think after renderCanvas you'll still see the previous canvas