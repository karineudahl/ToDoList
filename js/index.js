import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage.js";
import { toDoList } from "./settings/variables.js";

const listInput = document.querySelector("input"); 
const button = document.querySelector("button"); 

const listItems = getFromLocalStorage(toDoList); 
createList(listItems);

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

function createList() {
    const listContainer = document.querySelector("ul"); 
    listContainer.innerHTML = ""; 

    listItems.forEach(function(listItem) {
        let checked = ""; 

        if(listItem.complete) {
            checked = "checked"; 
        }
        listContainer.innerHTML += `<li><input ${checked} type="checkbox" data-id="${listItem.id}" /><span class="${checked}">${listItem.item}</span></li>`
    }); 

    const checkboxes = document.querySelectorAll("li input"); 

    checkboxes.forEach(function(box) {
        box.addEventListener("click", toggelComplete);
    }); 

    function toggelComplete(event) {
        const id = event.target.dataset.id;
        const checked = event.target.checked; 
    
        const updatedList = updateList(listItems, id, checked); 
        saveToLocalStorage(toDoList, updatedList); 
        createList(updatedList);
    }
}

function updateList(listItems, id, checked) {
    const thisItemIndex = listItems.findIndex(function(item) {
        if(item.id === parseInt(id)) {
            return true; 
        }
    }); 

    listItems[thisItemIndex].complete = checked; 
    return listItems; 
}







// const listInput = document.querySelector("input"); 
// const addButton = document.querySelector("button"); 
// const listContainer = document.querySelector("ul"); 

// const listKey = "input"; 
// let listFromInput = getFromLocalStorage(); 
// createList();
// addButton.addEventListener("click", addItemToList); 

// function addItemToList() {
//     const newItem = listInput.value.trim(); 

//     if(newItem.length > 1) {
//         listFromInput.push(newItem);
//         createList();
//         saveToLocalStorage(listFromInput); 
//         listInput.value = ""; 
//         listInput.focus(); 
//     }
// }

// function createList() {
//     listContainer.innerHTML = ""; 

//     listFromInput.forEach(function(item) {
//         listContainer.innerHTML += `<li>${item}<i class="fa fa-trash" data-item="${item}"></i></li>`; 
//     });

//     const listItems = document.querySelectorAll("li"); 
//     const trashCans = document.querySelectorAll("li i"); 

//     listItems.forEach(function (itemComplete) {
//         itemComplete.addEventListener("click", markComplete); 
//     });

//     trashCans.forEach(function(trash) {
//         trash.addEventListener("click", removeFromList); 
//     })
// }


// function markComplete() {
//     this.classList.toggle("complete"); 
// }

// function removeFromList() {
//     const deleteListItem = this.dataset.item; 
//     const listWithoutDeleted = listFromInput.filter(function(item) {
//         if(deleteListItem !== item) {
//             return true; 
//         }
//     }); 

//     listFromInput = listWithoutDeleted; 
//     createList(); 
// }

// function saveToLocalStorage(inputToSave) {
//     localStorage.setItem(listKey, JSON.stringify(inputToSave)); 
// }

// function getFromLocalStorage() {
//     const currentList = localStorage.getItem(listKey); 

//     if(!currentList) {
//         return []; 
//     }

//     return JSON.parse(currentList); 
// }