const filters = {

    showarchivedTasks: false,

    init: function() {

        // Binders

        const filterElement = document.querySelector('.filters__task.filters__task--archived');
        filterElement.addEventListener('click', filters.handleFilterTasks);

        const filterChoiceElement = document.querySelectorAll('.filters__choice.button');
        for (currentFilterChoice of filterChoiceElement) {
            currentFilterChoice.addEventListener('click', filters.handleFilterChoice);
        }

    },
    
    handleFilterTasks: function() {

        const tasksToDoElement = document.querySelectorAll('.task--todo, .task--complete');
        const tasksArchivedElement = document.querySelectorAll('.task--archive');
            
                if (filters.showarchivedTasks === false) {

                    for (const task of tasksToDoElement) {
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

                    for (const task of tasksToDoElement) {
                        if (task.id != "task-template") {
                            task.style.display = "block";
                        }
                    }  
                }

            filters.showarchivedTasks = !filters.showarchivedTasks;

        },

    handleFilterChoice: function(evt) {

        const selectedButton = evt.currentTarget;
        selectedButton.classList.add("selected");

        if (selectedButton.textContent == "Incomplètes") {
            tasksToDo = document.querySelectorAll('.task--todo');
            for (currentTaskToDo of tasksToDo) {
                currentTaskToDo.style.display="none";
            }
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                currentTaskCompleted.style.display="block";
            }
        } else if (selectedButton.textContent == "Complètes") {
            tasksCompleted = document.querySelectorAll('.task--complete');
            for (currentTaskCompleted of tasksCompleted) {
                currentTaskCompleted.style.display="none";
            }
            tasksToDo = document.querySelectorAll('.task--todo');
            for (currentTaskToDo of tasksToDo) {
                if (currentTaskToDo.id != "task-template") {
                    currentTaskToDo.style.display="block";
                }
            }
        } else {
            allTasks = document.querySelectorAll('.task');
            for (currentTask of allTasks) {
                if (currentTask.id != "task-template") {
                    currentTask.style.display="block";
                }
            }
        }

    }
        
    }
