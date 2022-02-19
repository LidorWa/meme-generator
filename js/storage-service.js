'use strict'

// will handle all the project's local storage


function saveToStorage(key,val){
    localStorage.setItem(key,JSON.stringify(val));
}



function loadFromStorage(key){
    var val = localStorage.getItem(key);
    return JSON.parse(val);
}