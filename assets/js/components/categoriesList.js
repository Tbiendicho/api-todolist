const categoriesList = {
  
  categoriesList: ["Toutes", "Administratif", "Médical", "Professionnel", "Loisirs", "Autre"],

  init: function() {
    categoriesList.loadCategoriesFromAPI();
  },

  // ---------------------------------------------------------
  // AJAX
  // ---------------------------------------------------------

  // loading categories with AJAX request
  loadCategoriesFromAPI: function() {

    let myInit = {
      method: 'GET',
      headers: {
          'Accept': 'application/json', // client can accept json
          'Content-Type': 'application/json', // client can send json
      },
    };

    fetch(app.apiRootUrl + "/categories/list", myInit) // we send the request
    .then(
      function(response) { // we recieve a json response
        return response.json(); // we catch the json and send a new promise
      }
    )

    // creating all categories options
    .then(
      function(jsonData) { // we definitly catch the json datas

        // we'll create a select menu for categories filter
        let filterSelectElement = document.querySelector(".filters__task__select");
        let firstOptionElement = document.createElement("option");
        firstOptionElement.textContent = "Catégories";
        firstOptionElement.classList.add("filters__option");
        filterSelectElement.append(firstOptionElement);

        for (const category of jsonData) {
          const optionElement = document.createElement("option");
          optionElement.textContent = category.name;
          optionElement.classList.add("filters__option");
          optionElement.value = category.id ;
          optionElement.name = category.name;
          filterSelectElement.append(optionElement);
        }

        // we'll do the same for the add task option
        let newTaskSelectElement = document.querySelector(".task .task__category__select");
        let firstnewtaskCategory = document.createElement("option");
        firstnewtaskCategory.textContent = "Choisir une catégorie";
        firstnewtaskCategory.classList.add("task__category__option--first");
        newTaskSelectElement.append(firstnewtaskCategory);

        for (const category of jsonData) {
          const categoryOptionTaskElement = document.createElement("option");
          categoryOptionTaskElement.textContent = category.name;
          categoryOptionTaskElement.classList.add("task__category__option");
          categoryOptionTaskElement.value = category.id ;
          categoryOptionTaskElement.name = category.name;
          newTaskSelectElement.append(categoryOptionTaskElement);
        }

        // we'll do the same for the categories of the template task
        let taskSelectElement = document.querySelector(".tasks .task__category__select");
        let firstCategoryTask = document.createElement("option");
        firstCategoryTask.textContent = "Catégorie";
        firstCategoryTask.classList.add("task__category__option--first");
        taskSelectElement.append(firstCategoryTask);

        for (const category of jsonData) {
          const categoryOptionTemplateElement = document.createElement("option");
          categoryOptionTemplateElement.textContent = category.name;
          categoryOptionTemplateElement.classList.add("task__category__option");
          categoryOptionTemplateElement.value = category.id ;
          categoryOptionTemplateElement.name = category.name;
          taskSelectElement.append(categoryOptionTemplateElement);
        }
      }
    );

  }

}