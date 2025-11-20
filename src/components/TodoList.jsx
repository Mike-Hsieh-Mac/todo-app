function TodoList({todos, onDelete, onToggle}) {
    return(
        <ul style={{listStyle: "none", padding: 0}}>
            {todos.map((todo) => (
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
                        color: todo.completed ? "gray" : "black",
                        }}
                    >
                        {todo.text}
                    </span>
                    </div>
                    <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "10px" }}>
                    刪除
                </button>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;