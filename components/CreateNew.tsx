"use client";

import { useCallback, useState } from "react";
import Button from "./UI/Button";
import { createProject, createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./UI/Modal.module.scss";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

const projectContent = {
  name: "New Project",
  buttonText: "Project",
  placeholder: "Project Name",
};
const taskContent = {
  name: "New Task",
  buttonText: "task",
  placeholder: "Task Name",
};

const initialState = { name: "", description: "", due: "" };
export default function CreateNew({
  type,
  id,
}: {
  type: "project" | "task";
  id?: string;
}) {
  const [formState, setFormState] = useState({ ...initialState });
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (type === "project") {
          await createProject(formState.name, formState.description);
        } else {
          await createTask(id, formState);
        }
        setModalOpen(false);
        router.refresh();
      } catch (err) {
        setError(`Could not ${type}`);
      } finally {
        setFormState({ ...initialState });
      }
    },
    [formState.name, formState.description, formState.due]
  );
  const content = type === "project" ? projectContent : taskContent;
  return (
    <div>
      <Button className="secondary small" onClick={() => setModalOpen(true)}>
        + Add a {content.buttonText}
      </Button>
      <Modal modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <h1>{content.name}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            placeholder={content.placeholder}
            value={initialState.name}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <Input
            className={styles.description}
            placeholder="description"
            value={initialState.description}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          {content.name === "New Task" && (
            <Input
              className={styles.date}
              type="date"
              value={initialState.due}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  due: e.target.value,
                }))
              }
            />
          )}
          <Button className="primary medium" type="submit">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
}
