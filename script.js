function submitForm(){
var title=document.getElementById('title');
var priority=document.getElementById('priority');
var due=document.getElementById('duedate');
var comment=document.getElementById('comment');

if(title===''){
    alert('Please enter the title');
    return false;
}
return true;
}

function display(){
    var list;
    if(localStorage.getItem('tasks')!=null){
        list=JSON.parse(localStorage.getItem('tasks'));
    }
    else{
        list=[];
    }

    var taskDetails="";
    list.forEach((e,ind)=>{
        var pc='';
        if(e.priority==='Higher'){
          pc='<td id="ph">Higher</td>';
        }
        else if(e.priority==='Normal'){
          pc='<td id="pn">Normal</td>';
        }
        else if(e.priority==='Lower'){
          pc='<td id="pl">Lower</td>';
        }
        taskDetails+=
        "<tr>"+"<td>"+ e.title + "</td>"+"<td>"+e.due+"</td>";
        if(pc===''){
            taskDetails+="<td></td>";
        }
        else{
        taskDetails+=pc;
        }
        taskDetails+="<td>"+e.comment+"</td>"+
        "<td>"+'<button class="btn btn-success" onclick="editFun('+ind+')" id="edit">Edit</button>'+
        '<button class="btn btn-danger" onclick="delFun('+ind+')" id="delete">Delete</button></td></tr>'
    });

    document.querySelector('#tableList tbody').innerHTML=taskDetails;
}


var add=document.getElementById('Submit');

add.onclick=function(){

    if(submitForm()==true){
        var title=document.getElementById('title').value;
        var prior=document.getElementById('priority').value;
        var due=document.getElementById('duedate').value;
        var comms=document.getElementById('comment').value;

        if(localStorage.getItem('tasks')===null){
            list=[];
        }
        else{
            list=JSON.parse(localStorage.getItem('tasks')) 
        }

        list.push({
            title:title,
            due:due,
            priority:prior,
            comment:comms
        });

        localStorage.setItem('tasks',JSON.stringify(list));
        display();

        document.getElementById('title').value="";
        document.getElementById('duedate').value="";
        document.getElementById('priority').value="";
        document.getElementById('comment').value="";

    }
}


//del function
function delFun(ind){
    if(localStorage.getItem('tasks')===null){
        list=[];
    }
    else{
        list=JSON.parse(localStorage.getItem('tasks')) 
    }

   list.splice(ind,1);
   localStorage.setItem('tasks',JSON.stringify(list));
   display();
}

//edit function
function editFun(ind){
    document.getElementById('Submit').style.display='none';
    document.getElementById('Update').style.display='block';

    var list;
    if(localStorage.getItem('tasks')===null){
        list=[];
    }
    else{
        list=JSON.parse(localStorage.getItem('tasks')) 
    }

    document.getElementById('title').value=list[ind].title;
    document.getElementById('duedate').value=list[ind].due;
    document.getElementById('priority').value=list[ind].priority;
    document.getElementById('comment').value=list[ind].comment;

    document.querySelector('#Update').onclick=function(){
        if(submitForm()==true){
            list[ind].title=document.getElementById('title').value;
            list[ind].due=document.getElementById('duedate').value;
            list[ind].priority=document.getElementById('priority').value;
            list[ind].comment=document.getElementById('comment').value;

            localStorage.setItem('tasks',JSON.stringify(list));
            display();

            document.getElementById('title').value="";
            document.getElementById('duedate').value="";
            document.getElementById('priority').value="";
            document.getElementById('comment').value="";

            document.getElementById('Submit').style.display='block';
            document.getElementById('Update').style.display='none';
        }
    }

}

window.addEventListener('load',function(){
    display();
})
