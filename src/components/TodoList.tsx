import { useState } from "react"
import TodoTypes from "../todo"
import TodoService from "../TodoService"
import { FaEdit, FaCheck } from "react-icons/fa"
import { GiCancel } from "react-icons/gi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import TodoForm from "./TodoForm"
import "../css/TodoList.css"


const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  //function for handling edit actions
  const handleEditStar = (id:number, text:string) => {

    setEditedTodoId(id);
    setEditedTodoText(text);
  }

  const handleEditCancel = () =>{
    setEditedTodoId(null);
    setEditedTodoText("");
  }
  
  const handleEditSave = (id:number) => {
    if(editedTodoText.trim()  !== '') {
        const updateTodo = TodoService.updateTodo({
            id, 
            text:editedTodoText,
            completed:false
        });
        setTodos((prevTodos) => 
            prevTodos.map((todo) => (todo.id === id ? updateTodo : todo ))
    );
    setEditedTodoId(null)
    setEditedTodoText("")
    
    }
  };

  // function to delete todo
  const handleDeleteTodo = (id:number) => {
     TodoService.deleteTodo(id);
     setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id ))
  }

  // Function to mark a task as complete

  const handleMarkAsCompleted = (id:number) => {
     TodoService.markTodoAsCompleted(id);
     setTodos((prevTodos) => 
       prevTodos.map((todo) => 
        todo.id === id ? { ...todo, completed: true } : todo
    ));
    
  };

  return ( 
    <div className="todoContainer">

        <div>
            <TodoForm setTodos={setTodos}/>
       </div>
       
       <div className="todos">   
      {todos.map((todo) =>(
        <div className="items" key={todo.id}>
             <button className="markBtn" onClick={() => handleMarkAsCompleted(todo.id)}>
                  {todo.completed ? "✔️" : "⬜"}
             </button>
          {editingTodoId == todo.id ? (
            <div className="editText">

                <input type="text" value={editedTodoText} onChange={(e) => setEditedTodoText
                    (e.target.value)}
                    autoFocus={true}/>
                <button onClick={() => handleEditSave(todo.id)}>
                    <FaCheck color="green"/>
                </button>

                <button className="cancelBtn" onClick={() => handleEditCancel()}>
                    <GiCancel/>
                </button>
            </div>
          ) : (
            <>
                <span className="listText">{todo.text}</span>
               
                <button onClick={() => handleEditStar(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </>
)}
          <button onClick={() => handleDeleteTodo(todo.id)}>
            <RiDeleteBin5Fill/>
          </button>

        </div>
        
      ))}
       </div>
    </div>
    
  )
}
export default TodoList;