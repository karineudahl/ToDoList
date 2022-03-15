import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage.js";
import { toDoList } from "../settings/variables.js";

export function createList() {
    const listContainer = document.querySelector("ul"); 
    const listItems = getFromLocalStorage(toDoList); 

    listContainer.innerHTML = ""; 

    listItems.forEach(function(listItem) {
        let checked = ""; 

        if(listItem.complete) {
            checked = "checked"; 
        }
        listContainer.innerHTML += `<li>
                                        <input ${checked} class="checkbox" type="checkbox" data-id="${listItem.id}" />
                                        <input class="${checked}" type="text" value="${listItem.item}" data-id="${listItem.id}"></input>
                                    </li>`
    }); 

    const checkboxes = document.querySelectorAll(".checkbox"); 
    const textBoxes = document.querySelectorAll("li input[type=text]");

    textBoxes.forEach(function(textbox) {
        textbox.addEventListener("keyup", updateValue); 
    })

    function updateValue() {
        const id = this.dataset.id; 
        const value = this.value.trim(); 

        const updatedList = updateValueInList(listItems, id, value); 
        saveToLocalStorage(toDoList, updatedList);
        console.log(updatedList)
    }

    checkboxes.forEach(function(box) {
        box.addEventListener("click", checkbox);
    });  

    function checkbox() {
        const id = this.dataset.id;
        const checked = this.checked; 
    
        const updatedList = checkboxUpdateList(listItems, id, checked); 
        saveToLocalStorage(toDoList, updatedList); 
        createList(updatedList);
    }
}


function updateValueInList(listItems, id, value) {
    const itemIndex = listItems.findIndex((item) => item.id === parseInt(id)); 
    listItems[itemIndex].item = value; 
    return listItems; 
}


function checkboxUpdateList(listItems, id, checked) {
    const thisItemIndex = listItems.findIndex(function(item) {
        if(item.id === parseInt(id)) {
            return true; 
        }
    }); 

    listItems[thisItemIndex].complete = checked; 
    return listItems; 
}