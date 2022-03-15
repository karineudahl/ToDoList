import { simpleToDoList } from "./settings/variables.js";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage.js";

const listInput = document.querySelector(".simple-list-input"); 
const addButton = document.querySelector(".simple-add-button"); 
const listContainer = document.querySelector(".simple-list-ul"); 

let listFromInput = getFromLocalStorage(simpleToDoList); 

createSimpleList();

addButton.addEventListener("click", addItemToList); 

function addItemToList() {
    const newItem = listInput.value.trim(); 

    if(newItem.length > 1) {
        listFromInput.push(newItem);
        createSimpleList();
        saveToLocalStorage(simpleToDoList, listFromInput); 
        listInput.value = ""; 
        listInput.focus(); 
    }
}

function createSimpleList() {
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
    createSimpleList(); 
    saveToLocalStorage(simpleToDoList, listFromInput)
}