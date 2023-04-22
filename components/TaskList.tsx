import React from "react";
import styles from "./AllTask.module.scss";
import { formatDate } from "@/lib/helper";
import EditButton from "./EditButton";
import { TaskWithProject } from "./AllTask";

export const TaskList = ({ tasks }: { tasks: TaskWithProject[] }) => {
  return (
    <div className={styles.taskWrapper}>
      {tasks.map((task) => (
        <div className={styles.task} key={task.id}>
          <div className={styles.titleWrapper}>
            <h3>{task.name}</h3>
            <EditButton type={task} />
          </div>
          <p>{task.description}</p>
          <p>Due: {formatDate(task.due, "short")}</p>
          <p>Project: {task.project.name}</p>
        </div>
      ))}
    </div>
  );
};
