const positionID = 1

const STAGE_URL = "http://localhost:3000/stages"
const taskDIV = document.querySelector("div.tasks")
const graphDIV = document.querySelector("div.graphs")

function fetchTasks(positionID){
    return fetch(`${STAGE_URL}/${positionID}`).then(res => res.json())
    .then(tasks => buildTaskList(tasks))
}

function buildTaskList(tasks){

    const taskList = document.createElement("ul")

    const taskframe = document.createElement("div")
    const li = document.createElement("li")
    li.innerText = tasks.title

    taskList.appendChild(li)
    taskDIV.appendChild(taskList)
}

function buildNewTaskForm(state){
    taskDIV.innerHTML = ""
    taskDIV.innerText = "Add a New Task"
    closeTaskForm()
    const taskFormDiv = document.createElement("div")
    const taskForm = document.createElement("form")
    const title = document.createElement("input")
    const details  = document.createElement("input")
    const priority = document.createElement("input")
    const status = document.createElement("input")
    const startDate = document.createElement("input")
    const dueDate = document.createElement("input")
    const submitTask = document.createElement("button")

    taskFormDiv.class = state
    title.placeholder = "Task Title"
    details.placeholder = "Task Details"
    priority.placeholder = "Priority"
    status.placeholder = "Status"
    startDate.label = "StartDate"
    startDate.type = "date"
    dueDate.type = "date"
    submitTask.type = "submit"
    submitTask.innerText = "Submit Task"

    taskForm.append(title, details, priority, status,startDate, dueDate, submitTask)
    taskFormDiv.appendChild(taskForm)
    taskDIV.appendChild(taskFormDiv)
}

function openTaskForm(){
    graphDIV.toggleAttribute("hidden")
    let newTaskBtn = document.createElement("button")
    newTaskBtn.innerText = "+"
    newTaskBtn.onclick = () => buildNewTaskForm("")
    taskDIV.prepend(newTaskBtn)
}

function closeTaskForm(){
    let closeBtn = document.createElement("button")
    closeBtn.innerText = "-"
    closeBtn.onclick = () => { }  
    taskDIV.prepend(closeBtn)
}


function checkToggle(divName){

    divName.style.display = "none"
    // divName.toggleAttribute("hidden")

}

checkToggle(graphDIV)

openTaskForm()
fetchTasks(positionID)
// buildNewTaskForm()