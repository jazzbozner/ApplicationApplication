const userLink = document.body.querySelector(".home")
const posMenu = document.body.querySelector(".positions")

const graphs = document.body.querySelector(".graphs")
const posView = document.body.querySelector(".position-view")
const stageView = document.body.querySelector(".stage-view")
const noteView = document.body.querySelector(".note-view")

const tasks = document.body.querySelector(".tasks")

const userId = 1
const posMenuUl = document.getElementById("positions-ul")

// fetches 

function fetchAll(userId){
    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp => resp.json())
    .then(user => buildLeftColumn(user))
}

function postPosition(positionObj){
    fetch(`http://localhost:3000/positions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify(positionObj)
    })
    .then(resp => resp.json())
    .then(position => {
        buildPosView(position)
        buildPosLi(position)
    })
}

// builders

function buildLeftColumn(user){
    let userName = document.createElement("h2")

    // debugger 
    userName.innerText = user.username
    userLink.id = user.id 
    // have a link for usrname
    // userName.onclick = ()=> openUser(user)
    
    user.positions.forEach(position => {
        buildPosLi(position)
    })
    userLink.appendChild(userName)
    
}

function buildPosView(position){
    posView.innerHTML = ""
    
    let title = document.createElement("h1")
    let company = document.createElement("h2")
    let contact = document.createElement("h3")
    let details = document.createElement("p")
    let dates = document.createElement("h3")
    let procon = document.createElement("p")
    let rating = document.createElement("p")
    let requirements = document.createElement("p")
    let salary = document.createElement("h1")
    let status = document.createElement("h3")
    let website = document.createElement("p")
    // let closingDate = document.createElement("h3")

    company.innerText = position.company
    title.innerText = position.title 
    dates.innerText = `${position.postdate}---${position.closingdate}`
    salary.innerText = position.salary 
    details.innerText = position.details 
    requirements.innerText = position.requirements
    contact.innerText = position.contact
    website.innerText = position.website
    procon.innerText = position.procon 
    rating.innerText = position.rating 
    status.innerText = position.status 

    posView.append(company, title, status, dates, salary, contact, website, rating, procon, requirements, details)
}

function posForm(){
    checkToggle(graphDIV)
    let formDiv = document.createElement("div")
    formDiv.id = "new_position"
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
    <input
    type="text"
    name="procon"
    value=""
    placeholder="Pros/Cons:"
    class="input-text"
    />
    <br />
    <input
    type="text"
    name="status"
    value=""
    placeholder="Application Status:"
    class="input-text"
    />
    <br />
    <input
    type="text"
    name="details"
    value=""
    placeholder="Details"
    class="input-text"
    />
    <br />
    <br>
    <input
      type="submit"
      name="submit"
      value="Create Position"
      class="submit"
    />
  </form>`
    posView.innerHTML = ""
    posView.appendChild(formDiv)
    let form = document.getElementById("position-form")
    form.addEventListener("submit", ()=> handlePosSubmit())
}

function handlePosSubmit(){
    event.preventDefault()
    let p = event.target
    let position = {title: p.title.value, company: p.company.value, requirements: p.requirements.value, details: p.details.value, postdate: p.postdate.value, closingdate: p.closingdate.value, salary: p.salary.value, contact: p.contact.value, website: p.website.value, rating: p.rating.value, procon: p.procon.value, status: p.status.value, user_id: userLink.id}
    postPosition(position)
}

function buttonBuilders(){
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
        // have a link for positions
        posMenuUl.appendChild(li)
}

// invoke functions
buttonBuilders()
fetchAll(userId)