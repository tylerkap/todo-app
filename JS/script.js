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
   }

const lists = {};
const currentList = {};


let listCount = 1;
let listButton = document.getElementById('listButton');
listButton.addEventListener('click', addNewList);

function renderPage() {
    let sideBarContainer = document.getElementsByClassName('new-list-container')[0];
    sideBarContainer.innerHTML = '';

    for (const element in lists) {
        let newList = document.createElement('div');
        let listTitle = document.createElement('h1');
        let title = document.createTextNode(lists[element].name);
        newList.classList.add('list-item');
        listTitle.appendChild(title);
        newList.appendChild(listTitle);
        sideBarContainer.appendChild(newList);

        newList.addEventListener('click', () => {
            let listItem = document.querySelectorAll('.list-item');
            console.log(listItem);

            for (let i = 0; i < listItem.length; i++) {
                listItem[i].classList.remove('list-item-active')
                console.log(listItem[i]);
            }

            newList.classList.toggle('list-item-active');
            //activeList(newList);
        });
    }
}

function addNewList() {
    
    
    let listInput = document.getElementById('list-name-input').value;

    let listId = listCount;
    if (listInput !== '' || listInput === undefined) {
        lists[listId] = {name: listInput, todos: []};
        console.log(lists);
        
        listCount++;
        
        renderPage();
    }
}

function activeList(element) {
    // let listItem = document.getElementsByClassName('list-item');
    // for (let i = 0; listItem.length; i++) {
    //     listItem[i].className = listItem[i].className.replace('list-item-active');
    // }

    // element.currentTarget.className += 'list-item-active';
    // alert('hi');
}





