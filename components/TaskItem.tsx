"use client";

import { delay, formatDate } from "@/lib/helper";
import { Fragment, useState } from "react";
import styles from "./TaskItem.module.scss";
import { updateTask } from "@/lib/api";
import { TaskProps } from "./TaskList";
import { useRouter } from "next/navigation";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";

interface ItemProps {
  task: TaskProps;
}

export default function TaskItem({ task }: ItemProps) {
  const [values, setValues] = useState({
    name: task.name,
    description: task.description,
    due: task.due,
    deleted: task.deleted,
    status: task.status,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState("");
  const toggleDescription = (itemId: string) => {
    if (itemId === target) setTarget("");
    else setTarget(itemId);
  };
  const router = useRouter();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsEditing(!isEditing);
    try {
      await updateTask(values, task.id);
      router.refresh();
      await delay(2000);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (values: object, taskId: string) => {
    setIsLoading(true);
    setModalOpen(false);
    try {
      await updateTask(values, taskId);
      router.refresh();
      await delay(2000);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      {isLoading && (
        <tr>
          <td>
            <Spinner />
          </td>
        </tr>
      )}
      {isEditing && !isLoading ? (
        <tr>
          <td>
            <input
              required
              className="formInput"
              type="text"
              placeholder={task.name}
              value={values.name}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </td>
          <td className={styles.date}>
            <input
              className="formInput"
              type="text"
              value={values.due}
              onFocus={(e) => (e.target.type = "date")}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, due: e.target.value }))
              }
            />
          </td>
          <td>
            <div className={styles.dropdown}>
              <select
                value={values.status}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="NOT_STARTED">NOT_STARTED</option>
                <option value="STARTED">STARTED</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
          </td>
        </tr>
      ) : (
        !isEditing &&
        !isLoading && (
          <tr
            className={styles.item}
            onClick={() => toggleDescription(task.id)}
          >
            <td className={styles.taskName}>{task.name}</td>
            <td>{formatDate(task.due!, "long")}</td>
            <td>{task.status}</td>
          </tr>
        )
      )}
      <tr
        className={`${styles.taskDescription} ${
          target === task.id ? styles.show : ""
        }`}
      >
        <td colSpan={3}>
          <div>
            {!isLoading ? (
              isEditing ? (
                <>
                  <label htmlFor="description">
                    <span className="bold">Description</span>
                  </label>
                  <input
                    name="description"
                    className="formInput"
                    type="text"
                    placeholder={task.description}
                    value={values.description}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </>
              ) : (
                <>
                  <span className="bold">Description</span>
                  <p>
                    {task.description ? task.description : "No Description"}
                  </p>
                </>
              )
            ) : (
              ""
            )}

            <div className={styles.buttonWrapper}>
              <button
                type="submit"
                className="primary small"
                name="update"
                onClick={isEditing ? handleSubmit : toggleEditMode}
              >
                {isEditing ? "Save Changes" : "Edit Task"}
              </button>
              <button
                className="secondary small"
                name="delete"
                onClick={
                  isEditing
                    ? () => setIsEditing(!isEditing)
                    : () => {
                        setValues((prev) => ({ ...prev, deleted: true }));
                        setModalOpen(true);
                      }
                }
              >
                {isEditing ? "Cancel" : "Delete task"}
              </button>
            </div>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <Modal
            className="small-card"
            modalOpen={modalOpen}
            closeModal={() => setModalOpen(false)}
          >
            <h3 className="warning">
              Are you sure you want to delete this task?
            </h3>
            <button
              className="confirm medium"
              onClick={() => handleDelete(values, task.id)}
            >
              Delete
            </button>
          </Modal>
        </td>
      </tr>
    </Fragment>
  );
}
