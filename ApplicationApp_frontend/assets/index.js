const userLink = document.body.querySelector(".home")
const posMenu = document.body.querySelector(".positions")

const graphs = document.body.querySelector(".graphs")
const posView = document.body.querySelector(".position-view")
const stageView = document.body.querySelector(".stage-view")
const noteView = document.body.querySelector(".note-view")

const tasks = document.body.querySelector(".tasks")

const userId = 1

// fetches 

function fetchAll(userId){
    fetch(`http://localhost:3000/users/${userId}`)
    .then(resp => resp.json())
    .then(user => buildLeftColumn(user))
}


// builders

function buildLeftColumn(user){
    let userName = document.createElement("h2")
    let posMenuUl = document.createElement("ul")
    // debugger 
    userName.innerText = user.username 
    // have a link for usrname
    // userName.onclick = ()=> openUser(user)
    
    user.positions.forEach(position => {
        let li = document.createElement("li")
        li.onclick = ()=> openView(position)
        li.innerText = position.title
        // have a link for positions
        posMenuUl.appendChild(li)
    })
    userLink.appendChild(userName)
    posMenu.appendChild(posMenuUl)
}

fetchAll(userId)