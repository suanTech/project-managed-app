'use client'

import { delay, formatDate } from "@/lib/helper";
import { Fragment, useCallback, useState } from "react";
import styles from "./TaskList.module.scss";
import Input from "./UI/Input";
import { updateTask } from "@/lib/api";
import { TaskProps } from "./TaskList";
import { useRouter } from "next/navigation";
import Spinner from "./UI/Spinner";

interface ItemProps {
  task: TaskProps;
  onModalOpen: () => void;
  onToggle: () => void;
  target: string;
}

export default function TaskItem({ task, onModalOpen, onToggle, target }: ItemProps) {
  const [values, setValues] = useState({
    name: task.name,
    description: task.description,
    due: task.due,
    deleted: task.deleted,
    status: task.status
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        await updateTask(values, task.id);
        router.refresh();
        await delay(3000);
        setIsEditing(false);
        setIsLoading(false)
      } catch(err) {
        console.log(err)
      }

    }, [values.status, values.name, values.description, values.due, values.deleted])
    return (
    <Fragment>
      {isEditing ? isLoading ? <tr><td><Spinner/></td></tr> : (
        <tr>
          <td>
            <Input
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
            <Input
              className="formInput"
              type="date"
              placeholder={task.due}
              value={values.due}
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
      ) : !isEditing && !isLoading && (
        <tr className={styles.item} onClick={onToggle}>
          <td className={styles.taskName}>{task.name}</td>
          <td>{formatDate(task.due!, "long")}</td>
          <td>{task.status}</td>
        </tr>
      )}
      <tr
        className={`${styles.taskDescription} ${
          target === task.id ? styles.show : ""
        }`}
      >
        <td colSpan={3}>
          <div>
            <p>{task.description}</p>
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
                onClick={isEditing 
                  ? () => setIsEditing(!isEditing) 
                  : () => {
                    setValues(prev => ({...prev, deleted: true}))
                    onModalOpen()
                  }
                }
              >
                {isEditing ? "Cancel" : "Delete task"}
              </button>
            </div>
          </div>
        </td>
      </tr>
    </Fragment>
  );
}
