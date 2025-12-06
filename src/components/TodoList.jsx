import TodoItem from "./TodoItem";

function TodoList({todos, onDelete, onToggle, onToggleUrgent, onEdit}) {
    if(todos.length === 0){
        return <p style={{color:"#6b7280"}}>目前沒有項目，新增一筆吧！</p>;
    }
    return(
        <ul className="list">
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    onToggleUrgent={onToggleUrgent}
                    onEdit={onEdit}
                />
            ))
            /* {todos.map((todo) => (
                <li key={todo.id} 
                style={{
                    padding:"5px 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <div>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggle(todo.id)}
                            style={{ marginRight: "10px" }}
                        />
                        <span
                            style={{
                            textDecoration: todo.completed ? "line-through" : "none",
                            color: todo.completed ? "black" : "blue"
                            }}
                        >
                            <font
                                onClick={() => onToggleUrgent(todo.id)}
                                style={{
                                    color: todo.urgent ? "red" : "black"
                                }}
                            >
                                {todo.text}
                            </font>
                        </span>
                    </div>
                    <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "10px" }}>
                        刪除
                    </button>
                </li>
            ))} */}
        </ul>
    );
}

export default TodoList;