import React, { useEffect, useState } from "react";

export default function Streak() {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const today = new Date().toDateString();
        const saved = localStorage.getItem("streakData");

        if (saved) {
            const parsed = JSON.parse(saved);
            const lastDate = new Date(parsed.lastDate).toDateString();

            if (lastDate === today) {
                // Уже сегодня считали — просто показываем
                setStreak(parsed.streak);
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastDate === yesterday.toDateString()) {
                    // Вчера был прогресс → увеличиваем стрик
                    setStreak(parsed.streak + 1);
                } else {
                    // Пропуск → сброс
                    setStreak(0);
                }
            }
        } else {
            setStreak(0);
        }
    }, []);

    // функция для обновления стрика при полном завершении задач
    const updateStreak = () => {
        const today = new Date().toDateString();
        const saved = localStorage.getItem("streakData");
        let newStreak = 1;

        useEffect(() => {
            const handler = () => updateStreak();
            window.addEventListener("updateStreak", handler);
            return () => window.removeEventListener("updateStreak", handler);
        }, []);

        if (saved) {
            const parsed = JSON.parse(saved);
            const lastDate = new Date(parsed.lastDate).toDateString();

            if (lastDate === today) {
                newStreak = parsed.streak; // уже сегодня считали
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastDate === yesterday.toDateString()) {
                    newStreak = parsed.streak + 1;
                }
            }
        }

        setStreak(newStreak);
        localStorage.setItem("streakData", JSON.stringify({ lastDate: today, streak: newStreak }));
    };

    return (
        <div className="w-[282px] mt-5 p-[40px] bg-[#0A0A0A] rounded-[10px] flex items-center justify-between">
            <span className=""><img src="public/streak.svg" alt=""/></span>
            <div className="flex flex-col items-center gap-[2px]">
                <span className="text-[28px] font-semibold">Streak</span>
                <span className="font-bold text-[45px]">{streak}🔥</span>
                <span className="text-[14px] text-[#A3A3A3] font-semibold">days in a row</span>
            </div>
        </div>
    );
}
