const app = {

  apiRootUrl: "http://localhost:8080",

  init: function() {
    categoriesList.init();
    tasksList.init();
    newTaskForm.init();
    filters.init();
  }

};

document.addEventListener("DOMContentLoaded", app.init);