const newTask = document.getElementsByClassName("new-task");
const enterTask = document.getElementById("enter-task"); 
const allTasks = document.getElementById("tasks");
const activeTasks = document.getElementById("tasks-active");
const completedTasks = document.getElementById("tasks-completed");
const itemPending = document.getElementById("item-pending");
const allButton = document.getElementById("all");
const activeButton = document.getElementById("active");
const completedButton = document.getElementById("completed");
const clearCompletedButton  =document.getElementById("clear-completed");
var lightDrakTheme = document.getElementById("theme");
let ENTRY_LIST = JSON.parse(localStorage.getItem("entryList")) || [];
var theme = JSON.parse(localStorage.getItem("themeColor")) || "dark";
updateThemeColor();
var count=0;
// console.log(itemPending,allButton,activeButton,completedButton,clearCompletedButton);
allButton.addEventListener("click",()=>{
    show(allTasks);
    hide([activeTasks,completedTasks]);
    active(allButton);
    active(mobileAllButton);
    inactive([mobileActiveButton,mobileCompletedButton]);
    inactive([activeButton, completedButton]);
})
activeButton.addEventListener("click",()=>{
    show(activeTasks);
    hide([allTasks,completedTasks]);
    active(activeButton);
    active(mobileActiveButton);
    inactive([mobileAllButton,mobileCompletedButton])
    inactive([allButton,completedButton]);
    const labels = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(labels);
    if(document.getElementById("theme").className.includes("theme")){
        lightThemeStyles();
    }
    else{
        darkThemeStyle();
    }
})
completedButton.addEventListener("click",()=>{
    show(completedTasks);
    hide([allTasks,activeTasks]);
    active(completedButton);
    active(mobileCompletedButton);
    inactive([mobileAllButton,mobileActiveButton])
    inactive([allButton,activeButton]);
    const labels = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(labels);
    if(document.getElementById("theme").className.includes("theme")){
        lightThemeStyles();
    }
    else{
        darkThemeStyle();
    }
})
function show(element){
    element.classList.remove("hide");
}
function hide(elements){
    elements.forEach(element => {
        element.classList.add("hide");
    });
}
function active(element){
    element.classList.add("active-button")
}
function inactive(elements){
    elements.forEach(element=>{
        element.classList.remove("active-button");
    })
}

function checkScreenWidth(){
    const buttonStateDesktop = document.getElementById("states");
    
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth>500){
        // const footerDesktop = document.getElementsByClassName("footer");
        buttonStateDesktop.classList.remove("hide");
        // console.log(footerDesktop[0]);
    }else{
        buttonStateDesktop.classList.add("hide");
    }
}
window.addEventListener('DOMContentLoaded', function() {
    checkScreenWidth();
  });

  window.addEventListener('resize', function() {
    checkScreenWidth();
  });
