// src/components/GameHeader.tsx
import React from "react";
import type { GameHeaderProps } from "../../types/components";
import styles from "./GameHeader.module.css";

const API_BASE_URL: string = "http://localhost:3000";

const GameHeader: React.FC<GameHeaderProps> = ({ status, characters }) => {
    return (
        <header className={styles.head}>
            <h1>
                Find These Characters -{" "}
                {characters.map((character) => (
                    <img
                        src={API_BASE_URL + character.avatarUrl}
                        alt={character.name}
                    />
                ))}
            </h1>
            {status && <h2>{status}</h2>}
        </header>
    );
};

export default GameHeader;
