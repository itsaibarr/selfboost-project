import React, { useState, useEffect } from "react";

type Task = {
    text: string;
    completed: boolean;
    category: string;
    priority: "Low" | "Mid" | "High";
};

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState<"Low" | "Mid" | "High">("Low");
    const [showInput, setShowInput] = useState(false);

    // загружаем сохранённые задачи при первом рендере
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    // сохраняем задачи при каждом изменении
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (input.trim() === "") return;
        setTasks([
            ...tasks,
            { text: input, completed: false, category, priority },
        ]);
        setInput("");
        setCategory("");
        setPriority("Low");
        setShowInput(false);
    };

    const toggleTask = (index: number) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    };

    return (
        <div className="w-[628px] py-8 px-[30px] bg-[#0A0A0A] rounded-[10px] mt-5">
            <div className="flex w-[513px] justify-between items-center mb-6">
                <h2>To-Do List</h2>
                <button
                    onClick={() => setShowInput(true)}
                    className="flex items-center gap-2 text-[18px] font-bold"
                >
                    <img src="public/plus.svg" alt="+" />
                    Add new task
                </button>
            </div>

            {/* Список задач */}
            <ul className="flex flex-col gap-4">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className="flex items-center w-[513px] justify-between border-b-[1px] border-b-[#393939] pb-4"
                    >
                        <div className="flex items-center gap-5 font-medium text-[16px]">
                            <button onClick={() => toggleTask(index)}>
                                {task.completed ? (
                                    <img src="public/completed.svg" alt="completed" />
                                ) : (
                                    <img src="public/!completed.svg" alt="not completed" />
                                )}
                            </button>
                            <span
                                style={{
                                    textDecoration: task.completed ? "line-through" : "none",
                                }}
                            >
                {task.text}
              </span>
                        </div>
                        <div className="flex items-center text-[12px]">
                            <span>{task.category}</span>
                            <span className="ml-12 mr-7">{task.priority}</span>
                            <button onClick={() => deleteTask(index)}>
                                <img src="public/trash.svg" alt="delete" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Поле ввода */}
            {showInput && (
                <div className="flex w-[513px] justify-between items-center mt-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter a task..."
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Category"
                    />
                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as "Low" | "Mid" | "High")
                        }
                        className="appearance-none bg-[#0A0A0A] text-white px-3 py-1 rounded"
                    >
                        <option value="Low">Low</option>
                        <option value="Mid">Mid</option>
                        <option value="High">High</option>
                    </select>
                </div>
            )}
        </div>
    );
}
