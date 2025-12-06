import { useState } from "react";

function TodoInput({onAdd}){
    const [inputValue, setInputValue] = useState("");
    const handleAdd = () => {
        onAdd(inputValue);
        setInputValue("");
    };
    const onKeyDown = (e) => {
        if(e.key === "Enter") handleAdd();
    }
    return (
        <div className="input-row">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="輸入待辦事項，按 Enter 或點新增"
                onKeyDown={onKeyDown}
                style={{padding: "5px", width: "68%"}}
            />
            <button onClick={handleAdd} disabled={!inputValue.trim()}>
                新增
            </button>
        </div>
    );
}

export default TodoInput;