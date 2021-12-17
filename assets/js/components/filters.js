const filters = {

    showarchivedTasks: false,

    init: function() {

        // Binders

        const filterElement = document.querySelector('.filters__task.filters__task--archived');
        filterElement.addEventListener('click', filters.handleFilterTasks);

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

        }
        
    }
