const formAddTask = document.querySelector("#form-add-task");
const taskList = document.querySelector("#task-list");
const taskListContainer = document.querySelector("#task-list-container");


formAddTask.addEventListener("submit",function (event){
    event.preventDefault();//метод который отменяет у формы ее дефолтное выполнение
    const task = {
        title:this.children.title.value, //input value
        done: false,
        id: new Date().getTime(),
    };

    addTask(task);

    localStorage.setItem(task.id,JSON.stringify(task));
    markContainer();
    this.reset();//formAddTask.reset -отчищает наш инпут

})

function addTask(task){
    const listItem = document.createElement("li");
    listItem.innerText = task.title;
    listItem.classList.add("list-item");
    listItem.setAttribute("data-id",task.id);
    taskList.appendChild(listItem);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn-close");
    btnDelete.innerHTML = "&times;";
    listItem.appendChild(btnDelete);


    listItem.addEventListener("click",function (){
        task.done = true;
        if (listItem.classList.contains("completed")){
            listItem.classList.remove("completed");
        }else{
            listItem.classList.add("completed");
        }
    });
}

function markContainer(){
    if (localStorage.length){
        taskListContainer.classList.add("has-tickets");
    }else{
        taskListContainer.classList.remove("has-tickets");
    }
}

function countTasks() {
    const element = document.querySelector('#task-count');
  
    const values = Object.values(localStorage);
  
    element.innerText = values.filter(item => !JSON.parse(item).done).length;
  }
  
//Чтение из Local Storage
for (let key in localStorage){
    if(localStorage.hasOwnProperty(key)){
        const task = JSON.parse(localStorage[key]);
        addTask(task);
    }
}


taskList.addEventListener("click",function (event){
   if (!event.target.classList.contains("btn-close")){
       return;
   }

    const { parentNode } = event.target;//<li>
   console.log(parentNode);
   const taskId = parentNode.getAttribute("data-id");
   localStorage.removeItem(taskId);
   parentNode.remove();
   markContainer();

});