const mobileAllButton = document.getElementById("mobile-all");
const mobileActiveButton = document.getElementById("mobile-active");
const mobileCompletedButton = document.getElementById("mobile-completed");
mobileAllButton.addEventListener("click",()=>{
    show(allTasks);
    hide([activeTasks,completedTasks]);
    active(mobileAllButton);
    inactive([mobileActiveButton, mobileCompletedButton]);
    inactive([activeButton, completedButton]);
    active(allButton);

});
mobileActiveButton.addEventListener("click",()=>{
    show(activeTasks);
    hide([allTasks,completedTasks]);
    active(mobileActiveButton);
    active(activeButton);
    inactive([mobileAllButton,mobileCompletedButton]);
    inactive([allButton, completedButton]);
    const labels = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(labels);
    if(document.getElementById("theme").className.includes("theme")){
        lightThemeStyles();
    }
    else{
        darkThemeStyle();
    }
});
mobileCompletedButton.addEventListener("click",()=>{
    show(completedTasks);
    hide([allTasks,activeTasks]);
    active(mobileCompletedButton);
    active(completedButton);
    inactive([mobileAllButton,mobileActiveButton]);
    inactive([allButton,activeButton]);
    const labels = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(labels);
    if(document.getElementById("theme").className.includes("theme")){
        lightThemeStyles();
    }
    else{
        darkThemeStyle();
    }
});
// key typed by user
document.addEventListener("keydown",(event)=>{
    var keyValue = event.key;
    var inputValue = enterTask.value;

    if(keyValue==="Enter"){

        if(inputValue!==""){

            ENTRY_LIST.push({task:inputValue,
            completed:false});
            updateLocalStorage();
            count++;
            retrieveDataAndView();
            enterTask.value="";
            labels = document.querySelectorAll(".check-box label");
            checkActiveTasks(labels);

            const newcompletedTasks = document.getElementById("tasks-completed");
            const newallTasks = document.getElementById("tasks");
            TasksLeftCount(newallTasks,newcompletedTasks);
            saveCheckUncheckStatus();
            console.log(ENTRY_LIST);
            if(document.getElementById("theme").className.includes("theme")){
                lightThemeStyles();
            }


        }
        
    }
})
function retrieveDataAndView(){
    allTasks.innerHTML=``;
    var count=0
    for(var i=0;i<ENTRY_LIST.length;i++){
        count++;
        const entry = `<div class="check-box">
        <input type="checkbox"    id="myCheckboxTasks${count}">
        <label for="myCheckboxTasks${count}"></label>
        <p>${ENTRY_LIST[i].task}</p>
        <div class="close-icon"></div>
    </div>`
        allTasks.insertAdjacentHTML("afterbegin",entry);
    }
    const newLabel = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(newLabel);
    // saveCheckUncheckStatus()
    // retrieveCheckedUncheckedTasks();
    if(document.getElementById("theme").className.includes("theme")){
        lightThemeStyles();
    }
    else{
        darkThemeStyle();
    }
    const newAllTask = document.getElementById("tasks");
    const newcompletedTasks = document.getElementById("tasks-completed");
    TasksLeftCount(newAllTask, newcompletedTasks);
 
}
// retrieveDataAndView();
function retrieveCheckedUncheckedTasks(){
    var checkedTask = document.querySelectorAll('#tasks .check-box input[type="checkbox"]');
    for(var i=0;i<checkedTask.length;i++){
        checkedTask[i].checked=ENTRY_LIST[i].completed;
    }
}
allTasks.addEventListener("click", function (event) {
    var newlabels = document.querySelectorAll(".check-box label");
    checkActiveCompleteTasks(newlabels);
    const newcheckBox = document.querySelectorAll('.check-box input[type="checkbox"]');
    if (event.target.matches('.check-box input[type="checkbox"]')) {
        const checkbox = event.target;
        const paragraph = checkbox.parentElement.querySelector('p');

        if (checkbox.checked) {
        // Handle checked state
            const newcompletedTasks = document.getElementById("tasks-completed");
            const newallTasks = document.getElementById("tasks");
            // console.log(document.getElementById("theme").className.includes("theme"));
            paragraph.style.textDecoration='line-through';
            if(document.getElementById("theme").className.includes("theme")){
                paragraph.style.color="hsl(233, 11%, 84%)";
            }else if(!document.getElementById("theme").className.includes("theme")){
                paragraph.style.color="hsl(234, 11%, 52%)";
            }
            TasksLeftCount(newallTasks, newcompletedTasks);
            let index = -1;
            for (let i = 0; i < ENTRY_LIST.length; i++) {
                if (ENTRY_LIST[i].task === paragraph.textContent) {
                    index = i;
                    break;
                }
            }
            
            if (index !== -1) {
                ENTRY_LIST[index].completed = true;
                updateLocalStorage();
            }
        } else {
        // Handle unchecked state
            const newcompletedTasks = document.getElementById("tasks-completed");
            const newallTasks = document.getElementById("tasks");
            paragraph.style.textDecoration="none";
            if(document.getElementById("theme").className.includes("theme")){
                paragraph.style.color="hsl(235, 24%, 19%)";
            }else if(!document.getElementById("theme").className.includes("theme")){
                paragraph.style.color="hsl(234, 39%, 85%)";
            }
            TasksLeftCount(newallTasks, newcompletedTasks);

            let index = -1;
            for (let i = 0; i < ENTRY_LIST.length; i++) {
                if (ENTRY_LIST[i].task === paragraph.textContent) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                ENTRY_LIST[index].completed = false;
                updateLocalStorage();
            }
        }

    }
    if (event.target.classList.contains("close-icon")) {
        const parentDiv = event.target.parentElement;
        const taskText = parentDiv.querySelector("p").textContent;
        let index=-1;
        for(let i=0;i<ENTRY_LIST.length;i++){
            if(ENTRY_LIST[i].task===taskText){
                index=i;
                break;
            }
        }

        if (index !== -1) {
            console.log(ENTRY_LIST);

            ENTRY_LIST.splice(index, 1);
            updateLocalStorage();
            retrieveDataAndView();
            saveCheckUncheckStatus();
            refreshTasksLeftCount();
            // refreshTasksLeftCount();
            var numberOfCloseIcon= document.querySelectorAll(".check-box .close-icon");
        }
    }

});
retrieveDataAndView();
saveCheckUncheckStatus();
function saveCheckUncheckStatus(){
    var checkedTask = document.querySelectorAll('.check-box input[type="checkbox"]');
    // console.log(checkedTask);
    for(var i=0;i<ENTRY_LIST.length;i++){
        checkedTask[ENTRY_LIST.length-1-i].checked=ENTRY_LIST[i].completed;
        if(ENTRY_LIST[i].completed===true){
            checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.textDecoration="line-through"; 
            if(document.getElementById("theme").className.includes("theme")){
                checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.color="hsl(233, 11%, 84%)";
            }else if(!document.getElementById("theme").className.includes("theme")){
                checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.color="hsl(234, 11%, 52%)";
            }
        }
        
        else if(ENTRY_LIST[i].completed===false){
            checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.textDecoration="none"; 
            if(document.getElementById("theme").className.includes("theme")){
                checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.color="hsl(235, 24%, 19%)";
            }else if(!document.getElementById("theme").className.includes("theme")){
                checkedTask[ENTRY_LIST.length-1-i].parentElement.querySelector("p").style.color="hsl(234, 39%, 85%)";
            }
             
        }
    }
}
var checkedTask = document.querySelectorAll('.check-box input[type="checkbox"]');
function checkActiveTasks(labels){
    // const labels = document.querySelectorAll(".check-box label");
    clearTasks([activeTasks,completedTasks])
    labels.forEach((label)=>{
        // console.log(label);
        const checkBox = document.getElementById(label.getAttribute("for"));
        const checkBoxIdentification = label.getAttribute("for");
        if(!checkBox.checked){
            const parentDivText = checkBox.parentElement.innerText;
            const newDivElements = document.createElement("div");
            newDivElements.className=`${checkBoxIdentification}`;
            newDivElements.innerHTML=`<p>${parentDivText}</p>`
            activeTasks.appendChild(newDivElements);    
        }
    })  
}

