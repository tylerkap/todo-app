function renderPage() {
    
    
    let sideBarContainer = document.getElementsByClassName('new-list-container')[0];
    
    sideBarContainer.innerHTML = '';
    let listSize = Object.keys(lists).length;
    let test = Object.keys(currentList).length; 

    for (const element in lists) {
        
        let newList = document.createElement('div');
        newList.setAttribute('id', `list-${element}`);
        let listTitle = document.createElement('h1');
        let title = document.createTextNode(lists[element].name);
        newList.classList.add('list-item');

        if (lists[element].active === true) {
            newList.classList.add('active');
        }
    
        listTitle.appendChild(title);
        newList.appendChild(listTitle);
        sideBarContainer.appendChild(newList);
    }

    
    if (listSize >= 1) {
        addTask.style.visibility = 'visible';
        listLoad.style.visibility = 'visible';
        todoWrapper.style.visibility = 'visible';
    }
  
    let taskTitle = document.getElementsByClassName('list-name')[0]; 
    
    listHeading = `<h1 class=heading-${currentList.position}>${currentList.name}</h1>`;
    listHeading += `<i id="listDelete" class="fa-solid fa-trash"></i>`;

    if (headingArray.length < listSize) {
        headingArray.push({position: currentList.position, text: listHeading});    
    }

    let checkIndex = headingArray.map(i => i.position).indexOf(currentList.position);
    taskTitle.innerHTML = '';
    taskTitle.innerHTML = headingArray[checkIndex].text;
    let taskContainer = document.getElementsByClassName('list')[0];
    taskContainer.innerHTML = '';

    for (let j = 0; j < currentList.todos.length; j++) {
        let list = document.getElementsByClassName('list')[0];
        
        let parent1 = document.createElement('div');
        parent1.setAttribute('id', `task-item-${j}`);
        parent1.setAttribute('class', 'task-item');
        let child1 = document.createElement('div');
        child1.setAttribute('class', 'task-description');
        child1.innerHTML = `<input type=checkbox id=taskItemCheckbox-${j} class=checkBox>
                            <h3 id=taskText-${j}>${currentList.todos[j].text}</h3>`;
        parent1.appendChild(child1);
        let child2 = document.createElement('div');
        child2.setAttribute('class', 'task-icons');
        child2.innerHTML = `<i id=todoEdit-${j} class="fa-solid fa-pen-to-square"></i>
                            <i id=todoDelete-${j} class="fa-solid fa-trash"></i>`;
        parent1.appendChild(child2);


        list.appendChild(parent1);

        let checkBoxElement = document.getElementById(`taskItemCheckbox-${j}`);
        let todoHeading = document.getElementById(`taskText-${j}`);

        if (currentList.todos[j].completed === true) {
            todoHeading.classList.add('line-through');
            checkBoxElement.checked = true;
        } 
        else {
            todoHeading.classList.remove('line-through');
        }


    }

    let isCompleted = false;

    for (let l = 0; l < currentList.todos.length; l++) {
       

        if (currentList.todos[l].completed === true) {
            isCompleted = true;
            break;
        }
    }

    let lastTodoString = `task-item-${currentList.todos.length - 1}`;
    let lastTodo = document.getElementById(lastTodoString);

    if (isCompleted) {
        let deleteAllWrapper = document.createElement('div');
        deleteAllWrapper.setAttribute('class', 'deleteAllTasksWrapper');
        deleteAllWrapper.innerHTML = `<button id="deleteAllTasks" class="deleteAllTasks">Delete All Completed Tasks</button>`;
        lastTodo.after(deleteAllWrapper);

    }

    save();
}

function addNewList() {
    
    let listInput = document.getElementById('list-name-input').value;
    let listId = listCount;

    if (listInput !== '' || listInput === undefined) {
        lists[listId] = {name: listInput, todos: [], active: false, position: listCount};
        currentList = lists[listId];

        for (const element in lists) {
            lists[element].active = false;
        }

        lists[listId].active = true;
        
        listCount++;
        renderPage();
        
    }
}

function addTodo() {

    let taskInput = document.getElementById('taskInput').value;
    

    if (taskInput !== '') {
        currentList.todos.push({text: taskInput, completed: false})
        renderPage();
    }
}

function removeList(objectKey) {
    let listSize = Object.keys(lists).length;
    delete lists[objectKey];
    
    if (headingArray.length === 1) {
        headingArray = [];
    } 
    else {
        let tempHeadingArray = [];
        
        let checkIndex = headingArray.map(i => i.position).indexOf(currentList.position)
        arrayIndex = parseInt(checkIndex);

        for (let m = 0; m < headingArray.length; m++) {
            if (m !== arrayIndex) {
                tempHeadingArray.push(headingArray[m]);
            }
        }

        headingArray = tempHeadingArray;
    }

    let firstKey;
    let lastKey;

    for (let key in lists) {
        firstKey = key;
        break;
    }

    for (let key in lists) {
        lastKey = key;
    }

    if (listSize === 1) {
        currentList = {};
        headingArray = [];
        let newList = document.getElementsByClassName('new-list-container')[0];
        newList.innerHTML = '';
        addTask.style.visibility = 'hidden';
        listLoad.style.visibility = 'hidden';
        todoWrapper.style.visibility = 'hidden';
        save();
    }
    else {
        currentList = lists[lastKey];
        currentList.active = true;
        renderPage();
    }  
}

