import { useState } from "react";

function TodoInput({onAdd}){
    const [inputValue, setInputValue] = useState("");
    const handleAdd = () => {
        onAdd(inputValue);
        setInputValue("");
    };

    return (
        <div style={{marginBottom: "10px"}}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="請輸入代辦事項"
                style={{padding: "5px", width: "68%"}}

            />
            <button onClick={handleAdd} style={{marginLeft: "10px"}}>
                新增
            </button>
        </div>
    );
}

export default TodoInput;