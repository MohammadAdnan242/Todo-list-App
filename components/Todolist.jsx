import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import '../components/Todolist.css'

const Todolist =()=>{
   //usestate hook for visibility of screen
   const[isCompleteScreen,setisCompleteScreen] = useState(false);
   // usestate hook for all todo list items
   const[Newtodos,setNewtodos]=useState([])
   // useState hooks for title 
 const[newTitle,setnewTitle] =useState("")
 // useState hooks for description
 const[newDescription,setnewDescription] =useState("")
// useState hooks for completion of task
 const[completedTodos,setcompletedTodos] = useState([]);

 // hooks for editing purpose in item list 
 const[currentEdit,setcurrentEdit] =useState("")
 const[currentEditedItem,setcurrentEditedItem] =useState("")

 // useState hook for search query
 const [searchQuery, setSearchQuery] = useState("");

  // Function to filter todos based on search query
const filteredTodos = Newtodos.filter((item)=>{
  if(searchQuery==item){
    return item;
  }
  else if( item.title.toLowerCase().includes(searchQuery.toLowerCase())){
    return item ;
  }
}


);
 


  // console.log(Newtodos)
// function for adding new item in list
  const handleTodos = ()=>{
    let newTodoItem ={
      title: newTitle,
      description:newDescription
    }

    let updatedTodoarr = [...Newtodos]
    updatedTodoarr.push(newTodoItem)
    setNewtodos(updatedTodoarr)
    localStorage.setItem('todolist',JSON.stringify(updatedTodoarr))
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    if(savedTodo){
      setNewtodos(savedTodo)
    }
  },[])

// Function for completion of task with timestamp
const handleComplete=(index)=>{
   let now = new Date()
   let dd = now.getDate()
   let mm = now.getMonth() 
   let yyyy = now.getFullYear()
   let h = now.getHours();
   let min = now.getMinutes()
   let sec = now.getSeconds()

   let CompleteOn = dd + "-" + mm +"-" + yyyy + " at " + h + ":" + min + ":" + sec 
  //  console.log(CompleteOn)
  let filtereditem = {
    ...Newtodos[index],
    completedOn : CompleteOn
  }

  let updatedItem = [...completedTodos]
  updatedItem.push(filtereditem)
  setcompletedTodos(updatedItem)
}

// function to perform edition
const handleEdit=(ind,item)=>{
    console.log(ind)
   setcurrentEdit(ind)
   setcurrentEditedItem(item)
}

const handleUpdatedTitle=(value)=>{
    setcurrentEditedItem((prev)=>{
      return{...prev,title:value}
    })
}
const handleUpdatedDescription=(value)=>{
  setcurrentEditedItem((prev)=>{
    return{...prev,description:value}
  })
}

// final function for complete updation of task
const handleUpdateTodo=()=>{
   let AllTodos = [...Newtodos]
   AllTodos[currentEdit] = currentEditedItem
   setNewtodos(AllTodos)
   console.log(AllTodos)
   setcurrentEdit("")

}

// Function to show item is found in the list
const searched_item=(item)=>{
  return (
    <>
          {Newtodos.map((item)=>{
          if(item.title ==searchQuery){
                       // console.log(`${searchQuery} is the required search for an user` );
                              alert(`${searchQuery} is found in the Todo List`)

                            }
                            else{
                              alert(`Item not found`)
                            }
                          
                        })}
    </>
  )
}



   return (
    <>
     <div className='to-do'>
       <h1>Todo List App</h1>
       <div className='todo-wrapper'>
           <div className='todo-input'>
              <div className='todo-input-item'>
                 <label > Title</label>
                 <input type="text" value={newTitle} onChange={(e)=>setnewTitle(e.target.value)} placeholder="Enter the task to be done"/>
              </div>

              <div className='todo-input-item'>
                 <label > Description</label>
                 <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="Enter the task description"/>
              </div>

              <div className='todo-input-item'>
                <button type="button" onClick={handleTodos} className='primarybtn'>Add</button>
              </div>

              <div className='todo-input-item'>
                        <label>Search</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by title"
                        />
                       
                        <button type="Button" onClick={searched_item}  className='primarybtn' >Search</button>
                    </div>

           </div>

           <div className='btn-area'>
             <button className={` secondarybtn ${isCompleteScreen===false && 'active'}`} onClick={()=>setisCompleteScreen(false)}>Task_List</button>
             <button className={`secondarybtn ${isCompleteScreen===true && 'active'}`} onClick={()=>setisCompleteScreen(true)}>Completed </button>
           </div>

           <div className='todo-list' >
                {isCompleteScreen===false &&  Newtodos.map((item,index)=>{
                if(currentEdit===index){
                 return (
                    <div className='Edit-wrapper' key={index}>
                    <input placeholder='Updated_Title'
                    onChange={(e)=>handleUpdatedTitle(e.target.value)}
                    value={currentEditedItem.title}
                    />
                    <textarea placeholder='Updated_Description'
                    onChange={(e)=>handleUpdatedDescription(e.target.value)}
                    value={currentEditedItem.description}
                    cols={6}/>

         <button type="button" onClick={handleUpdateTodo} className='primarybtn'>Update</button>


                  </div>
                 )
                }

        else{
          return(
            <>
      <div className='todo-list-item' key={index}>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
  
         <div className='icons'>
          
          <div className='check-icon' onClick={()=>handleEdit(index,item)}
            title="Edit?">
           <FaEdit/>
          </div>

          <div className='check-icon' onClick={()=>handleComplete(index)}>
              <FaCheck/>
          </div>
         </div>
       
           
     

        </div>
            </>
          )
        }
                 


                })}


       {isCompleteScreen===true &&  completedTodos.map((item,index)=>{
                  return(
                    <>
              <div className='todo-list-item'>
                 <h3>{item.title}</h3>
                 <p>{item.description}</p>
                 <p><small>Complete On : {item.completedOn}</small> </p>
          
                 <div className='icons'>
                  
                  <div className='Editicon'>
                   <FaEdit/>
                  </div>

                  <div className='check-icon' onClick={()=>handleComplete(index)}>
                      <FaCheck/>
                  </div>
                 </div>
               
                   
             

                </div>
                    </>
                  )


                })}

           
           </div>
       </div>
    </div>
    </>
   )
}
export default Todolist