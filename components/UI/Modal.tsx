import React from "react";
import Card from "./Card";
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
      <Card className={`${modalOpen && 'open'} modal ${className}`}>
        <span className={styles.span}>
          <button className="text small" onClick={closeModal}>
            x
          </button>
        </span>
        {children}
      </Card>
    </div>
  );
}
