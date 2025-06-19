// src/components/Modal/Modal.tsx
import React from "react";
import ReactDOM from "react-dom";
import type { ModalProps } from "../../types/components";
import styles from "./Modal.module.css";

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.overlay}>
            <div className={styles.modal}>{children}</div>
        </div>,
        document.getElementById("modal-root") as Element
    );
};

export default Modal;
