// src/pages/Game.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getImageById,
    getCharactersByImageId,
    verifyCharacter,
    postRecord,
} from "../../services/api";
import type { Image, Character } from "../../types/models";
import type { RelativePosition } from "../../types/components";
import Dropdown from "../../components/Dropdown/Dropdown";
import GameHeader from "../../components/GameHeader/GameHeader";
import Timer from "../../components/Timer/Timer";
import Modal from "../../components/Modal/Modal";
import styles from "./Game.module.css";

const API_BASE_URL: string = "http://localhost:3000";

const Game: React.FC = () => {
    const { imageId } = useParams<{ imageId: string }>();
    const parsedImageId = Number(imageId);
    const navigate = useNavigate();

    const [charactersLoaded, setCharactersLoaded] = useState<boolean>(false);
    const [imageData, setImageData] = useState<Image | null>(null);
    const [selectedCharacters, setSelectedCharacters] = useState<Character[]>(
        []
    );
    const [headerStatus, setHeaderStatus] = useState<string>("");
    const [relativePosition, setRelativePosition] =
        useState<RelativePosition | null>(null);
    const [absolutePosition, setAbsolutePosition] =
        useState<RelativePosition | null>(null);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [finalTime, setFinalTime] = useState<number>(0);
    const [playerName, setPlayerName] = useState<string>("");
    const [scoreSubmitted, setScoreSubmitted] = useState<boolean>(false);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        getImageById(parsedImageId)
            .then((res) => {
                if (res.success && res.data) {
                    setImageData(res.data);
                } else {
                    console.error("Error fetching image:", res.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching image:", error);
            });

        getCharactersByImageId(parsedImageId)
            .then((res) => {
                if (res.success && res.data) {
                    const allCharacters = res.data;
                    const chosen =
                        allCharacters.length <= 3
                            ? allCharacters
                            : [...allCharacters]
                                  .sort(() => Math.random() - 0.5)
                                  .slice(0, 3);
                    setSelectedCharacters(chosen);
                    setCharactersLoaded(true);
                } else {
                    console.error("Error fetching characters:", res.error);
                }
            })
            .catch((error) => {
                console.error("Error fetching characters:", error);
            });
    }, [parsedImageId]);

    const handleImageClick = (
        event: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        if (event.button !== 0) return;
        const imgRect = event.currentTarget.getBoundingClientRect();
        const offsetX = event.clientX - imgRect.left;
        const offsetY = event.clientY - imgRect.top;
        const relativeX = offsetX / imgRect.width;
        const relativeY = offsetY / imgRect.height;

        setRelativePosition({ x: relativeX, y: relativeY });
        setAbsolutePosition({ x: event.clientX, y: event.clientY });
        setShowDropdown(true);
    };

    const handleCharacterSelect = (character: Character) => {
        const pos = relativePosition || { x: 0, y: 0 };
        verifyCharacter(parsedImageId, character.id, pos.x, pos.y)
            .then((res) => {
                if (res.success && res.data) {
                    if (res.data.inside === true) {
                        setHeaderStatus(`That's ${character.name} indeed.`);
                        setSelectedCharacters((prev) =>
                            prev.filter((ch) => ch.id !== character.id)
                        );
                    } else {
                        setHeaderStatus(`That's not ${character.name}...`);
                    }
                } else {
                    setHeaderStatus("Verification failed.");
                    console.error("Verify error:", res.error);
                }
            })
            .catch((error) => {
                console.error("Error verifying character:", error);
                setHeaderStatus("Network error during verification.");
            });
        setShowDropdown(false);
    };

    const isGameFinished = selectedCharacters.length === 0;
    useEffect(() => {
        if (isGameFinished && charactersLoaded) setModalOpen(true);
    }, [isGameFinished, charactersLoaded]);

    const handleSubmitScore = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await postRecord(
                parsedImageId,
                playerName,
                finalTime
            );
            if (response.success) {
                setScoreSubmitted(true);
            } else {
                console.error("Failed to submit score:", response.error);
            }
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <GameHeader
                    status={headerStatus}
                    characters={selectedCharacters}
                />
                <Timer
                    gameFinished={isGameFinished}
                    onFinish={(time: number) => setFinalTime(time)}
                />
            </div>

            <div className={styles.img_container}>
                {imageData ? (
                    <img
                        src={API_BASE_URL + imageData.url}
                        alt={imageData.name}
                        onClick={handleImageClick}
                    />
                ) : (
                    <p>Loading image...</p>
                )}
                {showDropdown && absolutePosition && (
                    <Dropdown
                        key={`${absolutePosition.x}-${absolutePosition.y}`}
                        position={absolutePosition}
                        characters={selectedCharacters}
                        onSelect={handleCharacterSelect}
                        onClose={() => setShowDropdown(false)}
                    />
                )}
            </div>
            <button onClick={() => navigate("/")} className={styles.home}>
                Return to Home
            </button>

            <Modal isOpen={modalOpen}>
                {!scoreSubmitted ? (
                    <form onSubmit={handleSubmitScore} className={styles.form}>
                        <div className={styles.form_name}>
                            <label>
                                Enter Your Name
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) =>
                                        setPlayerName(e.target.value)
                                    }
                                    required
                                />
                            </label>
                        </div>
                        <button type="submit" className={styles.form_btn}>
                            Submit Score
                        </button>
                    </form>
                ) : (
                    <div className={styles.submitted}>
                        <p className={styles.submitted_p}>
                            Score submitted! Final Time -{" "}
                            {Math.floor(finalTime / 60)
                                .toString()
                                .padStart(2, "0")}
                            :{(finalTime % 60).toString().padStart(2, "0")}
                        </p>
                        <button
                            onClick={() =>
                                navigate(`/scoreboard/${parsedImageId}`, {
                                    state: { playerName: playerName },
                                })
                            }
                            className={styles.scoreboard}
                        >
                            View Scoreboard
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Game;
