import React from "react";
import styles from './Modal.module.scss';

interface ModalProps {
  modalOpen: boolean,
  closeModal: () => void,
  className?: string
  children: React.ReactNode,
}
export default function Modal({modalOpen, closeModal, className, children}: ModalProps) {
  return (
    <div className={`${styles.containerDiv} ${modalOpen && styles.open}`}>
      <div className={`${modalOpen && styles.open} ${styles.modalDiv} ${className}`}>
        <span className={styles.span}>
          <button className="text small" onClick={closeModal}>
            x
          </button>
        </span>
        {children}
      </div>
    </div>
  );
}
