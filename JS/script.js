let listArray = [];

function addTask() {
    let buttonValue = document.getElementById("taskInput").value;
    let taskList = document.getElementById("taskList");

    listArray.push(buttonValue);

    let li = document.createElement("li");
    li.innerHTML = buttonValue;
    taskList.appendChild(li);

    console.log(listArray);
}