const filters = {

    showarchivedTasks: false,

    currentCompletionIndex: 0,

    chosenCategory: "Toutes",

    init: function () {

        // Binders

        const filterElement = document.querySelector('.filters__task.filters__task--archived');
        filterElement.addEventListener('click', filters.handleFilterTasks);

        const filterChoiceElement = document.querySelectorAll('.filters__task--completion__select');
        for (currentFilterChoice of filterChoiceElement) {
            currentFilterChoice.addEventListener('change', filters.handleFilterChoice);
        }

        filterCategoryElement = document.querySelector('.filters__task__select');
        filterCategoryElement.addEventListener('change', filters.handleFilterCategory);

    },

    // this method will show archived or unarchived tasks
    handleFilterTasks: function () {

        const tasksNotArchivedElement = document.querySelectorAll('.task--todo, .task--complete');
        const tasksToDoElement = document.querySelectorAll('.task--todo');
        const taskCompleteElement = document.querySelectorAll('.task--complete');
        const tasksArchivedElement = document.querySelectorAll('.task--archive');

        if (filters.showarchivedTasks === false) {

            for (const task of tasksNotArchivedElement) {
                if (task.id != "task-template") {
                    task.style.display = "none";
                }
            }

            for (const task of tasksArchivedElement) {
                task.style.display = "block";
            }     

        } else {

            for (const task of tasksArchivedElement) {
                task.style.display = "none";
            }

            if (filters.currentCompletionIndex == 0) {
                var tasksElement = tasksNotArchivedElement;
            } else if (filters.currentCompletionIndex == 1) {
                var tasksElement = taskCompleteElement;
            } else {
                var tasksElement = tasksToDoElement;
            }

            for (const task of tasksElement) {
                if (task.id != "task-template" && (task.dataset.category == filters.chosenCategory || filters.chosenCategory == "Toutes")) {
                    task.style.display = "block";
                }
            }
        }

        filters.showarchivedTasks = !filters.showarchivedTasks;

    },

    // this method will show completed or active tasks
    handleFilterChoice: function (evt) {
        
        const completionIndex = (evt.currentTarget.selectedIndex);

        const tasksArchivedElement = document.querySelectorAll('.task--archive');

        filters.currentCompletionIndex = completionIndex;

        console.log(filters.currentCompletionIndex);
        console.log(filters.chosenCategory);
        
        for (const task of tasksArchivedElement) {
            task.style.display = "none";
        }

        // here, 0 = all, 1 = complete and 2 = incomplete
        if (completionIndex == 1) {
            tasksToDo = document.querySelectorAll('.task--todo');
            for (currentTaskToDo of tasksToDo) {
                currentTaskToDo.style.display = "none";
            }
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                if (filters.chosenCategory == currentTaskCompleted.dataset.category || filters.chosenCategory == "Toutes") {
                    currentTaskCompleted.style.display = "block";
                }
            }
            filters.showarchivedTasks = false;
        } else if (completionIndex == 2) {
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                currentTaskCompleted.style.display = "none";
            }
            tasksToDo = document.querySelectorAll('.task--todo');
            
            for (currentTaskToDo of tasksToDo) {
                if (currentTaskToDo.id != "task-template" && (filters.chosenCategory == currentTaskToDo.dataset.category || filters.chosenCategory == "Toutes")) {
                    currentTaskToDo.style.display = "block";
                }
            }
            filters.showarchivedTasks = false;
        } else if (completionIndex == 0){
            allTasks = document.querySelectorAll('.task');
            for (currentTask of allTasks) {
                if (currentTask.id != "task-template" && !currentTask.classList.contains('task--archive') && (filters.chosenCategory == currentTask.dataset.category || filters.chosenCategory == "Toutes")) {
                    currentTask.style.display = "block";
                }
            }
            filters.showarchivedTasks = false;
        }
        
    },

    // this method will sort and show tasks by their categories
    handleFilterCategory: function (evt) {

        const categoryIndex = (evt.currentTarget.selectedIndex);
        const chosenCategory = categoriesList.categoriesList[categoryIndex];

        const tasksNotArchivedElement = document.querySelectorAll('.task--todo, .task--complete');
        const tasksToDoElement = document.querySelectorAll('.task--todo');
        const taskCompleteElement = document.querySelectorAll('.task--complete');

        filters.chosenCategory = chosenCategory;

        if (filters.currentCompletionIndex == 0) {
            var allTasks = tasksNotArchivedElement;
        } else if (filters.currentCompletionIndex == 1) {
            var allTasks = taskCompleteElement;
        } else {
            var allTasks = tasksToDoElement;
        }

        for (currentTask of allTasks) {
            if (currentTask.id != "task-template" && (chosenCategory == filters.chosenCategory || categoryIndex == 0)) {
            currentTask.style.display = "block";
            }

            if (chosenCategory != "Toutes") {
                if (currentTask.dataset.category != chosenCategory && !currentTask.classList.contains('task--add')) {
                    currentTask.style.display = "none";
                }
            };
            if (currentTask.classList.contains('task--archive')) {
                currentTask.style.display = "none";
            };
        }

        

    }
}