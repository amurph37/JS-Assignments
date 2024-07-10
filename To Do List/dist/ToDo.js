"use strict";
// src/app.ts
// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        // Add click event listener to remove the task when clicked
        listItem.addEventListener("click", function () {
            this.remove();
        });
        // Append the new list item to the task list
        taskList.appendChild(listItem);
        // Clear the input box
        taskInput.value = "";
    }
}
