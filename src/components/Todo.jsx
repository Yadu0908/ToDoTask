import { useState, useEffect } from "react"
import { Plus, Trash2, CheckCircle, Circle } from "lucide-react";

function Todo() {

    const [ip, setInput] = useState("")
    const [list, setlist] = useState([])


    useEffect(() => {

        const saveData = localStorage.getItem("all_tasks")
        if (saveData) {

            setlist(JSON.parse(saveData))
        }
    }, [])


    useEffect(() => {
         localStorage.setItem("all_tasks", JSON.stringify(list))
    }, [list])



    function addTask() {


        if (ip.trim() === "") {

            return
        }

        else {

            const todoList = {

                id: Date.now(),
                text: ip,
                completed: false
            }

            setlist([...list, todoList])
            setInput("")

            console.log(todoList);


        }

    }

    function removeTask(id) {


        const updatedTodos = list.filter(ip => ip.id !== id)
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

        <>

            <div className="todo-page-wrapper">

                <div className="todo-container">


                    <h2>To-list</h2>

                    <div className="input-group">
                        <input type="text"
                            value={ip}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Add your to-do"
                            onKeyDown={(e) => e.key === "Enter" && addTask()}

                        />
                        <button onClick={addTask} className="add-btn"><Plus size={20} /></button>
                    </div>



                    <ul className="todo-list">
                        {list.map((todo) => (
                            <li key={todo.id} className={todo.completed ? "todo-item completed" : "todo-item"}>
                                <div className="todo-text" onClick={() => toggleComplete(todo.id)}>
                                    {todo.completed ? <CheckCircle size={18} className="icon-check" /> : <Circle size={18} />}
                                    <span>{todo.text}</span>
                                </div>
                                <button className="delete-btn" onClick={() => removeTask(todo.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {list.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}

                    <div>

                        <button className="Clear-all" onClick={clearAll}>Clear all</button>
                    </div>

                </div>



            </div>


        </>

    )
}

export default Todo