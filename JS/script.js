function renderPage() {
    let sideBarContainer = document.getElementsByClassName('new-list-container')[0];
    let listSize = Object.keys(lists).length;
    sideBarContainer.innerHTML = '';

    for (const element in lists) {
        
        let newList = document.createElement('div');
        newList.setAttribute('id', `list-${element}`);
        let listTitle = document.createElement('h1');
        let title = document.createTextNode(lists[element].name);
        newList.classList.add('list-item');
        listTitle.appendChild(title);
        newList.appendChild(listTitle);
        sideBarContainer.appendChild(newList);
    }

    addTask.style.visibility = 'visible';
    listLoad.style.visibility = 'visible';

    console.log(currentList);
    console.log(currentList.name);

    let taskTitle = document.getElementsByClassName('list-name')[0];    
    
    listHeading = `<h1 class=heading-${listSize}>${currentList.name}</h1>`;
    listHeading += `<i id="listDelete" class="fa-solid fa-trash"></i>`;
    
    console.log(listHeading);

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
        lists[listId] = {name: listInput, todos: []};
        currentList = lists[listId];
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

function removeList() {

}



const lists = {};
let currentList = {};

let listCount = 1;
let addTask = document.getElementById('test');
let listLoad = document.getElementById('listLoad');
let listButton = document.getElementById('listButton');
addTask.style.visibility = 'hidden';
listLoad.style.visibility = 'hidden';


let headingArray = [];

let listContainer = document.getElementsByClassName('new-list-container')[0];

listContainer.addEventListener('click', (event) => {
    let element = event.target;
    if (element.classList.contains('list-item')) {
        
        let listArray = document.querySelectorAll('.list-item');
        let idString = element.getAttribute('id');
        let idSanitize = idString.charAt(idString.length - 1);

        currentList = lists[idSanitize];
        console.log(currentList);

        for (let i = 0; i < listArray.length; i++) {
            console.log(listArray[i]);
            listArray[i].classList.remove('active');

        }

        element.classList.toggle('active');
        
        renderPage();
    }
});


let taskButton = document.getElementById('taskButton');
taskButton.addEventListener('click', () => {
    addTodo();
});



listButton.addEventListener('click', addNewList);