function removeTodo(index) {

    const todoElement = document.getElementById(`task-item-${index}`);
    todoElement.classList.add('animate__hinge');
    
    currentList.todos.splice(index, 1);

    setTimeout(renderPage, 2000);
}

function editTodo(index) {
    let taskItem = document.getElementById(`task-item-${index}`);

    let editContainer = document.createElement('div');
    editContainer.setAttribute('class', 'edit-task-item');
    editContainer.innerHTML = `
        <input type="text" id="editTodoTextBox" name="editTodoTextBox" value="Enter new todo...">
        <button for="editTodoTextBox" id="editTodoButton">Edit</button>
        `;
    taskItem.after(editContainer);

    let editTodoButton = document.getElementById('editTodoButton');
    let editInput = document.getElementById('editTodoTextBox');
    editTodoButton.addEventListener('click', () => {
        let editText = editInput.value;
        currentList.todos[index].text = editText;
        currentList.todos[index].completed = false;
        renderPage();
    });
    
}

function markTodoCompleted(index) {

    currentList.todos[index].completed = true;
    renderPage();
}

function markTodoIncomplete(index) {
    currentList.todos[index].completed = false;
    renderPage();
}

function removeAllTodosCompleted() {
    filteredArray = [];

    currentList.todos.forEach((element) => {
        if (element.completed === false) {
            filteredArray.push(element);
        }
    });
    
    currentList.todos = filteredArray;
    
    renderPage();
}

function save() {
    localStorage.setItem('currentList', JSON.stringify(currentList)); 
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('listCount', listCount);
    localStorage.setItem('headingArray', JSON.stringify(headingArray));
}

let lists = {};
let currentList = {};
let headingArray = [];
let listCount = 1;
let addTask = document.getElementById('test');
let listLoad = document.getElementById('listLoad');
let todoWrapper = document.getElementById('list-container');
let listButton = document.getElementById('listButton');
addTask.style.visibility = 'hidden';
listLoad.style.visibility = 'hidden';
todoWrapper.style.visibility = 'hidden';


window.addEventListener('load', () => {

    const listCountStr = localStorage.getItem('listCount');
    
    if (listCountStr) {

        listCount = parseInt(listCountStr);

        
        let currentListStr = localStorage.getItem('currentList');
        let listsStr = localStorage.getItem('lists');
        let headingArrayStr = localStorage.getItem('headingArray');

        currentList = JSON.parse(currentListStr);
        lists = JSON.parse(listsStr);
        headingArray = JSON.parse(headingArrayStr);

        renderPage();
        
    }
});


let listContainer = document.getElementsByClassName('new-list-container')[0];

listContainer.addEventListener('click', (event) => {
    let element = event.target;
    if (element.classList.contains('list-item')) {
        
        let idString = element.getAttribute('id');
        let idSanitize = idString.replace(/[^0-9]/g, '');

        currentList = lists[idSanitize];

        for (const element in lists) {
            lists[element].active = false;
        }

        lists[idSanitize].active = true;
        renderPage();
    }
});


let listNameContainer = document.getElementsByClassName('list-name')[0];

listNameContainer.addEventListener('click', (event) => {
    let element = event.target;

    if (element.classList.contains('fa-trash')) {
        let heading = listNameContainer.firstElementChild; 
        let headingId = heading.className.replace(/[^0-9]/g, '');
        removeList(headingId);
    }
});


let taskInput = document.getElementById('taskInput')

let taskButton = document.getElementById('taskButton');
taskButton.addEventListener('click', () => {
    let taskInput = document.getElementById('taskInput');
    addTodo();
    taskInput.value = '';
});

taskInput.addEventListener('keypress', () => {
    if (event.key === 'Enter') {
        event.preventDefault()
        taskButton.click();
    }
});


let todoContainer = document.getElementsByClassName('list')[0];

todoContainer.addEventListener('click', (event) => {
    element = event.target;

    if (element.classList.contains('fa-trash')) {
        let  todoId = element.getAttribute('id');
        let todoIndex = todoId.replace(/[^0-9]/g, '');
        removeTodo(todoIndex);
    }
});

todoContainer.addEventListener('click', (event) => {
    element = event.target;

    if (element.classList.contains('fa-pen-to-square')) {
        let  todoId = element.getAttribute('id');
        let todoIndex = todoId.replace(/[^0-9]/g, '');
        editTodo(todoIndex);
    }
});

todoContainer.addEventListener('click', (event) => {
    element = event.target;
   
    if (element.classList.contains('checkBox')) {
        let  todoId = element.getAttribute('id');
        let todoIndex = todoId.replace(/[^0-9]/g, '');
    
        if (element.checked) {
            markTodoCompleted(todoIndex);

        }
        else {
            markTodoIncomplete(todoIndex);
        }
    }
});


todoContainer.addEventListener('click', (event) => {
    element = event.target;

    if (element.classList.contains('deleteAllTasks')) {
        removeAllTodosCompleted();
    }
});


let listInput = document.getElementById('list-name-input')

listInput.addEventListener('keypress', () => {
    if (event.key === "Enter") {
        event.preventDefault()
        listButton.click();
    }

});


listButton.addEventListener('click', () => {
    let listInput = document.getElementById('list-name-input');
    addNewList();
    listInput.value = '';

});


