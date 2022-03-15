import { simpleToDoList } from "./settings/variables.js";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage.js";

const listInput = document.querySelector("input"); 
const addButton = document.querySelector("button"); 
const listContainer = document.querySelector("ul"); 

let listFromInput = getFromLocalStorage(simpleToDoList); 

createList();

addButton.addEventListener("click", addItemToList); 

function addItemToList() {
    const newItem = listInput.value.trim(); 

    if(newItem.length > 1) {
        listFromInput.push(newItem);
        createList();
        saveToLocalStorage(simpleToDoList, listFromInput); 
        listInput.value = ""; 
        listInput.focus(); 
    }
}

function createList() {
    listContainer.innerHTML = ""; 

    listFromInput.forEach(function(item) {
        listContainer.innerHTML += `<li><i class="fas fa-times" data-item="${item}"></i>${item}</li>`; 
    });

    const trashCans = document.querySelectorAll("li i"); 


    trashCans.forEach(function(trash) {
        trash.addEventListener("click", removeSingelItemFromList); 
    })
}


function removeSingelItemFromList() {
    const deleteListItem = this.dataset.item; 
    const listWithoutDeleted = listFromInput.filter(function(item) {
        if(deleteListItem !== item) {
            return true; 
        }
    }); 

    listFromInput = listWithoutDeleted; 
    createList(); 
    saveToLocalStorage(simpleToDoList, listFromInput)
}