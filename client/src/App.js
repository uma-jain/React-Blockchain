import React, { useEffect,useState } from "react";
import HelloWorld from "./contracts/HelloWorld.json";
import Todo from "./contracts/Todo.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import TodoList from "./Todo"

function App() {
    const [web3,setweb3]=useState(null)
    const [greet,setgreet]=useState(null)
    const [todostate,settodostate]=useState(null)    
    const [account,setaccount]=useState(null)
    const [loading,setloading]=useState(false)
    const [tasks,settasks]=useState([])
    
    useEffect(()=>{      

        async function fetchMyAPI() {
          const web3 = await getWeb3();
          setweb3(web3)
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
          setaccount(accounts[0])
      
          
      const networkId = await web3.eth.net.getId();

      let deployedNetwork =  HelloWorld.networks[networkId];
      if(deployedNetwork){  
      const helloWorldInstance = new web3.eth.Contract( HelloWorld.abi, deployedNetwork.address );
      const greetingResponse = await helloWorldInstance.methods.getGreeting().call();
        
      setgreet(greetingResponse)   
      }
      else{
            alert("decentragram contract  not deployed to detected netwroks")
      }
      deployedNetwork =  Todo.networks[networkId];
      if(deployedNetwork){
        const TodoInstance = new web3.eth.Contract( Todo.abi, deployedNetwork.address );
        settodostate(TodoInstance)    
        if(TodoInstance){

        TodoInstance.events.TaskCreated({
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error, event){ console.log(event); })
        .on('data',async function(event){
          console.log("event trigerred");
          var data=[]
            console.log(event); // same results as the optional callback above
            const taskCount = await TodoInstance.methods.taskCount().call()
            console.log(taskCount);
             for (var i = 1; i <= taskCount; i++) {
               const task = await TodoInstance.methods.tasks(i).call()
               data=[...data,task]
             }  
             console.log(data);                
             settasks(data)
           
          }) 
          TodoInstance.events.TaskCompleted({
            filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0
        }, function(error, event){ console.log(event); })
        .on('data',async function(event){
          console.log("event trigerred");
          var data=[]
            console.log(event); // same results as the optional callback above
            const taskCount = await TodoInstance.methods.taskCount().call()
            console.log(taskCount);
             for (var i = 1; i <= taskCount; i++) {
               const task = await TodoInstance.methods.tasks(i).call()
               data=[...data,task]
             }  
             console.log(data);                
             settasks(data)
           
          })               
        }
       
      }
      else{
        alert("deployed contract todo not found")
   
      }    
        }
    
        fetchMyAPI()

      

    },[])

    const CreateTask=(str)=>{
     setloading(loading)
     console.log(str);
     todostate.methods.createTask(str).send({from:account})


    }

    const toggleCompleted=(id)=>{
      setloading(loading)
      console.log(IDBCursorWithValue);
     todostate.methods.toggleCompleted(id).send({ from: account })
      .once('receipt', (receipt) => {
       console.log(receipt);
      })
 
     }
        if (!web3) {
          return <div>Loading Web3, accounts, and contract...</div>;
        }
         return (
          
      <div className="App">
      <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0"  target="_blank">Dapp University | Todo List</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small><a class="nav-link" href="#"><span id="account"></span></a></small>
        </li>
      </ul>
    </nav>
      <div class="row">
        <main role="main" class="col-lg-12  justify-content-center">
         { loading &&
         <div id="loader" class="text-center">
            <p class="text-center">Loading...</p>
          </div>}
          </main>
        </div>
        <TodoList
        CreateTask={CreateTask}
        tasks={tasks}
        toggleCompleted={toggleCompleted}
        >

        </TodoList>

    <hr />
            <div>The stored value is: {account}</div>
            <div>The data value is: {greet}</div>
          </div>
        )
    }
    

export default App;
