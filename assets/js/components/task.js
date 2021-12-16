const task = {

  // ---------------------------------------------------------
  // Binders
  // ---------------------------------------------------------
  
  bindSingleTaskEvents: function(taskElement) {

    // listening the click on the title for edition mode
    const taskTitleElement = taskElement.querySelector(".task__title-label");
    taskTitleElement.addEventListener("click", task.handleEnableTaskTitleEditMode);

    // listening the keydown and blur on the imput field
    const taskInputElement = taskElement.querySelector("input");
    taskInputElement.addEventListener("keydown", task.handleValidateNewTaskTitleOnKeyDown);
    taskInputElement.addEventListener("blur", task.handleValidateNewTaskTitleOnBlur);
    
    // listening the complete button
    const taskCompleteBtn = taskElement.querySelector(".task__button--validate");
    taskCompleteBtn.addEventListener("click", task.handleCompleteTask);

    // listening the in-progress button
    const taskIncompleteBtn = taskElement.querySelector(".task__button--incomplete");
    taskIncompleteBtn.addEventListener("click", task.handleIncompleteTask);

    // listening the archive button
    const taskArchiveBtn = taskElement.querySelector(".task__button--archive");
    taskArchiveBtn.addEventListener("click", task.handleArchiveTask);

    // listening the desarchive button
    const taskDesarchiveBtn = taskElement.querySelector(".task__button--desarchive");
    taskDesarchiveBtn.addEventListener("click", task.handleDesarchiveTask);
  },

  // ---------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------

  // editing a task
  handleEnableTaskTitleEditMode: function(event) {

    const taskTitleElement = event.currentTarget;
    const taskElement = taskTitleElement.closest(".task");
    taskElement.classList.add("task--edit");
  },

  // validating a title when enter key is pushed
  handleValidateNewTaskTitleOnKeyDown: function(event) {

    if (event.key === "Enter") {
      task.handleDisableTaskTitleEditMode(event);
    }

  },

  // archiving a task
  handleArchiveTask: function(evt) {
    const taskInputElement = evt.currentTarget;
    const taskElement = taskInputElement.closest('.task');
    taskInputElementId = taskElement.dataset.id

    // creating the updating object
    const taskData = {
      status: 2
    };

    // sending datas with AJAX request
    let myInit = {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
      body: JSON.stringify(taskData),
  };

    fetch(app.apiRootUrl + "/tasks/edit/" + taskInputElementId, myInit)
    .then(function (response) {
      if (response.status == 204) {
        taskElement.classList.remove('task--todo');
        taskElement.classList.add('task--archive');
        alert("Tâche archivée");
        taskElement.style.display = "none";
      } else {
        alert("Erreur lors de l'enregistrement");
      }
    });
  },

  // desarchiving a task
  handleDesarchiveTask: function(evt) {
    const taskInputElement = evt.currentTarget;
    const taskElement = taskInputElement.closest('.task');
    taskInputElementId = taskElement.dataset.id

    // creating the updating object
    const taskData = {
      status: 1
    };

    // sending datas with AJAX request
    let myInit = {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
      body: JSON.stringify(taskData),
  };

    fetch(app.apiRootUrl + "/tasks/edit/" + taskInputElementId, myInit)
    .then(function (response) {
      if (response.status == 204) {
        taskElement.classList.remove('task--archive');
        taskElement.classList.add('task--todo');
        alert("Tâche desarchivée");
        taskElement.style.display = "none";
      } else {
        alert("Erreur lors de l'enregistrement");
      }
    });
  },

  // save a new title when we get out of the field
  handleValidateNewTaskTitleOnBlur: function(event) {
    task.handleDisableTaskTitleEditMode(event);
  },

  // save a new title when we get out of the field
  handleDisableTaskTitleEditMode: function(event) {
    const taskInputElement = event.currentTarget;
    const taskInputValue = taskInputElement.value;
    const taskElement = taskInputElement.closest(".task");
    
    const taskTitleElement = taskElement.querySelector(".task__title-label");
    

    // catching the id of the task
    const taskId = taskElement.dataset.id ;

    // creating the updating object
    const taskData = {
      title: taskInputValue
    };

    // sending datas with AJAX request
    let myInit = {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
      body: JSON.stringify(taskData),
  };

    fetch(app.apiRootUrl + "/tasks/edit/" + taskId, myInit)
    .then(function (response) {
      if (response.status == 204) {
        taskTitleElement.textContent = taskInputValue;
        taskElement.classList.remove("task--edit");
      } else {
        alert("Erreur lors de l'enregistrement");
      }
    });
  },

  // save a task as completed
  handleCompleteTask: function(event) {
    task.updateTaskCompletionToApi(event, 100);
  },

  // save a task as incomplete
  handleIncompleteTask: function(event) {
    task.updateTaskCompletionToApi(event, 0);
  },

  updateTaskCompletionToApi: function(event, completionArg) {
    
    const btnElement = event.currentTarget;
    const taskElement = btnElement.closest(".task");

    const taskId = taskElement.dataset.id ;
    
    // creating the updating object
    const taskData = {
      completion: completionArg
    };

    // sending datas with AJAX request
    let myInit = {
      method: 'PATCH',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
      body: JSON.stringify(taskData),
  };

    fetch(app.apiRootUrl + '/tasks/edit/' + taskId, myInit)
    .then(
        function(response) {
            if (response.status == 204) {
                task.updateTaskCompletion(taskElement, completionArg);
            }
            else {
                alert('L\'ajout a échoué');
            }
        }
    )
  },

  // ---------------------------------------------------------
  // DOM
  // ---------------------------------------------------------

  // updating a task as completed
  updateTaskCompletion: function (templateClonedElement, completion) {
    if (completion == 100) {
      templateClonedElement.classList.remove("task--todo");
      templateClonedElement.classList.add("task--complete");
    } else {
      templateClonedElement.classList.add("task--todo");
      templateClonedElement.classList.remove("task--complete");
    }
  },

  // creating a new task with its datas
  createTaskElement: function(taskTitleValue, taskCategoryValue, taskID, taskCompletion) {

    // cloning an old task
    const templateElement = document.querySelector("#task-template");
    const templateClonedElement = templateElement.cloneNode(true);

    // updating the cloned task
    templateClonedElement.id = "task";
    const taskTitleElement = templateClonedElement.querySelector(".task__title-label");
    taskTitleElement.textContent = taskTitleValue;
    const taskInputElement = templateClonedElement.querySelector("input");
    taskInputElement.value = taskTitleValue;
    taskInputElement.defaultValue = taskTitleValue;

    // updating the task's category
    templateClonedElement.dataset.category = taskCategoryValue;
    const taskCategoryElement = templateClonedElement.querySelector(".task__category");
    taskCategoryElement.textContent = taskCategoryValue;

    // updating the id
    templateClonedElement.dataset.id = taskID;

    // updating the completion
    task.updateTaskCompletion(templateClonedElement, taskCompletion);

    // adding event listeners
    task.bindSingleTaskEvents(templateClonedElement);

    return templateClonedElement;

  }

}