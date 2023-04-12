import React from "react";
import Button from "./Button";
import Card from "./Card";
import styles from './Modal.module.scss';

interface ModalProps {
  modalOpen: boolean,
  closeModal: () => void,
  children: React.ReactNode,
}
export default function Modal({modalOpen, closeModal, children}: ModalProps) {
  return (
    <div className={`${styles.containerDiv} ${modalOpen && styles.open}`}>
      <Card className={`${styles.modalDiv} ${modalOpen && styles.open}`}>
        <span className={styles.span}>
          <Button className="text small" onClick={closeModal}>
            x
          </Button>
        </span>
        {children}
      </Card>
    </div>
  );
}
