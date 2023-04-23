"use client";

import { delay, formatDate } from "@/lib/helper";
import { Fragment, useContext, useState } from "react";
import styles from "./TaskTableItem.module.scss";
import { deleteTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import Modal from "./UI/Modal";
import { LoadingContext } from "@/app/Context";
import { TaskType } from "@/lib/types/Task";



export default function TaskTableItem({ task }: {task: TaskType}) {
  const [values, setValues] = useState({
    name: task.name,
    description: task.description,
    due: task.due,
    status: task.status,
  });
  const [isEditing, setIsEditing] = useState(false);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState("");
  const router = useRouter();
  const toggleDescription = (itemId: string) => {
    if (itemId === target) setTarget("");
    else setTarget(itemId);
  };
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
  const handleDelete = async () => {
    setIsLoading(true);
    setModalOpen(false);
    try {
      await deleteTask(task.id);
      router.refresh();
      await delay(2000);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      {isEditing ? (
        <tr className={styles.inputWrapper}>
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
                  setValues((prev) => ({ ...prev, status: e.target.value as typeof prev.status }))
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
        !isEditing && (
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
                <p>
                  <span className="bold">Description: </span>
                  {task.description ? task.description : "No Description"}
                </p>
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
                    : () => setModalOpen(true)}
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
            <h3 className="warning" style={{ textAlign: "center" }}>
              Are you sure you want to delete this task?
            </h3>
            <button className="primary-confirm medium" onClick={handleDelete}>
              Delete
            </button>
          </Modal>
        </td>
      </tr>
    </Fragment>
  );
}