function checkActiveCompleteTasks(labels){
    // const labels = document.querySelectorAll(".check-box label");
    clearTasks([activeTasks,completedTasks])
    labels.forEach((label)=>{
        // console.log(label);
        const checkBox = document.getElementById(label.getAttribute("for"));
        const checkBoxIdentification = label.getAttribute("for");
        // console.log(checkBox);
        if(checkBox.checked){
            const parentDivText = checkBox.parentElement.innerText;
            // console.log(parentDivText);
            const newDivElements = document.createElement("div");
            newDivElements.className=`${checkBoxIdentification}`;
            newDivElements.innerHTML=`<p>${parentDivText}</p>`
            completedTasks.appendChild(newDivElements);
            // console.log(parentDiv.innerText);
        }
        if(!checkBox.checked){
            const parentDivText = checkBox.parentElement.innerText;
            const newDivElements = document.createElement("div");
            newDivElements.className=`${checkBoxIdentification}`;
            newDivElements.innerHTML=`<p>${parentDivText}</p>`
            activeTasks.appendChild(newDivElements);    
        }
    })  
}
function clearTasks(elements){
    elements.forEach(element =>{
        element.innerHTML=``;
    })
}
function refreshTasksLeftCount(){
    var completedInEmptyList = 0;
    for(var i=0;i<ENTRY_LIST.length;i++){
        if(ENTRY_LIST[i].completed===true){
            completedInEmptyList+=1;
        }
    }
    var pending = ENTRY_LIST.length-completedInEmptyList;
    if(pending===1){
        itemPending.innerText=`${pending} item left`;
    }
    else{
        itemPending.innerText=`${pending} items left`;
    }

}
refreshTasksLeftCount();
function TasksLeftCount(allTasks,completedTasks){
    // console.log(completedTasks.children.length);
    var pending = allTasks.children.length-completedTasks.children.length;
    // console.log(`pending + ${pending}`);
    if(pending===1){
        itemPending.innerText=`${pending} item left`;
    }
    else{
        itemPending.innerText=`${pending} items left`;
    }   
}
function clearCompleted(){
    for(var i=0;i<ENTRY_LIST.length;i++){
        if(ENTRY_LIST[i].completed===true){
            ENTRY_LIST[i].completed=false;
            updateLocalStorage();
        }
    }
    retrieveDataAndView();
    saveCheckUncheckStatus();
    refreshTasksLeftCount();
}
clearCompletedButton.addEventListener("click",clearCompleted);

