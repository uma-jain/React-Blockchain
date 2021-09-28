import React, { useEffect,useState } from "react";

function Todo(props) {  
  console.log(props.tasks);
    const [todoitem,setitem]=useState(null)

    const submittodo=(e)=>{
        e.preventDefault()
        props.CreateTask(todoitem)
    }
    const onValueChange=(e)=>{
            setitem(e.target.value)
    }
    const toggleCheck=(e,id)=>{
      console.log(e.target.name );      
      console.log(id);
      props.toggleCompleted(id)
      
    }

  return (
          <div id="content">
            <form onSubmit={(e)=>submittodo(e)}>
              <input id="newTask" type="text" class="form-control" placeholder="Add task..." required  value={todoitem} onChange={(e)=>{onValueChange(e)}} />
              <button type="button" class="btn btn-primary" type="submit">Add todo</button>
            </form>
            <h5>Todo Tasks</h5>
            <ul id="taskList" className="list-unstyled">
          { props.tasks && props.tasks[0] && props.tasks.map((task, key) => {
         
            {if(!task.completed){
              return(
                <li className="taskTemplate" className="checkbox" key={key}>
                  <label>
                    <input
                    type="checkbox"
                    name={task.id}
                    defaultChecked={task.completed}
                    onClick={(event) => {
                      toggleCheck(event,task.id)
                    }} />
                     <span className="content">{task.content}</span>
                  </label>
                </li>
              )
            }}
          
          })}
        </ul>
        
          <h5>Completed Tasks</h5>
          <ul id="completedTaskList" class="list-unstyled">
          { props.tasks && props.tasks[0] && props.tasks.map((task, key) => {
         
         {if(task.completed){
           return(
             <li className="taskTemplate" className="checkbox" key={key}>
               <label>
                 <input
                 type="checkbox"
                 name={task.id}
                 checked={true}

                 />
                  <span className="content">{task.content}</span>
               </label>
             </li>
           )
         }}
       
       })}             
          </ul>
          </div>
       )
    }
    

export default Todo;
