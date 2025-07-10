    let task_array=[];
    let number_of_tasks = 0;

    // Enter key event to add tasks
    const user_input =  document.getElementsByClassName("input-box")[0];
    user_input.addEventListener("keydown",function(e){
        let input = user_input.value.trim();
        if(e.key==="Enter" && input != ""){
            e.preventDefault();
            addtask();
        }
    })

    // Check-box event listener
    document.addEventListener("change", function(e){
        if(e.target.classList.contains("chk-box")){
            const span = e.target.nextElementSibling;
            const task = e.target.parentElement;
            let task_id = task.getAttribute("task-id");
            if(e.target.checked)
            {
                span.classList.add("completed");
                task.classList.add("completed-box");
            }
            else
            {
                span.classList.remove("completed");
                task.classList.remove("completed-box");
            }

            let taskObj = JSON.parse(localStorage.getItem(task_id));
            taskObj.chk = e.target.checked;
            localStorage.setItem(task_id,JSON.stringify(taskObj));
        }
    })

    // Delete task event listener
    document.addEventListener("click", function(e){
        const btn = e.target.closest(".delete-btn");
        if(btn){
            const task = e.target.closest("li");
            const task_id = task.getAttribute("task-id");
            task.remove();
            localStorage.removeItem(task_id);

            noTasksUpdate();
        }
    })

    // OnLoad event listener
    window.addEventListener("load",function(){
        task_array = [];
        let keys = [];

        document.querySelector(".main-task-list").innerHTML = "";
        
        // Retrieving task_keys into "keys" to sort them from oldest to newest
        for(let i=0; i<localStorage.length;i++)
            {
                let key = localStorage.key(i);
                if(key.startsWith("task_"))
                    {
                        keys.push(key);
                    }
            }
                
            keys.sort((a,b)=>{
                const timeA = parseInt(a.split("_")[1]);
                const timeB = parseInt(b.split("_")[1]);
                return timeA - timeB;
            });
                
            for(let key of keys)
            {
                const retrieve_task = JSON.parse(localStorage.getItem(key));
                task_array.push(retrieve_task);
                const text = retrieve_task.txt;
                const chk = retrieve_task.chk;
                
                let task_element = document.createElement("li");
                task_element.classList.add("task");
                task_element.setAttribute("task-id",retrieve_task.id);

                let checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.checked = chk;
                
                checkBox.classList.add("chk-box");

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-btn");

                let icon = document.createElement("i");
                icon.classList.add("fa-solid", "fa-trash");

                deleteButton.appendChild(icon);

                let text_holder = document.createElement("span");
                text_holder.innerText= text;

                if(chk)
                {
                    text_holder.classList.add("completed");
                    task_element.classList.add("completed-box");
                    console.log("Hello")
                }

                task_element.appendChild(checkBox);
                task_element.appendChild(text_holder);
                task_element.appendChild(deleteButton);
                
                let task_list = document.getElementsByClassName("main-task-list")[0];
                task_list.appendChild(task_element);

                document.getElementsByClassName("input-box")[0].value = "";
            }
            noTasksUpdate();
    })

    // To display "No Tasks Here!" when the task list is empty
    function noTasksUpdate(){
        let h2 = document.querySelector("h2.no-tasks");
        const num = document.getElementsByClassName("main-task-list")[0];
        if(num.children.length === 0)
        {
            h2.style.display = "block";
            document.getElementsByClassName("task-list")[0].style.alignItems="center";
        }
        else
        {
            h2.style.display="none";
            document.getElementsByClassName("task-list")[0].style.alignItems="flex-start";
        }
    }

    function addtask(){
        // First create HTML element
        // Fetch input from input-box
        // Create a text node and pass input text to it
        // Now append text node to HTML element (li)
        // Now get ul from DOM and then append li element to it

        const task_id = "task_" + Date.now();

        let task_element = document.createElement("li");
        task_element.classList.add("task");
        task_element.setAttribute("task-id",task_id);

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("chk-box");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");

        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash");

        deleteButton.appendChild(icon);

        let text_holder = document.createElement("span");
        const text = document.getElementsByClassName("input-box")[0].value.trim();
        if(text === "")
            return;
        text_holder.innerText= text;

        task_element.appendChild(checkBox);
        task_element.appendChild(text_holder);
        task_element.appendChild(deleteButton);
        
        let task_list = document.getElementsByClassName("main-task-list")[0];
        task_list.appendChild(task_element);

        document.getElementsByClassName("input-box")[0].value = "";

        noTasksUpdate();

        const isCheck = checkBox.checked;
        

        let newTaskObject = {
            id: task_id,
            txt: text,
            chk: isCheck
        };

        localStorage.setItem(task_id,JSON.stringify(newTaskObject));
    }
