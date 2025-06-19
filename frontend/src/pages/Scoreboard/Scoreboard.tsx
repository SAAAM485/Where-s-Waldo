import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getImageById, getRecordsByImageId } from "../../services/api";
import type { Image, Record } from "../../types/models";
import styles from "./Scoreboard.module.css";

function scoreToMinSec(score: number): string {
    const minutes = Math.floor(score / 60);
    const seconds = score % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

const API_BASE_URL = "https://where-s-waldo.onrender.com";

const Scoreboard: React.FC = () => {
    const { imageId } = useParams<{ imageId: string }>();
    const parsedImageId = Number(imageId);
    const navigate = useNavigate();
    const location = useLocation();

    const playerName =
        (location.state &&
            (location.state as { playerName?: string }).playerName) ||
        "";

    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [imageData, setImageData] = useState<Image | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            if (isNaN(parsedImageId)) {
                setErrorMessage("Invalid image ID.");
                setLoading(false);
                return;
            }
            try {
                const response = await getRecordsByImageId(parsedImageId);
                if (response.success && response.data) {
                    setRecords(response.data.sort((a, b) => a.score - b.score));
                } else {
                    setErrorMessage(
                        response.error?.message || "Failed to fetch records."
                    );
                }
            } catch (error) {
                console.error("Error fetching records:", error);
                setErrorMessage("Network error. Please try again.");
            }
            setLoading(false);
        };
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

        fetchRecords();
    }, [parsedImageId]);

    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h1>Scoreboard</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : errorMessage ? (
                    <p>Error: {errorMessage}</p>
                ) : records.length > 0 ? (
                    <ul>
                        {records.map((record, index) => (
                            <li
                                key={record.id}
                                className={
                                    record.name.toLowerCase().trim() ===
                                    playerName.toLowerCase().trim()
                                        ? styles.highlight
                                        : styles.score_ranks
                                }
                            >
                                <div className={styles.rank}>{index + 1}</div>
                                <div className={styles.name}>{record.name}</div>
                                <div className={styles.score}>
                                    {scoreToMinSec(record.score)}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No records available.</p>
                )}
                <button onClick={() => navigate("/")} className={styles.home}>
                    Return to Home
                </button>
            </div>
            {imageData && (
                <div
                    className={styles.background}
                    style={{
                        backgroundImage: `url(${API_BASE_URL + imageData.url})`,
                    }}
                ></div>
            )}
        </div>
    );
};

export default Scoreboard;
