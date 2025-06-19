import React, { useState, useRef, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import type { DropdownProps } from "../../types/components";
import styles from "./Dropdown.module.css";

const API_BASE_URL = "https://where-s-waldo.onrender.com";

const Dropdown: React.FC<DropdownProps> = ({
    position,
    characters,
    onSelect,
    onClose,
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dynamicStyle, setDynamicStyle] = useState<React.CSSProperties>({
        top: position.y,
        left: position.x,
    });

    useLayoutEffect(() => {
        if (dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;

            let newTop = position.y;
            let newLeft = position.x;

            if (rect.bottom > viewportHeight) {
                newTop = position.y - rect.height;
            }

            if (rect.right > viewportWidth) {
                newLeft = position.x - rect.width;
            }

            setDynamicStyle({ top: newTop, left: newLeft });
        }
    }, [position]);

    return ReactDOM.createPortal(
        <div
            ref={dropdownRef}
            className={styles.dropdown}
            style={{
                top: dynamicStyle.top,
                left: dynamicStyle.left,
            }}
        >
            <ul className={styles.list}>
                {characters.map((ch) => (
                    <li
                        key={ch.id}
                        className={styles.item}
                        onClick={() => onSelect(ch)}
                    >
                        <img
                            src={API_BASE_URL + ch.avatarUrl}
                            alt={ch.name}
                            className={styles.avatar}
                        />
                        {ch.name}
                    </li>
                ))}
            </ul>
            <button className={styles.closeButton} onClick={onClose}>
                Close
            </button>
        </div>,
        document.body
    );
};

export default Dropdown;
