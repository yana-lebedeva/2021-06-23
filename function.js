import {
  taskListContainer,
  taskList,
} from './vars.js';

export function addTask(task) {
  console.log("addTask", task);
  const listItem = document.createElement('li');
  listItem.innerText = task.title;
  listItem.classList.add('list-item');
  listItem.setAttribute('data-id', task.id);

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-delete');
  btnDelete.innerHTML = '&times;';

  const btnCheck = document.createElement('button');
  btnCheck.classList.add('btn-check');
 
  if (task.done) {
    listItem.classList.add('completed');
  }
  

  taskList.appendChild(listItem);
  listItem.appendChild(btnDelete);
  listItem.appendChild(btnCheck);
};

export function markContainer() {
  if (localStorage.length) {
    taskListContainer.classList.add('has-tickets');
  } else {
    taskListContainer.classList.remove('has-tickets');
  };
};

export function countTasks() {
 let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const task = JSON.parse(value);
    if (!task.done) {
      count++;
    }
  }
  document.getElementById('task-count').innerText = count;
}


export function formSubmitHandler(event) {
  event.preventDefault();

  const task = {
    title: this.children.title.value,
    done: false,
    id: new Date().getTime()
  };

  addTask(task);

  localStorage.setItem(String(task.id), JSON.stringify(task));

  markContainer();
  countTasks();

  this.reset();
};

export const closeBtnClickHandler = event => {
  if (!event.target.classList.contains('btn-delete')) return;

  const { parentNode } = event.target;

  const taskId = parentNode.getAttribute('data-id');
  localStorage.removeItem(taskId);
  parentNode.remove();

  markContainer();
  countTasks();
};

export const checkBtnClickHandler = event => {
  if (!event.target.classList.contains('btn-check')) return;

  const { parentNode } = event.target; 

  const taskId = parentNode.getAttribute('data-id');
 
  parentNode.classList.toggle('completed');
  const task = JSON.parse(localStorage.getItem(taskId));
  task.done = !task.done;
  localStorage.setItem(taskId, JSON.stringify(task));

  countTasks();
};
