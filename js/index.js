import { saveToLocalStorage, getFromLocalStorage } from "./utils/localStorage.js";
import { toDoList } from "./settings/variables.js";
import { createList } from "./ui/createList.js";

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

    console.log(listItems);
}


// function createList() {
//     const listContainer = document.querySelector("ul"); 
//     listContainer.innerHTML = ""; 

//     listItems.forEach(function(listItem) {
//         let checked = ""; 

//         if(listItem.complete) {
//             checked = "checked"; 
//         }
//         listContainer.innerHTML += `<li>
//                                         <input ${checked} type="checkbox" data-id="${listItem.id}" />
//                                             <span class="${checked}">${listItem.item}</span>
//                                     </li>`
//     }); 

//     const checkboxes = document.querySelectorAll("li input"); 

//     checkboxes.forEach(function(box) {
//         box.addEventListener("click", checkbox);
//     });  

//     function checkbox(event) {
//         const id = event.target.dataset.id;
//         const checked = event.target.checked; 
    
//         const updatedList = updateList(listItems, id, checked); 
//         saveToLocalStorage(toDoList, updatedList); 
//         createList(updatedList);
//     }
// }

// function updateList(listItems, id, checked) {
//     const thisItemIndex = listItems.findIndex(function(item) {
//         if(item.id === parseInt(id)) {
//             return true; 
//         }
//     }); 

//     listItems[thisItemIndex].complete = checked; 
//     return listItems; 
// }





