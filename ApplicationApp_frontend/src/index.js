// Tasks
const TASK_URL = "http://localhost:3000/tasks"
const taskDIV = document.querySelector("div.tasks")
const taskFormDIV = document.querySelector("div.task-form")
const taskListUL = document.querySelector("div.task-list")
const tasks = document.body.querySelector(".tasks")
// Notes
const NOTE_URL = "http://localhost:3000/notes"
const notesContainerDiv = document.getElementById("notes-container")
const notesView = document.body.querySelector(".note-view")
const noteView = document.body.querySelector(".note-view")
// stages
const STAGE_URL = "http://localhost:3000/stages"
const STAGE = document.body.querySelector('.stage')
const stageView = document.body.querySelector(".stage-view")
const scrollingWrapper = document.body.querySelector(".scrolling-wrapper")
const stageUl = document.getElementById('stage-list')
//  Positions
const POSITION_URL = "http://localhost:3000/positions"
const userLink = document.body.querySelector(".home")
const posMenu = document.body.querySelector(".positions")
const posMenuUl = document.getElementById("positions-ul")
const posView = document.body.querySelector(".position-view")
// user id
const USER_URL = "http://localhost:3000/users"
const userId = 1
// Analytics
const graphs = document.body.querySelector(".graphs")

// Biggest Note: everything is contingent on being able to access the User's Id. Figure out how this will be passed along.
// challenges: edit form will only populate specific input fields and sometimes only up to one or two words....
// changes: postPosition has become submitPosition and will take in a method as well as a an object of the body key. Will now perform POST or PATCH requests dependent on the method value
// bugs, change cancel button on new form view, also don't let it save.
// fetches 

function fetchAll(userId){
    debugger
    fetch(`${USER_URL}/${userId}`)
    .then(resp => resp.json())
    .then(user => buildLeftColumn(user))

}

function fetchPosition(posId){
    fetch(`${POSITION_URL}/${posId}`)
    .then(resp => resp.json())
    .then(position => buildStagesBar(position))
    
}

