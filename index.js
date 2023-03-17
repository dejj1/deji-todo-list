// Selecting elements from the HTML
const todoList = document.getElementById('todo-list');
const addItemForm = document.querySelector('form');
const newItemInput = document.getElementById('new-task');

// Load items from localStorage on page load
if (localStorage.getItem('items')) {
    todoList.innerHTML = localStorage.getItem('items');
}

// Add new task to the list
addItemForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent form submission

    const newItemValue = newItemInput.value.trim();

    // check if input value is empty
    if (newItemValue === '') {
        alert('Value cannot be empty!');
        return;
    }

    // create new item and append to the top of the list
    const newItem = document.createElement('li');
    newItem.innerHTML = `
        <label for="list">${newItemValue}</label>
        <button class="edit">Edit<i class="fas fa-edit"></i></button>
        <button class="delete">Delete<i class="fa fa-trash"></i></button>
        `;
        todoList.prepend(newItem);

    // reset input field and save new items to localStorage
    newItemInput.value = '';
    localStorage.setItem('items', todoList.innerHTML);
    });

    // Remove an item from the list when delete button is clicked
    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const item = event.target.parentElement;
            todoList.removeChild(item);
            localStorage.setItem('items', todoList.innerHTML);
        }

    });

    // Edit an item in the list when the edit button is clicked
    todoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit')) {
            const label = event.target.previousElementSibling;
            const input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('value', label.innerText);
            label.replaceWith(input);
            event.target.innerHTML = '<i class="fas fa-check"></i>';

            // Save the edited value when the input field loses focus
            input.addEventListener('blur', () => {
                label.innerText = input.value;
                input.replaceWith(label);
                event.target.innerHTML = '<i class="fas fa-edit"></i>';
                localStorage.setItem('items', todoList.innerHTML);
            });

            // Save the edited value when the Enter key is pressed
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    label.innerText = input.value;
                    input.replaceWith(label);
                    event.target.innerHTML = '<i class="fas fa-edit"></i>';
                    localStorage.setItem('items', todoList.innerHTML);
                }
            });
        }
    });
