import { deleteItemFromStorage } from "../utils/localStorage.js";
import { toDoList } from "../settings/variables.js";
import { createList } from "./createList.js";

export function deleteAllToDoes() {
    const deleteAll = document.querySelector("#clear");  

    deleteAll.addEventListener("click", clearList); 

    function clearList() {
        if(confirm("Delete to does?")) {
            deleteItemFromStorage(toDoList);
            location.reload();
            createList([]);
        }     
    }
}