const input=document.querySelector('input');
const submit =document.querySelector('.submit')
const taskDive=document.querySelector('.tasks')
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
            <button class="btn btn-primary" ${btnAttr}>edite</button>
        </div>
    </div>`
    }
    taskDive.innerHTML=concat;
    
}

input.addEventListener('click',function(e){console.log(e)})

function tasksDone(x)
{
arrayOfTask[x].complete=true;
localStorage.setItem('tasks',JSON.stringify(arrayOfTask));
displayTasks(arrayOfTask)
}

function details(x)
{
    if(arrayOfTask[x].complete==true)
    {
        arrayOfTask[x].complete=false;
        displayTasks(arrayOfTask);
    }

}