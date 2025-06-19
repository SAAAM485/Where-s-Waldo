// src/components/Timer.tsx
import React, { useState, useEffect } from "react";
import type { TimerProps } from "../../types/components";
import styles from "./Timer.module.css";

const Timer: React.FC<TimerProps> = ({ gameFinished, onFinish }) => {
    const [seconds, setSeconds] = useState<number>(0);

    const formatTime = (sec: number) => {
        const mins = Math.floor(sec / 60);
        const secs = sec % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    useEffect(() => {
        let intervalId: number;
        if (!gameFinished) {
            intervalId = window.setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [gameFinished]);

    // 當遊戲結束時，回傳最終計時值
    useEffect(() => {
        if (gameFinished) {
            onFinish(seconds);
        }
    }, [gameFinished, seconds, onFinish]);

    return (
        <div className={styles.timer}>
            <h2>Timer: {formatTime(seconds)}</h2>
        </div>
    );
};

export default Timer;
