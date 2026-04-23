import { useState, useEffect } from "react"

import { Plus, Trash2, CheckCircle, Circle, Pencil, X } from "lucide-react";

function Todo() {
    const [ip, setInput] = useState("")
    const [discription, setDiscription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [list, setlist] = useState(() => {
        const saved = localStorage.getItem("all_tasks");
        return saved ? JSON.parse(saved) : [];
    });

    const [edit, setEdit] = useState(null);

    // useEffect(() => {
    //     const saveData = localStorage.getItem("all_tasks")
    //     if (saveData) {
    //         setlist(JSON.parse(saveData))
    //     }
    // }, [])

    useEffect(() => {
        localStorage.setItem("all_tasks", JSON.stringify(list))
    }, [list])

    function addTask() {
        if (ip.trim() === "") return;

        if (edit) {
            // FIX 1: Use === instead of =
            const updatedList = list.map((item) =>
                item.id === edit ? { ...item, text: ip, disc: discription, ded: deadline } : item
            )
            setlist(updatedList)
            setEdit(null)
        } else {
            const todoList = {
                id: Date.now(),
                text: ip,
                disc: discription,
                ded: deadline,
                completed: false,
            }
            setlist([...list, todoList])
        }
        // FIX 2: Move clearing inputs here so it runs for BOTH add and edit
        setInput("")
        setDeadline("")
        setDiscription("")
    }

    function startEdit(todo) {
        setEdit(todo.id);
        setInput(todo.text);
        setDiscription(todo.disc);
        setDeadline(todo.ded);
    }

    function cancelEdit() {
        setEdit(null); // FIX 3: Matches state name 'edit'
        setInput("")
        setDeadline("")
        setDiscription("")
    }

    function removeTask(id) {
        const updatedTodos = list.filter(item => item.id !== id)
        setlist(updatedTodos)
    }

    function toggleComplete(id) {
        const updatedTodos = list.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        setlist(updatedTodos);
    };

    function clearAll() {
        setlist([])
    }

    return (
        <div className="todo-page-wrapper">
            <div className="todo-container">
                <h2>To-list</h2>

                <div className="input-group">
                    <input type="text"
                        value={ip}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add your to-do title"
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                    />

                    <textarea
                        placeholder="Description (Optional)"
                        value={discription}
                        onChange={(e) => setDiscription(e.target.value)}
                    />

                    <div className="input-div">
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        <button onClick={addTask} className="add-btn">
                            {edit ? <CheckCircle size={20} /> : <Plus size={20} />}
                        </button>

                        {edit && (
                            <button onClick={cancelEdit} className= "add-btn">
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <ul className="todo-list">
                    {list.map((todo) => (
                        <li key={todo.id} className={todo.completed ? "todo-item completed" : "todo-item"}>
                            <div className="todo-info-wrapper">
                                <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                                    {todo.completed ? <CheckCircle size={18} className="icon-check" /> : <Circle size={18} />}
                                    <span>{todo.text}</span>
                                </div>
                                {todo.disc && <p className="display-disc">{todo.disc}</p>}
                                {todo.ded && <p className="display-ded">Due: {todo.ded}</p>}
                            </div>

                            {/* FIX 4: Added the Edit button to the UI */}
                            <div className="action-btns">
                                <button className="edit-btn" onClick={() => startEdit(todo)}>
                                    <Pencil size={18} />
                                </button>
                                <button className="delete-btn" onClick={() => removeTask(todo.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {list.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}

                <div>
                    <button className="Clear-all" onClick={clearAll}>Clear all</button>
                </div>
            </div>
        </div>
    )
}

export default Todo