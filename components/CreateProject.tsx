"use client";

import { useState } from "react";
import Button from "./UI/Button";
import styles from "./CreateProject.module.scss";
import Card from "./UI/Card";
import Input from "./UI/Input";
import { createProject } from "@/lib/api";

export default function CreateProject() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createProject(name, description);
    setModalOpen(false);
  };
  return (
    <div>
      <Button className="secondary small" onClick={() => setModalOpen(true)}>
        + Add a Project
      </Button>
      {/* {modalOpen && ( */}
      <div className={`${styles.containerDiv} ${modalOpen && styles.open}`}>
        <Card
          className={`${styles.modalDiv} ${modalOpen && styles.open} modal`}
        >
          <span className={styles.span}>
            <Button
              className="text small"
              onClick={() => setModalOpen(false)}
            >
              x
            </Button>
          </span>
          <h1>New Project</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <Input
              placeholder="project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className={styles.description}
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button className="primary medium" type="submit">
              Create
            </Button>
          </form>
        </Card>
      </div>
      {/* )} */}
    </div>
  );
}
