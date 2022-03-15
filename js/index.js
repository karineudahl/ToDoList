import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage.js";
import { toDoList } from "./settings/variables.js";
import { createList } from "./ui/createList.js";
import { deleteAllToDoes } from "./ui/deleteAllToDoes.js";

const listInput = document.querySelector("input"); 
const button = document.querySelector("button"); 

const listItems = getFromLocalStorage(toDoList); 
createList(listItems);
deleteAllToDoes(); 

button.addEventListener("click", addItem); 

function addItem() {
    const itemValue = listInput.value.trim(); 

    if(itemValue.length >= 1) {
        const newItem = {id: Date.now(), item: itemValue}; 
        listInput.value = ""; 
        listInput.focus();
        listItems.push(newItem); 

        createList(listItems);
        saveToLocalStorage(toDoList, listItems);
    }
}






