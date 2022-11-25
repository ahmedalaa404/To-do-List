const input=document.querySelector('.taskInput');
const submit =document.querySelector('.submit')
const taskDive=document.querySelector('.tasks')
const edites=document.querySelector('.newTaskEdite');
const taskEdites=document.querySelector('.newTaskEdite input');
const changDate=document.querySelector('.newTaskEdite button');
let arrayOfTask=[];


(function()
{
    if(localStorage.getItem('tasks')!=null)
    {
        arrayOfTask=JSON.parse(localStorage.getItem('tasks'));
        displayTasks(arrayOfTask);
    }
    else
    {
        arrayOfTask=[];
    }
})()





submit.addEventListener('click',function()
{
    if(input.value!=="")
    {
        addtasktoArray(input.value);
        input.value=""; 
        // to make value is empty
    }
    displayTasks(arrayOfTask);
})

function addtasktoArray(tasktext)
{
const task=
{
    id:Date.now(),
    title:tasktext,
    complete:false,
}
arrayOfTask.push(task);
localStorage.setItem('tasks',JSON.stringify(arrayOfTask));
}


function displayTasks(tasks)
{
    let concat="";
    let modeDiv,btnAttr;
    
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].complete==true)
        {
             modeDiv='done',
            btnAttr='disabled';
        }
        else
        {
            modeDiv='',
            btnAttr='';
        };
        concat+=`          
          <div class="task d-flex justify-content-between align-items-center my-3 p-3 ${modeDiv}" ondblclick="details(${i})" id="${tasks[i].id}">
        <div>
            <p >${tasks[i].title}</p>
        </div>
        <div class="edites">
            <button class="btn btn-danger" onclick='tasksDone(${i})' ${btnAttr}>delete</button>
            <button class="btn btn-primary" ${btnAttr} onclick="editeTask(${i})">edite</button>
        </div>
    </div>`
    }
    taskDive.innerHTML=concat;
    
}
function tasksDone(x)
{
    arrayOfTask.splice(x,1)
localStorage.setItem('tasks',JSON.stringify(arrayOfTask));
displayTasks(arrayOfTask)
}

function details(x)
{
    if(arrayOfTask[x].complete==true)
    {
        arrayOfTask[x].complete=false;

    }
    else
    {
        arrayOfTask[x].complete=true;
    }
    localStorage.setItem('tasks',JSON.stringify(arrayOfTask));
    displayTasks(arrayOfTask);
}


function editeTask(x)
{
    taskEdites.value=arrayOfTask[x].title;
    edites.classList.replace('d-none','d-block');
    changDate.addEventListener('click',function()
    {
        compareData(x);
    })
}

function compareData(x)
{
    if(arrayOfTask[x].title!=taskEdites.value)
    {
        arrayOfTask[x].title=taskEdites.value;
        arrayOfTask[x].id=Date.now()
    }
    edites.classList.replace('d-block','d-none');
    localStorage.setItem('tasks',JSON.stringify(arrayOfTask));
    displayTasks(arrayOfTask);
}

