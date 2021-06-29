import {
    formSubmitHandler,
    closeBtnClickHandler,
    markContainer,
    countTasks,
    addTask,
    checkBtnClickHandler
  }  from './function.js';
  
  import {
    formAddTask,
    taskList
  } from './vars.js';
  
  formAddTask.addEventListener("submit", formSubmitHandler);
  taskList.addEventListener("click", closeBtnClickHandler);
  taskList.addEventListener("click", checkBtnClickHandler);
  
  
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      const task = JSON.parse(localStorage[key]);
      addTask(task);
    }
  }
  
  markContainer();
  countTasks();
  