import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos? JSON.parse(savedTodos):[];
  });
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if(text.trim() === '') return;
    setTodos([...todos, {id: Date.now(), text, completed: false}]);
  }
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id?{...todo, completed: !todo.completed}:todo
      )
    );
  }
  return (
    <div style={{padding:"20px", maxWidth:"1600px", margin:"auto", 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "100vh"
      }}>
        <h1>我的待辦清單</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleComplete} />
    </div>
  )
}

export default App
