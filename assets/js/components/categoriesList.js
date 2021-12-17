const categoriesList = {
  
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
        let filterSelectElement = document.createElement("select");
        filterSelectElement.classList.add("filters__choice");
        let categoryFilterElement = document.querySelector(".filters__task--category");
        categoryFilterElement.append(filterSelectElement);

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
        let taskSelectElement = document.createElement("select");
        taskSelectElement.classList.add("task__category__list");
        let categoryTaskElement = document.querySelector(".task .task__category");
        categoryTaskElement.append(taskSelectElement);

        let firstCategoryTask = document.createElement("option");
        firstCategoryTask.textContent = "Choisir une catégorie";
        firstCategoryTask.classList.add("task__category__option--first");
        taskSelectElement.append(firstCategoryTask);

        for (const category of jsonData) {
          const CategoryTaskElement = document.createElement("option");
          CategoryTaskElement.textContent = category.name;
          CategoryTaskElement.classList.add("task__category__option");
          CategoryTaskElement.value = category.id ;
          CategoryTaskElement.name = category.name;
          taskSelectElement.append(CategoryTaskElement);
        }

        // we'll do the same for the categories of the template task
        let templateSelectElement = document.createElement("select");
        templateSelectElement.classList.add("task__category__choice");
        let categoryTemplateElement = document.querySelector(".tasks .task__category");
        categoryTemplateElement.append(templateSelectElement);

        for (const category of jsonData) {
          const categoryOptionTemplateElement = document.createElement("option");
          categoryOptionTemplateElement.textContent = category.name;
          categoryOptionTemplateElement.classList.add("task__category__option");
          categoryOptionTemplateElement.value = category.id ;
          categoryOptionTemplateElement.name = category.name;
          templateSelectElement.append(categoryOptionTemplateElement);
        }
      }
    );

  }

}