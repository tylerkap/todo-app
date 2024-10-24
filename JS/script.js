const testLists = {
    1: {
      name: "Shopping list",
      todos: [
        {
          text: 'bananas',
          completed: false
        },
        {
          text: '1 lbs ground turkey',
          completed: false
        }
      ]
    },
    2: {
        name: "Work",
        todos: [
          {
            text: 'email',
            completed: false
          },
          {
            text: 'code',
            completed: false
          }
        ]
    },
    3: {
        name: "Personal Project",
        todos: [
          {
            text: 'email',
            completed: false
          },
          {
            text: 'code',
            completed: false
          }
        ]
    }
}
const testCurrentList = testLists[1];
const lists = {};
let currentList = {};


let listCount = 1;
let listButton = document.getElementById('listButton');
listButton.addEventListener('click', addNewList);
let addTask = document.getElementById('test');
addTask.style.display = 'none'

function renderPage() {
    let sideBarContainer = document.getElementsByClassName('new-list-container')[0];
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
    
    currentList = activeList();

    console.log(currentList);

    let taskTitle = document.getElementsByClassName('list-name')[0];

    taskTitle.innerHTML = '';
    taskTitle.innerHTML = `<h1>${currentList.name}</h1>`;
    addTask.style.display = 'block';

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
    
    activeList();
}
        

function addNewList() {
    
    let listInput = document.getElementById('list-name-input').value;
    let listId = listCount;

    if (listInput !== '' || listInput === undefined) {
        lists[listId] = {name: listInput, todos: []};
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


function activeList() {
    let listArray = document.querySelectorAll('.list-item');
    console.log(listArray);
    
    listArray.forEach((element) => {
        element.addEventListener('click', () => {
            let idString = element.getAttribute('id');
            let idSanitize = idString.charAt(idString.length - 1);
            console.log(idSanitize);


            currentList = lists[idSanitize];
            console.log(element.getAttribute('id'))
            console.log(currentList);

            for (let i = 0; i < listArray.length; i++) {
                listArray[i].classList.remove('list-item-active');
            }

            element.classList.toggle('list-item-active');


            renderPage();
        });
    });

    return currentList;
}




let taskButton = document.getElementById('taskButton');
taskButton.addEventListener('click', () => {
    addTodo();
    renderPage();
});




// newList.addEventListener('click', () => {
//     currentList = lists[element];
//     let listItem = document.querySelectorAll('.list-item');
//     let taskTitle = document.getElementsByClassName('list-name')[0];

//     for (let i = 0; i < listItem.length; i++) {
//         listItem[i].classList.remove('list-item-active');
//     }
    
//     taskTitle.innerHTML = '';
//     taskTitle.innerHTML = `<h1>${currentList.name}</h1>`;
//     addTask.style.display = 'block';

//     let taskContainer = document.getElementsByClassName('list')[0];
//     taskContainer.innerHTML = '';

//     for (let j = 0; j < currentList.todos.length; j++) {
//         // let newTask = document.createElement('div');
//         // newTask.setAttribute('id', `task-item-${j}`);
//         // newTask.setAttribute('class', 'task-item');

//         taskContainer.innerHTML += 
//         `
//             <div id=task-item-${j} class=task-item>
//                 <div class=task-description>
//                     <input type=checkbox id=taskItemCheckbox name=taskItemCheckbox>
//                     <h3>${currentList.todos[j].text}</h3>
//                 </div>
//                 <div class=task-icons>
//                     <i class="fa-solid fa-pen-to-square"></i>
//                     <i class="fa-solid fa-trash"></i>
//                 </div>
//             </div>
//         `;
        
//     }


//     console.log(taskContainer);

//     newList.classList.toggle('list-item-active');
// });
