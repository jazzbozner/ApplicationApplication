// const stageID = 1
 
const STAGE_URL = "http://localhost:3000/stages"
const TASK_URL = "http://localhost:3000/tasks"
const taskDIV = document.querySelector("div.tasks")
const taskFormDIV = document.querySelector("div.task-form")
const taskListUL = document.querySelector("div.task-list")

function fetchStageTasks(stageID){
    return fetch(`${STAGE_URL}/${stageID}`).then(res => res.json())
    .then(stage => buildTaskList(stage))
}

function fetchOneTask(taskID){
    return fetch(`${TASK_URL}/${taskID}`)
    .then(res=>res.json())
}

function postTask(task){
    return fetch(TASK_URL, {method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    .then(res=>res.json())
}

function patchTask(task){
    return fetch(`${TASK_URL}/${task.id}`, {method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    .then(res=>res.json())
}

function deleteTask(taskID){
    return fetch(`${TASK_URL}/${taskID}`, {method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
}

function buildTaskList(stage){
    document.getElementById("task-list-title").innerText = `${stage.title} Tasks`
    taskFormDIV.setAttribute("hidden", true)

    let tasks = stage.tasks
    taskDIV.id = `stage${stage.id}-tasks`

    if (!document.getElementById("task-toggle-button")){
        let toggleTaskForm = document.createElement("button")
        toggleTaskForm.id = "task-toggle-button"
        toggleTaskForm.innerText = "+"
        toggleTaskForm.append("Add Task")
        toggleTaskForm.onclick = () => toggleForm()
        taskDIV.prepend(toggleTaskForm)
    }

    taskFormDIV.innerHTML = ""
    buildTaskForm()

    
    taskListUL.innerHTML = ""
    taskListUL.style = "list-style-type:none"
    tasks.forEach(task => prependTask(task))

}

function prependTask(task){
    const li = document.createElement("li")
    li.id = `task-${task.id}`

    const title = document.createElement("span")
    const details = document.createElement("p")
    const status = document.createElement("p")
    const editTask = document.createElement("button")
    const completeTask = document.createElement("button")
    const deleteTask = document.createElement("button")

    if (task.priority == 1){li.classList.add("high")}
    else if (task.priority == 2){li.classList.add("medium")}
    else {li.classList.add("low")}

    title.innerHTML = `<b>${task.title}</b>`
    details.innerHTML = `Started: ${task.startdate}<br> Due: ${task.duedate} <br>${task.details}`
    status.innerHTML = `<i>Status: ${task.status}</i><br>`
    
    editTask.innerText = "\u2610"
    editTask.className = "edit-button"
    completeTask.innerText = "\u2611"
    completeTask.className = "complete-button"
    deleteTask.innerText = "\u2612"
    deleteTask.className = "delete-button"

    editTask.addEventListener("click", () => {
        toggleForm("open")
        switchToEditMode()
    })
    completeTask.addEventListener("click", handleCompleteTask)
    deleteTask.addEventListener("click", handleDeleteTask)

    li.append(completeTask, editTask, deleteTask, title, details, status)
    taskListUL.prepend(li)
}

function buildTaskForm(task=""){

    if (task == ""){
        const taskForm = document.createElement("form")
        taskForm.id = "new-task"
        taskFormDIV.append(taskForm)
        const cancelButton = document.createElement("button")
        
        cancelButton.type = "reset"
        cancelButton.innerText = "Cancel"
        taskForm.innerHTML = "<br>Create a New Task:<br><input name='title' placeholder='Task Title'><br> <input name='details' placeholder='Task Details'> <br> " +
        "Priority: <select name='priority'><option value='3'>Low</option><option value='2'>Medium</option><option value='1'>High</option></select> <br>" +
        "Status:<select name='status' ><option value='not started'>Not Started</option><option value='in progress'>In Progress</option><option value='completed'>Completed</option></select> <br>" +
        "Started: <input type='date' name='startdate'> <br> Due: <input type='date' name='duedate'><br>"+
        "<input type='submit' name='submit' value='Add Task' class='submit'/>"
        taskForm.addEventListener('submit', handleSubmitNewTask)
        taskForm.append(cancelButton)
    }
    else{
        taskFormDIV.innerHTML = ""
        const cancelButton = document.createElement("button")
        const editForm = document.createElement("form")
        cancelButton.type = "reset"
        cancelButton.innerText = "Cancel"
        editForm.id = "edit-task"
        editForm.innerHTML = `<br>Edit this Task:<br><input name='title' value='${task.title}'><br> <input name='details' value='${task.details}'> <br> ` +
        `Priority: <select name='priority'><option value='3'>Low</option><option value='2'>Medium</option><option value='1'>High</option></select> <br>` +
        `Status:<select name='status' ><option value='not started'>Not Started</option><option value='in progress'>In Progress</option><option value='completed'>Completed</option></select> <br>` +
        `Started: <input type='date' name='startdate' value='${task.startdate}'> <br> Due: <input type='date' name='duedate'value='${task.duedate}'> <input type='hidden' name='task_id' value='${task.id}'><br>` +
        `<input type='submit' name='submit' value='Save Edits' class='submit'/>`
        taskFormDIV.append(editForm)
        editForm.addEventListener('submit', () => {
            handleEditTask(event)
            editForm.innerHTML = ""
            buildTaskForm("")
        })
        cancelButton.addEventListener('click', buildTaskForm)
        editForm.appendChild(cancelButton)
    }


}

function handleSubmitNewTask(event){
    console.log("Posting")

    event.preventDefault()
    const formValue = event.target
    const stage_id = event.target.parentElement.parentElement.id.split("-")[0].slice(5)
    let task = {title: formValue.title.value, details:formValue.details.value, priority:formValue.priority.value, 
        status:formValue.status.value, startdate:formValue.startdate.value, duedate:formValue.duedate.value, stage_id: stage_id}
    postTask(task)
    .then(data => prependTask(data))
    .then(formValue.reset())
}

function switchToEditMode(){
    event.preventDefault()
    const taskID = event.target.parentElement.id.split("-")[1]
    fetchOneTask(taskID)
    .then(task => buildTaskForm(task))
}

// chain this dumb function into the real handleEdit function
function handleEditTask(event){
    console.log("Patching")

    event.preventDefault()
    const formValue = event.target
    const stage_id = event.target.parentElement.parentElement.id.split("-")[0].slice(5)
    let task = {id: formValue.task_id.value, title: formValue.title.value, details:formValue.details.value, priority:formValue.priority.value, 
        status:formValue.status.value, startdate:formValue.startdate.value, duedate:formValue.duedate.value, stage_id: stage_id}
    patchTask(task)
    .then(updated => {
        document.getElementById(`task-${updated.id}`).remove()
        prependTask(updated)
    })
    // .then(res => {prependTask(res) }) // This functionality isn't great
    // .then(formValue.reset())

}



function handleCompleteTask(){
    console.log("Patch with Complete")
    event.preventDefault()
    
    event.target.parentElement.querySelector("i").innerText="Status: completed"
    const taskID = event.target.parentElement.id.split("-")[1]
    const task = {id: taskID, status: "completed"}
    
    patchTask(task)
}

function handleDeleteTask(){
    console.log("Deleting")
    event.preventDefault()
    const taskID = event.target.parentElement.id.split("-")[1]
    deleteTask(taskID)
    .then(event.target.parentElement.remove())
}

function toggleForm(condition = ""){
    if (condition == "open"){
        if (!taskFormDIV.hasAttribute("style")){
            taskFormDIV.style.display = "block"     
        }   
    } else {
        if (taskFormDIV.hasAttribute("style")){
        taskFormDIV.removeAttribute("style")
        taskFormDIV.toggleAttribute("hidden")
        }
        taskFormDIV.toggleAttribute("hidden")
    }  
}


// fetchStageTasks(stageID)
