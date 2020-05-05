// click position -->
// popliate the stage view with all the stages that have occured. 
// add button to stage area where stage can be added
// fill out form for stage

// replace position view with stage

const POSITION_URL = "http://localhost:3000/positions"

// builders

function buildStageShow(stage) {
    stageView.innerHTML = ''
    const div = document.createElement('div')
    const title = document.createElement('h3')
    const status = document.createElement('p')
    const startDate = document.createElement('p')
    const endDate = document.createElement('p')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')

    title.innerText = `Title: ${stage.title}`
    status.innerText = `Status: ${stage.status}`
    startDate.innerText = `Start date: ${stage.startdate}`
    endDate.innerText = `End date: ${stage.enddate}`
    editBtn.innerText = 'Edit'
    deleteBtn.innerText ='Delete'

    editBtn.addEventListener('click', ()=> stageForm(stage))
    // if stage form exist new form
    // else set values
    deleteBtn.addEventListener('click', ()=> handleDelete(stage))

    div.append(title, status, startDate, endDate, editBtn, deleteBtn)
    stageView.appendChild(div)
}

function buildStageList(stage) {
    const li = document.createElement('li')

    li.innerText = stage.title
    li.onclick = () => buildStageShow(stage);

    stageUl.appendChild(li)
}

function stageForm(stage) { //<--- position will go in the argument whenthe stage button is moved.
    if (stage === "") {
        stageView.innerHTML = 'New Stage'

        const div = document.createElement('div')
        const form = document.createElement('form')
        const title = document.createElement('input')
        const status = document.createElement('input')
        const startDate = document.createElement('input')
        const endDate = document.createElement('input')
        const submit = document.createElement('button')

        div.id = 'new_stage'
        title.type = 'text'
        title.name = 'title'
        title.placeholder = 'Title'
        status.type = 'text'
        status.name = 'status'
        status.placeholder = 'Status'
        startDate.type = 'date'
        startDate.name = 'startdate'
        endDate.type = 'date'
        endDate.name = 'enddate'
        submit.type = 'submit'
        submit.name = 'submit'
        submit.innerText = 'Add Stage'

        form.append(title, status, startDate, endDate, submit)
        div.appendChild(form)
        stageView.appendChild(div)

        form.addEventListener('submit', ()=> handleStageSubmit(stage))
    } else {
        stageView.innerHTML = ''
        const div = document.createElement('div')
        const form = document.createElement('form')
        const title = document.createElement('input')
        const status = document.createElement('input')
        const startDate = document.createElement('input')
        const endDate = document.createElement('input')
        const submit = document.createElement('button')

        div.id = 'new_stage'
        title.type = 'text'
        title.name = 'title'
        title.value = stage.title
        status.type = 'text'
        status.name = 'status'
        status.value = stage.status
        startDate.type = 'date'
        startDate.name = 'startdate'
        startDate.value = stage.startdate
        endDate.type = 'date'
        endDate.name = 'enddate'
        endDate.value = stage.enddate
        submit.type = 'submit'
        submit.name = 'submit'
        submit.innerText = 'Add Stage'

        form.append(title, status, startDate, endDate, submit)
        div.appendChild(form)
        stageView.appendChild(div)

        form.addEventListener('submit', ()=> handleStageSubmit(stage))

    }
}

// handler

function handleEdit(stage) {


}

function handleDelete(stage) {

}

function handleStageSubmit(position) {
    event.preventDefault();
    let stageObj = {
        title: event.target.title.value,
        status: event.target.status.value,
        startdate: event.target.startdate.value,
        enddate: event.target.enddate.value,
        position_id: position.id
    }
    if (position === "") {
        submitStage(stageObj, 'POST')
    } else {
        submitStage(stageObj, 'PATCH')
    }
}

function handleStageSubmit(stage) {
    event.preventDefault();
    let stageObj = {
        title: event.target.title.value,
        status: event.target.status.value,
        startdate: event.target.startdate.value,
        enddate: event.target.enddate.value,
        position_id: position.id
    }
    if (position === "") {
        submitStage(stageObj, 'POST')
    } else {
        submitStage(stageObj, 'PATCH')
    }
}

// fetches

function submitStage(stageObj, method = '') {
    if (method === 'PATCH') 
    fetch(STAGE_URL, {
        method: method,
        headers: {
            'Content-Type': "application/json",
            Accepts: 'Application/json'
        },
        body: JSON.stringify(stageObj)
    })
    .then(resp => resp.json())
    .then(console.log) // need to add new stage to stage list


}

function fetchPosition(positionID) {
    fetch(`${POSITION_URL}/${positionID}`)
    .then(res => res.json())
    .then(position => {
        position.stages.forEach(stage => {
            buildStageList(stage)
        })
    })
}

function fetchStage(positionID){
    fetch(`${STAGE_URL}/${positionID}`)
    .then(res => res.json())
    .then(stage => buildStageShow(stage))
}


fetchPosition(positionID)
fetchStage(positionID)