import { useState, useEffect, useMemo } from 'react'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import "./App.css"

const FILTERS = {
  ALL:"all",
  ACTIVE:"active",
  COMPLETED:"completed"
};

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos? JSON.parse(savedTodos):[];
  });
  const [filter, setFilter] = useState(() => {
    const savedFilter = localStorage.getItem("filter");
    return savedFilter || FILTERS.ALL;
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem("filter", filter)
  }, [filter]);
  const addTodo = (text) => {
    const t = text.trim();
    if(t === '') return;
    setTodos((prev) => 
      [...prev, {id: crypto.randomUUID?.() || Date.now(), text: t, urgent: false, completed: false}]
    )
    //setTodos([...todos, {id: Date.now(), text, urgent: false, completed: false}]);
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }
  const toggleComplete = (id) => {
    setTodos((prev) => 
      prev.map((todo) =>
        todo.id === id?{...todo, completed: !todo.completed}:todo
      )
    );
  }
  const toggleUrgent = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id?{...todo, urgent: !todo.urgent}:todo
      )
    );
  }
  const editTodo = (id, nextText) => {
    const t = nextText.trim();
    if(!t) return;
    setTodos((prev) => prev.map((todo) => todo.id === id? {...todo, text: t}:todo));
  }
  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }
  const remainingCount = useMemo(
      () => todos.filter((t) => !t.completed).length, [todos]
  );
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case FILTERS.ACTIVE:
        return todos.filter((t) => !t.completed);
      case FILTERS.COMPLETED:
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  return (
    <div className="container" style={{padding:"20px", maxWidth:"100%", margin:"auto", 
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "100vh"
      }}>
        <h1 className="title">我的待辦清單</h1>
        <TodoInput onAdd={addTodo} />
        <div className='toolbar'>
          <div className='filters'>
            <button
              className={filter === FILTERS.ALL?"active":""}
              onClick={() => setFilter(FILTERS.ALL)}
            >
              全部
            </button>
            <button
              className={filter === FILTERS.ACTIVE?"active":""}
              onClick={() => setFilter(FILTERS.ACTIVE)}
            >
              未完成
            </button>
            <button
              className={filter === FILTERS.COMPLETED?"active":""}
              onClick={() => setFilter(FILTERS.COMPLETED)}
            >
              已完成
            </button>
          </div>
          <div className='status'>
            未完成:<strong>{remainingCount}</strong>
          </div>
          <div className='bulk-actions'>
            <button onClick={clearCompleted} disabled={todos.every((t) => !t.completed)}>
              清除已完成
            </button>
          </div>
        </div>
        <TodoList 
          todos={filteredTodos} 
          onDelete={deleteTodo} 
          onToggle={toggleComplete} 
          onToggleUrgent={toggleUrgent}
          onEdit={editTodo}
        />
    </div>
  )
}

export default App
