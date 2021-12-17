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

        let selectElement = document.createElement("select");
        selectElement.classList.add("filters__choice");

        let firstOptionElement = document.createElement("option");
        firstOptionElement.textContent = "Catégories";
        selectElement.append(firstOptionElement);

        for (const category of jsonData) {
          const optionElement = document.createElement("option");
          optionElement.textContent = category.name;

          optionElement.value = category.id ;

          selectElement.append(optionElement);
        }

        let parentElement = document.querySelector(".filters .filters__task--category");
        parentElement.append(selectElement);

        selectElement = document.createElement("select");
        firstOptionElement = document.createElement("option");
        firstOptionElement.textContent = "Choisir une catégorie";
        selectElement.append(firstOptionElement);

        for (const category of jsonData) {
          const optionElement = document.createElement("option");
          optionElement.textContent = category.name;

          optionElement.value = category.id ;

          selectElement.append(optionElement);
        }
        
        parentElement = document.querySelector(".task--add .select");
        parentElement.append(selectElement);

      }
    );

  }

}