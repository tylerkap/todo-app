function renderPage() {
    let sideBarContainer = document.getElementsByClassName('new-list-container')[0];
    
    sideBarContainer.innerHTML = '';

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

    let taskTitle = document.getElementsByClassName('list-name')[0];    
    
    listHeading = `<h1 class=heading-${listSize}>${currentList.name}</h1>`;
    listHeading += `<i id="listDelete" class="fa-solid fa-trash"></i>`;

    if (headingArray.length < listSize) {
        headingArray.push(listHeading);    
    }

    taskTitle.innerHTML = '';
    taskTitle.innerHTML = listHeading;

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
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `; 
    }

}



function addNewList() {
    
    let listInput = document.getElementById('list-name-input').value;
    let listId = listCount;
    

    if (listInput !== '' || listInput === undefined) {
        lists[listId] = {name: listInput, todos: [], active: false};
        currentList = lists[listId];

        for (let i = 1; i <= listCount; i++) {
            lists[i].active = false;
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

function removeList() {

}



const lists = {};
let currentList = {};
let headingArray = [];
let listSize = Object.keys(lists).length;
let listCount = 1;
let addTask = document.getElementById('test');
let listLoad = document.getElementById('listLoad');
let listButton = document.getElementById('listButton');
addTask.style.visibility = 'hidden';
listLoad.style.visibility = 'hidden';


let listContainer = document.getElementsByClassName('new-list-container')[0];

listContainer.addEventListener('click', (event) => {
    let element = event.target;
    if (element.classList.contains('list-item')) {
        
        let listArray = document.querySelectorAll('.list-item');
        let idString = element.getAttribute('id');
        let idSanitize = idString.charAt(idString.length - 1);

        currentList = lists[idSanitize];

        for (let i = 1; i <= listArray.length; i++) {
            lists[i].active = false;
        }

        lists[idSanitize].active = true;
        renderPage();
    }
});


let taskButton = document.getElementById('taskButton');
taskButton.addEventListener('click', () => {
    addTodo();
});



listButton.addEventListener('click', addNewList);