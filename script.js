let btn = document.getElementById("btn");
let input = document.getElementById("todo-input");
let todoList = document.getElementById("todoList");
btn.addEventListener("click", function (event) {
  let todoText = input.value;
  if (todoText) {
    //   create a new todo item
    const todoItem = document.createElement("div");
    const todoItemBtnDiv = document.createElement("div");
    todoItem.innerText = todoText;
    todoItem.classList.add("todo-style");
    todoItem.appendChild(todoItemBtnDiv);
    // add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", () => {
      todoList.removeChild(todoItem);
      saveList();
    });
    todoItemBtnDiv.appendChild(deleteBtn);

    // for edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn");

    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit this item: ", todoText);
      if (newText) {
        todoItem.innerText = newText;
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
          todoList.removeChild(todoItem);
          saveList();
        });
        todoItemBtnDiv.appendChild(deleteBtn);
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click", () => {
          const newText = prompt("Edit this item: ", todoText);
          if (newText) {
            todoItem.innerText = newText;
            saveList();
          }
        });
        todoItemBtnDiv.appendChild(editBtn);

        saveList();
      }
    });
    todoItemBtnDiv.appendChild(editBtn);

    // to ensure the recent item appears first
    const firstTodoItem = todoList.firstChild;
    todoList.insertBefore(todoItem, firstTodoItem);
    // clear the input
    input.value = "";
    // save to do list to local storage
    saveList();
  }
  // to save todo list to local storage
  function saveList() {
    const todoItems = [];
    const todoItemElements = todoList.querySelectorAll(".todo-style");
    todoItemElements.forEach((todoItemElement) => {
      todoItems.push(todoItemElement.innerText);
    });
    localStorage.setItem("todoList", JSON.stringify(todoItems));
  }
});
