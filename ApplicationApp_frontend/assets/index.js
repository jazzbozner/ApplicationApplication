const userLink = document.body.querySelector(".home")
const posMenu = document.body.querySelector(".positions")

const graphs = document.body.querySelector(".graphs")
const posView = document.body.querySelector(".position-view")
const stageView = document.body.querySelector(".stage-view")
const noteView = document.body.querySelector(".note-view")

const tasks = document.body.querySelector(".tasks")

const userId = 1
const posMenuUl = document.getElementById("positions-ul")


// Biggest Note: everything is contingent on being able to access the User's Id. Figure out how this will be passed along.
// challenges: edit form will only populate specific input fields and sometimes only up to one or two words....
// changes: postPosition has become submitPosition and will take in a method as well as a an object of the body key. Will now perform POST or PATCH requests dependent on the method value
// fetches 

function fetchAll(userId){
    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp => resp.json())
    .then(user => buildLeftColumn(user))
}

function deletePos(position){
    fetch(`http://localhost:3000/positions/${position.id}`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        }
    })
    .then(()=> {
        fetchAll(userId)
        posForm()
    })
}

function submitPosition(positionObj, method=""){
    
    let url = `http://localhost:3000/positions`
    if (method === "PATCH"){
        url = `http://localhost:3000/positions/${positionObj.id}`
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

// builders

function buildLeftColumn(user){
    userLink.innerHTML = ""
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
    
    userLink.appendChild(userName)
    
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
    // let closingDate = document.createElement("h3")

    company.innerText = position.company
    title.innerText = position.title 
    dates.innerText = `Posting Date --- Closing Date \n${position.postdate} --- ${position.closingdate}`
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

    posView.append(company, title, salary, dates, status, contact, website, rating, procon, requirements, details, editBtn, deleteBtn)
}

function posForm(position=""){

    let formDiv = document.createElement("div")
    let cancelBtn = document.createElement("button")
    cancelBtn.innerText = "Cancel Edit"
    cancelBtn.onclick = ()=> cancelAction(position)
    formDiv.id = "new_position"
    if (position === ""){
        formDiv.innerHTML = `<form id="position-form">
        <h3>Add a New Position</h3>
        <input
          type="text"
          name="title"
          value=""
          placeholder="Job Title"
          class="input-text"
        />
        <br />
        <input
          type="text"
          name="company"
          value=""
          placeholder="Company Name"
          class="input-text"
        />
        <br />
        <input
        type="text"
        name="salary"
        value=""
        placeholder="Salary"
        class="input-text"
        />
        <br />
        <input
        type="text"
        name="contact"
        value=""
        placeholder="Company Contact"
        class="input-text"
        />
        <br />
        <input
        type="text"
        name="website"
        value=""
        placeholder="Company Website"
        class="input-text"
        />
        <br />
        <input
        type="text"
        name="requirements"
        value=""
        placeholder="Requirements"
        class="input-text"
        />
        <br />
        <input
            type="date"
            name="postdate"
            value=""
            placeholder="Date Posted"
            class="input-text"
        />
        <label name="postdate">Date Posted</label>
        <br />
        <input
        type="date"
        name="closingdate"
        value=""
        placeholder="Closing Date"
        class="input-text"
        />
        <label name="closingdate">Closing Date</label>
        <br />
        <input
            type="text"
            name="rating"
            value=""
            placeholder="Rating"
            class="input-text"
        />
        <br />
        <textarea
        type="text"
        name="procon"
        value=""
        placeholder="Pros/Cons:"
        class="input-text"
        /></textarea>
        <br />
        <input
        type="text"
        name="status"
        value=""
        placeholder="Application Status:"
        class="input-text"
        />
        <br />
        <br />
        <textarea
        id="pos-desc-input-txt" 
        type="text" 
        font-size:1.3em; 
        padding:.5em;
        name="details"
        value=""
        placeholder="Details"
        class="input-text"
        ></textarea>
        <br />
        <input
          type="submit"
          name="submit"
          value="Create Position"
          class="submit"
        />
      </form>`
    } else {
        formDiv.innerHTML = `<form id="position-form">
        <h3>Edit Position</h3>
        <label name="title">Job Title</label>
        <br />
        <input
          type="text"
          name="title"
          value="${position.title}"
          placeholder="Job Title"
          class="input-text"
        />
        <br />
        <label name="company">Company</label>
        <br />
        <input
          type="text"
          name="company"
          value="${position.company}"
          placeholder="Company Name"
          class="input-text"
        />
        <br />
        <label name="salary">Salary</label>
        <br />
        <input
        type="text"
        name="salary"
        value=${position.salary}
        placeholder="Salary"
        class="input-text"
        />
        <br />
        <label name="contact">Company Contact</label>
        <br />
        <input
        type="text"
        name="contact"
        value="${position.contact}"
        placeholder="Company Contact"
        class="input-text"
        />
        <br />
        <label name="website">Company Website</label>
        <br />
        <input
        type="text"
        name="website"
        value=${position.website}
        placeholder="Company Website"
        class="input-text"
        />
        <br />
        <label name="requirements">Requirements</label>
        <br />
        <input
        type="text"
        name="requirements"
        value="${position.requirements}"
        placeholder="Requirements"
        class="input-text"
        />
        <br />
        <label name="postdate">Date Posted</label>
        <br />
        <input
            type="date"
            name="postdate"
            value=${position.postdate}
            placeholder="Date Posted"
            class="input-text"
        />
        <br />
        <label name="closingdate">Closing Date</label>
        <br />
        <input
        type="date"
        name="closingdate"
        value=${position.closingdate}
        placeholder="Closing Date"
        class="input-text"
        />
        <br />
        <label name="rating">Rating</label>
        <br />
        <input
            type="text"
            name="rating"
            value=${position.rating}
            placeholder="Rating"
            class="input-text"
        />
        <br />
        <label name="procon">Pros/Cons</label>
        <br />
        <textarea
        type="text"
        name="procon"
        value="${position.procon}"
        placeholder="Pros/Cons:"
        class="input-text"
        /></textarea>
        <br />
        <label name="status">Application Status</label>
        <br />
        <input
        type="text"
        name="status"
        value=${position.status}
        placeholder="Application Status:"
        class="input-text"
        />
        <br />
        <label name="details">Details</label>
        <br />
        <textarea
        id="details-input"
        type="textarea"
        name="details"
        value="${position.details}"
        placeholder="Details"
        class="input-text"
        /></textarea>
        <br />
        <input
          type="submit"
          name="submit"
          value="Save Edits"
          class="submit"
        />
      </form>`
    }
    formDiv.appendChild(cancelBtn)

    posView.innerHTML = ""
    posView.appendChild(formDiv)
    let form = document.getElementById("position-form")
    form.addEventListener("submit", ()=> handlePosSubmit(position))
}

function handlePosSubmit(position=""){
    event.preventDefault()
    let p = event.target
    let positionObj = {title: p.title.value, company: p.company.value, requirements: p.requirements.value, details: p.details.value, postdate: p.postdate.value, closingdate: p.closingdate.value, salary: p.salary.value, contact: p.contact.value, website: p.website.value, rating: p.rating.value, procon: p.procon.value, status: p.status.value, user_id: userLink.id}

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
    newPosBtn.onclick = () => posForm()
    posMenu.prepend(newPosBtn)
}

// callbacks
function buildPosLi(position){
    let li = document.createElement("li")
        li.onclick = ()=> buildPosView(position)
        li.innerText = position.title
        li.setAttribute('data-pos-id', `${position.id}`)
        // have a link for positions
        posMenuUl.appendChild(li)
}

function cancelAction(position){
    buildPosView(position)
}



// invoke functions
buttonBuilders()
fetchAll(userId)
