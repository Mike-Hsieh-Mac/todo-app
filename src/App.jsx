import { useState } from 'react'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
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
    <div style={{padding:"20px", maxWidth:"400px", margin:"auto"}}>
        <h1>我的待辦清單</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleComplete} />
    </div>
  )
}

export default App
