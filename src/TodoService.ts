import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = {
    
    //Get Todos
    getTodos:  (): TodoTypes[] => {
        const  todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr ? JSON.parse(todoStr) : [];
   },

   //Adding
   addTodos: (text: string): TodoTypes => {
      const todos = TodoService.getTodos();
      const newTodo: TodoTypes = {id: todos.length + 1, text, completed: false};
      const updateTodos = [...todos, newTodo];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify (updateTodos));
      return newTodo; 
   },

   //Updating The TODO 
   updateTodo: (todo: TodoTypes): TodoTypes => {
       const todos = TodoService.getTodos();

       const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
       localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
       return todo;
   },

   //Mark a specific todo as completed
   markTodoAsCompleted: (id: number): void => {
      const todo = TodoService.getTodos();
      const updateTodos = todo.map(todo => 
        todo.id === id ?  { ...todo, completed: true } : todo);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
   },

   //Deleting the todo 
   deleteTodo: (id:number): void => {
      const todos = TodoService.getTodos();
      const updateTodos = todos.filter((todo) => todo.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos))
  },

};

export default TodoService