"use client";

import { Task } from "@prisma/client";
import { Fragment, useState } from "react";
import styles from "./TaskList.module.scss";
import TaskItem from "./TaskItem";
import Modal from "./UI/Modal";
import { updateTask } from "@/lib/api";
export type TaskProps = Omit<Task, "due" | "createdAt" | "updatedAt"> & {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export default function TaskList({ data }: { data: TaskProps[] }) {
  const [target, setTarget] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const toggleDescription = (itemId: string) => {
    if (itemId === target) setTarget("");
    else setTarget(itemId);
  };
  // const handleDelete = async (task: object, taskId: string) => {
  //   await updateTask(task, taskId);
  // };
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Task Name</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <Fragment key={task.id}>
              <TaskItem
                task={task}
                // onModalOpen={() => setModalOpen(true)}
                target={target}
                onToggle={() => toggleDescription(task.id)}
              />
              {/* <tr>
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
                      onClick={() => handleDelete(task, task.id)}
                    >
                      Delete
                    </button>
                  </Modal>
                </td>
              </tr> */}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
}
