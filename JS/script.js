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

    addTask.style.visibility = 'visible';
    listLoad.style.visibility = 'visible';
    todoWrapper.style.visibility = 'visible';

    let taskTitle = document.getElementsByClassName('list-name')[0]; 
    
    listHeading = `<h1 class=heading-${currentList.position}>${currentList.name}</h1>`;
    listHeading += `<i id="listDelete" class="fa-solid fa-trash"></i>`;


    

    if (headingArray.length < listSize) {
        headingArray.push({position: currentList.position, text: listHeading});    
    }

    console.log(`headingArrayLength: ${headingArray.length}`);
    console.log(headingArray);
    console.log(currentList);

    if (test !== "0") {
        let checkIndex = headingArray.map(i => i.position).indexOf(currentList.position);
        console.log(`Index: ${checkIndex}`);
        taskTitle.innerHTML = '';
        taskTitle.innerHTML = headingArray[checkIndex].text;
    }

    
    

    let taskContainer = document.getElementsByClassName('list')[0];
    taskContainer.innerHTML = '';

    for (let j = 0; j < currentList.todos.length; j++) {
        taskContainer.innerHTML += 
        `
            <div id=task-item-${j} class=task-item>
                <div class=task-description>
                    <input type=checkbox id=taskItemCheckbox name=taskItemCheckbox>
                    <h3>${currentList.todos[j].text}</h3>
                </div>
                <div class=task-icons>
                    <i id=todoEdit-${j} class="fa-solid fa-pen-to-square"></i>
                    <i id=todoDelete-${j} class="fa-solid fa-trash"></i>
                </div>
            </div>
        `; 
    }
}



function addNewList() {
    
    let listInput = document.getElementById('list-name-input').value;
    let listId = listCount;

    console.log(`ListCount: ${listId}`)
    

    if (listInput !== '' || listInput === undefined) {
        lists[listId] = {name: listInput, todos: [], active: false, position: listCount};
        currentList = lists[listId];

        console.log(currentList)

        for (const element in lists) {
            lists[element].active = false;
        }

        lists[listId].active = true;
        
        renderPage();
        listCount++;
        
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

    console.log("REMOVE LIST TESTING");


    
    if (headingArray.length === 1) {
        headingArray = [];
    } 
    else {
        let checkIndex = headingArray.map(i => i.position).indexOf(currentList.position)
        arrayIndex = parseInt(checkIndex);
        console.log(`CHECK INDEX: ${arrayIndex}`)
        headingArray.splice(arrayIndex, 1);
        console.log(arrayIndex);
    }

    console.log(objectKey);
    console.log(lists);

    let firstKey;
    let lastKey;

    for (let key in lists) {
        firstKey = key;
        break;
    }

    for (let key in lists) {
        lastKey = key;
    }

    console.log(`FirstKey: ${firstKey}`);
    console.log(`ObjectKey: ${objectKey}`);
    console.log(`ListSize: ${listSize}`);

    if (listSize === 1) {
        
        currentList = {};
        let newList = document.getElementsByClassName('new-list-container')[0];
        newList.innerHTML = '';
        console.log(newList.innerHTML);
        console.log(`CurrentList: ${JSON.stringify(currentList)}`)
        addTask.style.visibility = 'hidden';
        listLoad.style.visibility = 'hidden';
        todoWrapper.style.visibility = 'hidden';
        listSize--;
    }
    else {
        currentList = lists[lastKey];
        currentList.active = true;
        listSize--;
        renderPage();
    }  
}

function removeTodo(index) {

    currentList.todos.splice(index, 1);

    renderPage();
}

function editTodo(index) {
    let taskItem = document.getElementById(`task-item-${index}`);
    alert(taskItem.innerHTML);

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
        alert(editText);
        renderPage();
    });
    
}





const lists = {};
let currentList = {};
let headingArray = [];
let listCount = 1;
let addTask = document.getElementById('test');
let listLoad = document.getElementById('listLoad');
let todoWrapper = document.getElementById('list-container');
let listButton = document.getElementById('listButton');
addTask.style.visibility = 'hidden';
listLoad.style.visibility = 'hidden';
todoWrapper.style.visibility = 'visible';


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

        console.log(idSanitize);
        lists[idSanitize].active = true;
        renderPage();
    }
});


let listNameContainer = document.getElementsByClassName('list-name')[0];

listNameContainer.addEventListener('click', (event) => {
    let element = event.target;

    if(element.classList.contains('fa-trash')) {
        let heading = listNameContainer.firstElementChild; 
        let headingId = heading.className.replace(/[^0-9]/g, '');
        removeList(headingId);
    }
});




let taskButton = document.getElementById('taskButton');
taskButton.addEventListener('click', () => {
    addTodo();
});


let todoContainer = document.getElementsByClassName('list')[0];

todoContainer.addEventListener('click', (event) => {
    element = event.target;

    if(element.classList.contains('fa-trash')) {
        let  todoId = element.getAttribute('id');
        let todoIndex = todoId.replace(/[^0-9]/g, '');
        console.log(todoIndex);
        removeTodo(todoIndex);
    }
});

todoContainer.addEventListener('click', (event) => {
    element = event.target;

    if(element.classList.contains('fa-pen-to-square')) {
        let  todoId = element.getAttribute('id');
        let todoIndex = todoId.replace(/[^0-9]/g, '');
        console.log(todoIndex);
        editTodo(todoIndex);
    }
});



listButton.addEventListener('click', addNewList);