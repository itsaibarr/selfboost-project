// DailyTasks.tsx
import React, { useState, useEffect } from "react";
import TodayProgressBar from "./today-progress-bar"; // импортируем прогресс-бар

const allTasks = [
    "Прочитать 10 страниц книги",
    "Посмотреть урок по React",
    "Сделать 20 отжиманий",
    "Написать 100 слов на английском",
    "Послушать подкаст 15 мин",
    "Сделать мини-проект на JS",
];

type Task = {
    id: number;
    text: string;
    completed: boolean;
};

export default function DailyTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // вычисляем прогресс
    const completedCount = tasks.filter((t) => t.completed).length;
    const totalCount = tasks.length;

    useEffect(() => {
        const today = new Date().toDateString(); // уникальная метка для текущего дня
        const saved = localStorage.getItem("dailyTasks");

        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.date === today) {
                setTasks(parsed.tasks);
                return;
            }
        }

        // Генерация новых задач (4 случайные)
        const newTasks = allTasks
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
            .map((t, i) => ({ id: i, text: t, completed: false }));

        setTasks(newTasks);
        localStorage.setItem(
            "dailyTasks",
            JSON.stringify({ date: today, tasks: newTasks })
        );
    }, []);

    const toggleTask = (id: number) => {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
        );
        setTasks(updated);
        localStorage.setItem(
            "dailyTasks",
            JSON.stringify({ date: new Date().toDateString(), tasks: updated })
        );
    };

    return (
        <div>
            <div className="w-[628px] py-8 px-[30px] bg-[#0A0A0A] rounded-[10px] mt-5">
                <h2 className="mb-2 text-white">Tasks</h2>
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className="cursor-pointer flex items-center gap-5 py-4 border-b border-[#393939] last:border-0 w-[513px]"
                    >
                        <img
                            src={task.completed ? "/completed.svg" : "/!completed.svg"}
                            alt="status"
                            className="w-5 h-5"
                        />
                        <span
                            className={
                                task.completed
                                    ? "text-gray-500 line-through"
                                    : "text-white"
                            }
                        >
                            {task.text}
                        </span>
                    </div>
                ))}
            </div>

            {/* Прогресс-бар */}
            <TodayProgressBar completed={completedCount} total={totalCount} />
        </div>
    );
}
