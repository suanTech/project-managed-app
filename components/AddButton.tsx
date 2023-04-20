"use client";

import { useCallback, useContext, useState } from "react";
import { createProject, createTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "./UI/Modal.module.scss";
import Modal from "./UI/Modal";
import { delay } from "@/lib/helper";
import { LoadingContext } from "@/app/(dashboard)/layout";

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
export default function AddButton({
  type,
  id,
}: {
  type: "project" | "task";
  id?: string;
}) {
  const [formState, setFormState] = useState({ ...initialState });
  const [modalOpen, setModalOpen] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setModalOpen(false);
      setIsLoading(true);
      try {
        if (type === "project") {
          await createProject(formState.name, formState.description);
        } else {
          await createTask(id!, formState);
        }
        router.refresh();
        await delay(2000);
        setIsLoading(false);
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
    <>
      <button className="secondary small" onClick={() => setModalOpen(true)}>
        + Add a {content.buttonText}
      </button>
      <Modal modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1>{content.name}</h1>
          <input
            placeholder={content.placeholder}
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />
          <input
            className={styles.description}
            placeholder="description"
            value={formState.description}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          {content.name === "New Task" && (
            <div className={styles.dueDate}>
              <p>Due Date</p>
              <input
                required
                type="date"
                value={formState.due}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    due: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <button className="primary medium" type="submit">
            Create
          </button>
        </form>
      </Modal>
    </>
  );
}
