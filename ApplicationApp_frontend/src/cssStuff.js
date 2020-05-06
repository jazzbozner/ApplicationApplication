// function collapsePositionMenu(){
//     const coll = document.getElementsByClassName("collapsible");
    

//     for (let i = 0; i < coll.length; i++) {
//         coll[i].addEventListener("click", function() {
//         this.classList.toggle("active");
//         const content = this.nextElementSibling;
//         if (content.style.display === "block") {
//         content.style.display = "none";
//         } else {
//         content.style.display = "block";
//         }
//     });
//     }
// }
// const coll = document.getElementsByClassName("collapsible");
// coll[0].addEventListener("click", ()=> collapsePositionMenu())

// function collapsePositionMenu(){
//         coll[0].classList.toggle("active");
//         const content = coll[0].nextElementSibling;
//         if (content.style.display === "block") {
//         content.style.display = "none";
//         } else {
//         content.style.display = "block";
//         }
// }

const coll = document.getElementsByClassName("collapsible");
coll[0].addEventListener("click", ()=> collapsePositionMenu())

function collapsePositionMenu(){
        coll[0].classList.toggle("active");
        const content = coll[0].nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
        content.style.maxHeight = content.scrollHeight + "px";
        }
        
}






// for sidebar

function openTaskNav() {
    let sidepanel = document.getElementById("myTasksSidepanel")
    if (sidepanel.style.width === "250px"){
        closeTaskNav()
    } else {
        sidepanel.style.width = "250px";
    }
}
      
/* Set the width of the sidebar to 0 (hide it) */
function closeTaskNav() {
    document.getElementById("myTasksSidepanel").style.width = "0";
}


openTaskNav()
closeTaskNav()