function deletePos(position){
    debugger
    fetch(`${POSITION_URL}/${position.id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        }
    })
    .then(() => {
        fetchAll(userId)
        // posForm() Add splash 
    })
}

function submitPosition(positionObj, method=""){
    
    let url = POSITION_URL
    if (method === "PATCH"){
        url = `${POSITION_URL}/${positionObj.id}`
    }
    fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(positionObj)
    })
    .then(resp => resp.json())
    .then(position => {
        fetchAll(userId)
        buildPosView(position)
    })
}

// builders: specifically for row 3

function buildStagesBar(position){
    scrollingWrapper.innerHTML = ""
    scrollingWrapper.style = "max-width:800px;margin:0 auto;"
    scrollingWrapper.addEventListener('wheel', function(e) {
        if (e.deltaY > 0) {scrollingWrapper.scrollLeft += 100;}
        else {scrollingWrapper.scrollLeft -= 100;}
      });

    position.stages.forEach(stage => {
       
        let stageDiv = document.createElement("div")
        stageDiv.classList.add("stage-card")
        stageDiv.id = `stage${stage.id}`
        // stageDiv.innerText = stage.title
        stageDiv.innerHTML = `<br><h2>${stage.title}<h2><br>`
        stageDiv.onclick = ()=> {
            console.log(`${stage.title} button was clicked`)
            buildStageShow(stage)
            fetchStageTasks(stage.id)
            allNotes(stage)
        } 
        scrollingWrapper.append(stageDiv)
    })
    let addStage = document.createElement("div")
    addStage.classList.add("stage-card")
    addStage.innerHTML = "Add Next Stage"
    addStage.onclick = () => stageForm(position,"new")
    // console.log("bring me the form for a new stage")
    scrollingWrapper.appendChild(addStage)

}

// builders
// step 1 modifed
function buildLeftColumn(user){
    // userLink.innerHTML = ""
    posMenuUl.innerHTML = ""
    let userName = document.createElement("h2")
    userName.innerText = user.username
    userLink.id = user.id 
    // have a link for usrname
    // userName.onclick = ()=> openUser(user)
    
    user.positions.forEach(position => {
        buildPosLi(position)
    })
    
    // let newPosBtn = document.createElement("button")
    // newPosBtn.innerText = "+"
    // newPosBtn.onclick = () => posForm()
    // posMenu.prepend(newPosBtn)
    
    // userLink.appendChild(userName)
    
}

function buildPosView(position){
    posView.innerHTML = ""
    
    let title = document.createElement("h1")
    let company = document.createElement("h2")
    let contact = document.createElement("h3")
    let details = document.createElement("p")
    let dates = document.createElement("h4")
    let procon = document.createElement("p")
    let rating = document.createElement("p")
    let requirements = document.createElement("p")
    let salary = document.createElement("h3")
    let status = document.createElement("h3")
    let website = document.createElement("p")
    let editBtn = document.createElement("button")
    let deleteBtn = document.createElement("button")

    let midDiv = document.createElement("div")
    midDiv.id = "pos-details"
    let expBtn = document.createElement("button")
    expBtn.innerText = "EXPAND"
    expBtn.onclick = ()=> showDetails()
    midDiv.setAttribute("hidden", true)

    posView.id = position.id
    company.innerText = position.company
    title.innerText = position.title 
    dates.innerText = `Posting Date - Closing Date \n${position.postdate} - ${position.closingdate}`
    salary.innerText = `Salary: ${position.salary}`
    details.innerText = `Details:\n\n${position.details}` 
    requirements.innerText = `Requirements: ${position.requirements}`
    contact.innerText = `Contact: ${position.contact}`
    website.innerText = position.website
    procon.innerText = `Pros/Cons: ${position.procon}` 
    rating.innerText = `Rating: ${position.rating}` 
    status.innerText = `Status: ${position.status}` 

    editBtn.innerText = "Edit Position"
    editBtn.onclick = ()=> posForm(position)

    deleteBtn.innerText = "Delete Position"
    deleteBtn.onclick = ()=> deletePos(position)
    midDiv.append(contact, website, rating, procon, requirements, details)
    posView.append(company, title, salary, dates, status, expBtn, editBtn, deleteBtn, midDiv)
}

function posForm(position=""){

    let formDiv = document.createElement("div")
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "Cancel"
    cancelBtn.onclick = ()=> cancelAction(position)
    formDiv.id = "new_position"
    if (position === ""){
        formDiv.innerHTML = `
        <form id="position-form">
        <h3>Add a New Position</h3>
        <input
          type="text"
          name="title"
          value=""
          placeholder="Job Title"
          class="input-text"
          required
        >
        <br >
        <input
          type="text"
          name="company"
          value=""
          placeholder="Company Name"
          class="input-text"
          required
        >
        <br >
        <input
            type="number"
            name="salary"
            step="1000"
            value=""
            placeholder="Salary"
            class="input-text"
        >
        <br >
        <input
            type="text"
            name="contact"
            value=""
            placeholder="Company Contact"
            class="input-text"
        >
        <br >
        <input
            type="text"
            name="website"
            value=""
            placeholder="Company Website"
            class="input-text"
        >
        <br >
        <textarea
            type="text"
            name="requirements"
            value=""
            placeholder="Requirements"
            class="new-input-text-scrollable"
        >Requirements
        </textarea>
        <br >
        <label name="postdate"> 
            Date Posted
        </label>
        <input
            type="date"
            name="postdate"
            placeholder="Date Posted"
            value=""
            class="input-text"
        >
        <br >
        <label name="closingdate"> 
            Closing Date
        </label>
        <input
            type="date"
            name="closingdate"
            value=""
            placeholder="Closing Date"
            class="input-text"
        >
        <br >
        Rating:
        <select name="rating">
            <option value="1">Awesome</option>
            <option value="2">It's Ok</option>
            <option value="3">Better than Nothing</option>
        </select>
        <br >
        <textarea
            type="text"
            name="procon"
            value=""
            placeholder="Pros/Cons:"
            class="new-input-text-scrollable"
        >Pros & Cons
        </textarea>
        <br >
        Status:
        <select name="status">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
        </select>
        <br >
        <textarea
            id="pos-desc-input-txt" 
            type="text" 
            font-size:1.3em; 
            padding:.5em;
            name="details"
            value=""
            placeholder="Details"
            class="new-input-text-scrollable"
            required
        >Description
        </textarea>
        <br >
        <input
          type="submit"
          name="submit"
          value="Create Position"
          class="submit"
        >
      </form>`
    } else {
        formDiv.innerHTML = `
        <form id="position-form">
            <h3>Edit Position</h3>
        <label name="title">
            Job Title
        </label>
        <br >
        <input
          type="text"
          name="title"
          value="${position.title}"
          placeholder="Job Title"
          class="input-text"
          required
        >
        <br >
        <label name="company">Company</label>
        <br >
        <input
          type="text"
          name="company"
          value="${position.company}"
          placeholder="Company Name"
          class="input-text"
          required
        >
        <br >
        <label name="salary">
            Salary
        </label>
        <br >
        <input
            type="number"
            name="salary"
            step="1000"
            value="${position.salary}"
            placeholder="Salary"
            class="input-text"
        >
        <br >
        <label name="contact">
            Company Contact
            </label>
        <br >
        <input
            type="text"
            name="contact"
            value="${position.contact}"
            placeholder="Company Contact"
            class="input-text"
        >
        <br >
        <label name="website">
            Company Website
        </label>
        <br >
        <input
            type="text"
            name="website"
            value="${position.website}"
            placeholder="Company Website"
            class="input-text"
        >
        <br >
        <label name="requirements">
            Requirements
        </label>
        <br >
        <textarea
            type="text"
            name="requirements"
            placeholder="Requirements"
            class="edit-input-text-scrollable"
            >
            "${position.requirements}"
        </textarea>
        <br >
        <label name="postdate">
            Date Posted
        </label>
        <br >
        <input
            type="date"
            name="postdate"
            value="${position.postdate}"
            placeholder="Date Posted"
            class="input-text"
        >
        <br >
        <label name="closingdate">
            Closing Date
        </label>
        <br >
        <input
            type="date"
            name="closingdate"
            value="${position.closingdate}"
            placeholder="Closing Date"
            class="input-text"
        >
        <br >
        <label name="rating">
            Rating
        </label>
        <br >
        <select name="rating">
            <option value="1">Awesome</option>
            <option value="2">It's Ok</option>
            <option value="3">Better than Nothing</option>
        </select>
        <br >
        <label name="procon">
            Pros/Cons
        </label>
        <br >
        <textarea
            type="text"
            name="procon"
            value=
            placeholder="Pros/Cons:"
            class="edit-input-text-scrollable"
            >
            "${position.procon}"
        </textarea>
        <br >
        <label name="status">
            Application Status
        </label>
        <br >
        <select name="status">
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
        </select>
        <br >
        <label name="details">
            Details
        </label>
        <br >
        <textarea   
            id="details-input"
            type="textarea"
            name="details"
            placeholder="Details"
            class="edit-input-text-scrollable"
            >
            "${position.details}"
        </textarea>
        <br >
        <input
            type="submit"
            name="submit"
            value="Save Edits"
            class="submit"
        >
      </form>`
    }

        // <input
        //     type="text"
        //     name="rating"
        //     value="${position.rating}"
        //     placeholder="Rating"
        //     class="input-text"
        // />

    // ---> switch back to input --> set a standard width and height -> if they go beyond the size have an overflow scroll property .

    // // fetch the former form and repopulate it
    formDiv.appendChild(cancelBtn)

    posView.innerHTML = ""
    posView.appendChild(formDiv)
    let form = document.getElementById("position-form")
    form.addEventListener("submit", ()=> handlePosSubmit(position))
}

function handlePosSubmit(position=""){
    event.preventDefault()
    console.log(position)
    let p = event.target
    let positionObj = {
        title: p.title.value,
        company: p.company.value, 
        requirements: p.requirements.value, 
        details: p.details.value, 
        postdate: p.postdate.value, 
        closingdate: p.closingdate.value, 
        salary: p.salary.value, 
        contact: p.contact.value, 
        website: p.website.value, 
        rating: p.rating.value, 
        procon: p.procon.value, 
        status: p.status.value, 
        user_id: userLink.id
    }

    if (position === ""){
        submitPosition(positionObj,"POST")
    } else {
        positionObj.id = position.id
        submitPosition(positionObj, "PATCH")
    }
}

function buttonBuilders(){
    // position form
    let newPosBtn = document.createElement("button")
    newPosBtn.innerText = "+"
    posMenu.prepend(newPosBtn)
    newPosBtn.onclick = () => posForm()
}

function buildPosLi(position){
    let li = document.createElement("li")
        li.onclick = ()=> {
            buildPosView(position)
            fetchPosition(position.id)
        } 
        // li.onclick = ()=> buildPosView(position); //include buildStageLIst(position) function to populate position areas on position click and first/last stage area on position click 
        li.innerText = position.title
        li.setAttribute('data-pos-id', `${position.id}`)
        // have a link for positions
        posMenuUl.appendChild(li)
}

function cancelAction(position){
    position === "" ? posView.innerHTML = "" : buildPosView(position)
  
    // if position === "" set to blank div --> eventually set to splash page!
}
// callbacks
function showDetails(){
    let detailDiv = document.querySelector("#pos-details")
    detailDiv.toggleAttribute("hidden")
}

// invoke functions
buttonBuilders()
fetchAll(userId)

// function() {
//     function scrollHorizontally(e) {
//         e = window.event || e;
//         const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//         document.getElementById('scrolling-wrapper').scrollLeft -= (delta*40); // Multiplied by 40
//         e.preventDefault();
//     }
//     if (document.getElementById('scrolling-wrapper').addEventListener) {
//         // IE9, Chrome, Safari, Opera
//         document.getElementById('scrolling-wrapper').addEventListener("mousewheel", scrollHorizontally, false);
//         // Firefox
//         document.getElementById('scrolling-wrapper').addEventListener("DOMMouseScroll", scrollHorizontally, false);
//     } else {
//         // IE 6/7/8
//         document.getElementById('scrolling-wrapper').attachEvent("onmousewheel", scrollHorizontally);
//     }
// };