function themeChangerIcon(){
    lightDrakTheme.classList.toggle("theme");
    // document.body.style.background="white";
}
lightDrakTheme.addEventListener("click",function(){
    themeChangerIcon();
    if(document.getElementById("theme").className.includes("theme")){
        theme="light";
        updateThemeColor();
        lightThemeStyles();
        console.log(theme);
    }
    else{
        theme="dark";
        updateThemeColor();
        console.log(theme);
        darkThemeStyle();
    }
    

    // lineThroughStyleAsTheme(); 
    saveCheckUncheckStatus();
});
// checkActiveCompleteTasks();
function updateLocalStorage(){
    localStorage.setItem("entryList", JSON.stringify(ENTRY_LIST));
} 
function updateThemeColor(){
    localStorage.setItem("themeColor", JSON.stringify(theme));
}
function lightThemeStyles(){
    document.querySelector("body").classList.add("light-body");
    document.getElementsByClassName("new-task")[0].classList.add("new-task-light");
    document.querySelector('.new-task input[type="text"]').classList.add("enter-task-light");
    const light_task_theme = document.querySelectorAll("#tasks .check-box");
    const light_tasks_label = document.querySelectorAll("#tasks label");
    for(var i=0;i<light_tasks_label.length;i++){
        light_tasks_label[i].classList.add("tasks-label-light");
    }
    document.getElementById("tasks").classList.add("tasks-light");
    for(var i=0;i<light_task_theme.length;i++){
        light_task_theme[i].classList.add("tasks-check-box-light");
    }
    document.getElementsByClassName("footer")[0].classList.add("footer-light");
    const footer_button_light = document.querySelectorAll(".footer button");
    for(var i=0;i<footer_button_light.length;i++){
        footer_button_light[i].classList.add("footer-button-light");
    }
    document.getElementById("item-pending").classList.add("item-pending-light");
    document.getElementById("clear-completed").classList.add("clear-completed-light"); 
    const numberOfLineThrough = document.querySelectorAll("#tasks .check-box p");
    for (var i = 0; i < numberOfLineThrough.length; i++) {
        numberOfLineThrough[i].classList.add("tasks-light");
    }
    document.getElementsByClassName("mobile-footer")[0].classList.add("mobile-footer-light");
    const activeTasksStyleLight = document.querySelectorAll("#tasks-active div");

    for(var i=0;i<activeTasksStyleLight.length;i++){
        activeTasksStyleLight[i].classList.add("tasks-active-light");
    }
    const completedTasksStyleLight = document.querySelectorAll("#tasks-completed div");
    for(var i=0;i<completedTasksStyleLight.length;i++){
        completedTasksStyleLight[i].classList.add("tasks-completed-light");
    }
}
function darkThemeStyle(){
    document.querySelector("body").classList.remove("light-body");
    document.getElementsByClassName("new-task")[0].classList.remove("new-task-light");
    document.querySelector('.new-task input[type="text"]').classList.remove("enter-task-light");
    const light_task_theme = document.querySelectorAll("#tasks .check-box");
    const light_tasks_label = document.querySelectorAll("#tasks label");
    for(var i=0;i<light_tasks_label.length;i++){
        light_tasks_label[i].classList.remove("tasks-label-light");
    }
    document.getElementById("tasks").classList.remove("tasks-light");
    for(var i=0;i<light_task_theme.length;i++){
        light_task_theme[i].classList.remove("tasks-check-box-light");
    }
    document.getElementsByClassName("footer")[0].classList.remove("footer-light");
    const footer_button_light = document.querySelectorAll(".footer button");
    for(var i=0;i<footer_button_light.length;i++){
        footer_button_light[i].classList.remove("footer-button-light");
    }
    document.getElementById("item-pending").classList.remove("item-pending-light");
    document.getElementById("clear-completed").classList.remove("clear-completed-light"); 
    const numberOfLineThrough = document.querySelectorAll("#tasks .check-box p");
    for (var i = 0; i < numberOfLineThrough.length; i++) {
        numberOfLineThrough[i].classList.remove("tasks-light");
    }
    document.getElementsByClassName("mobile-footer")[0].classList.remove("mobile-footer-light");
    const activeTasksStyleLight = document.querySelectorAll("#tasks-active div");
    console.log(activeTasksStyleLight);
    for(var i=0;i<activeTasksStyleLight.length;i++){
        activeTasksStyleLight[i].classList.remove("tasks-active-light");
    }
    const completedTasksStyleLight = document.querySelectorAll("#tasks-completed div");
    for(var i=0;i<completedTasksStyleLight.length;i++){
        completedTasksStyleLight[i].classList.remove("tasks-completed-light");
    }
    
}
if(theme==="light"){
    document.getElementById("theme").classList.add("theme"); 
    lightThemeStyles();
    saveCheckUncheckStatus();
}else{
    darkThemeStyle();
    saveCheckUncheckStatus();
}
// lineThroughStyleAsTheme();