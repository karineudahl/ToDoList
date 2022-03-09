const listInput = document.querySelector("input"); 
const addButton = document.querySelector("button"); 
const listContainer = document.querySelector("ul"); 

const listKey = "input"; 
let listFromInput = getFromLocalStorage(); 
createList();
addButton.addEventListener("click", addItemToList); 

function addItemToList() {
    const newItem = listInput.value.trim(); 

    if(newItem.length > 1) {
        listFromInput.push(newItem);
        createList();
        saveToLocalStorage(listFromInput); 
        listInput.value = ""; 
        listInput.focus(); 
    }
}

function createList() {
    listContainer.innerHTML = ""; 

    listFromInput.forEach(function(item) {
        listContainer.innerHTML += `<li>${item}<i class="fa fa-trash" data-item="${item}"></i></li>`; 
    });

    const listItems = document.querySelectorAll("li"); 
    const trashCans = document.querySelectorAll("li i"); 

    // listItems.forEach(function (itemComplete) {
    //     itemComplete.addEventListener("click", markComplete); 
    // });

    trashCans.forEach(function(trash) {
        trash.addEventListener("click", removeFromList); 
    })
}


// function markComplete() {
//     this.classList.toggle("complete"); 
// }

function removeFromList() {
    const deleteListItem = this.dataset.item; 
    const listWithoutDeleted = listFromInput.filter(function(item) {
        if(deleteListItem !== item) {
            return true; 
        }
    }); 

    listFromInput = listWithoutDeleted; 
    createList(); 
}

function saveToLocalStorage(inputToSave) {
    localStorage.setItem(listKey, JSON.stringify(inputToSave)); 
}

function getFromLocalStorage() {
    const currentList = localStorage.getItem(listKey); 

    if(!currentList) {
        return []; 
    }

    return JSON.parse(currentList); 
}