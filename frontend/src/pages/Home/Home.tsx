import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllImages } from "../../services/api";
import type { Image } from "../../types/models";
import styles from "./Home.module.css";

const API_BASE_URL = "https://where-s-waldo.onrender.com";

const Home: React.FC = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await getAllImages();
                if (res.success && res.data) {
                    setImages(res.data);
                } else {
                    setError(res.error?.message || "Failed to fetch images.");
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return <p>Loading images...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className={styles.main}>
            <h1>Select One to Play</h1>
            <p>
                This is more like a photo tagging app, because I couldn't find
                where's waldo-like pictures...
            </p>
            <p>Please select in the face of the characters.</p>
            <div className={styles.container}>
                {images.map((image) => (
                    <div key={image.id} className={styles.select_container}>
                        <Link to={`/game/${image.id}`}>
                            <div className={styles.img_container}>
                                <img
                                    src={API_BASE_URL + image.url}
                                    alt={image.name}
                                />
                            </div>
                        </Link>
                        <Link
                            to={`/scoreboard/${image.id}`}
                            className={styles.scoreboard}
                        >
                            <p>Top 5 Scoreboard</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.disclaimer}>
                <p>
                    Disclaimer - The images displayed on this site are used
                    solely for informational and fan-related purposes. The image
                    featuring Arcane content is the copyright of Riot Games, and
                    the image related to World of Warcraft is the property of
                    Blizzard Entertainment. All trademarks and copyrights belong
                    to their respective owners.
                </p>
            </div>
        </div>
    );
};

export default Home;
