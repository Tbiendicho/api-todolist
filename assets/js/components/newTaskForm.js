const newTaskForm = {

  init: function() {
    newTaskForm.bindNewTaskFormEvents();
  },

  // ---------------------------------------------------------
  // Binders
  // ---------------------------------------------------------

  // listening the submit button which permits to add a new task
  bindNewTaskFormEvents: function() {
    const formElement = document.querySelector(".task--add form");
    formElement.addEventListener("submit", newTaskForm.handleNewTaskFormSubmit);
  },

  // ---------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------

  // method for the creation of a new task
  handleNewTaskFormSubmit: function(event) {

    // we'll not reload the page
    event.preventDefault();

    const formElement = event.currentTarget;

    const inputElement = formElement.querySelector(".task__title-field");
    const taskTitle = inputElement.value;

    const selectElement = formElement.querySelector(".task__category select");
    const taskCategoryId = selectElement.value;

    const taskCategoryName = selectElement.querySelector('option:checked').textContent;

    // creating the updating object
    const newTaskData = {
      title: taskTitle,
      categoryId: taskCategoryId
    };
    
    // sending datas with AJAX request
    let myInit = {
      method: 'POST',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
      body: JSON.stringify(newTaskData),
  };

    fetch(app.apiRootUrl + '/tasks/add', myInit)
    .then(
      function (response) {
        if (response.status !== 201) {
          throw 'Erreur avec l\'enregistrement de la tache : ' + response.status ;
        }

        return response.json();
      }
    ).then(function (newTaskObjectId) {

      // we'll create a new element which we'll insert on the taskList
      const newTaskElement = task.createTaskElement(taskTitle, taskCategoryName, newTaskObjectId, 0);
      
      // For the insertion, we call a new method
      tasksList.insertTaskIntoTasksList(newTaskElement, true);
    })
    .catch(function (errorMessage) {
      alert(errorMessage);
    });
  }

}