import React from "react";
import styles from "./AllTask.module.scss";
import { formatDate } from "@/lib/helper";
import EditButton from "./EditButton";
import { Prisma } from "@prisma/client";

const tasksWithProject = Prisma.validator<Prisma.TaskArgs>()({
  include: { project: {
    select: {
      name: true
    }
  } },
});

export type TasksWithProject = Prisma.TaskGetPayload<typeof tasksWithProject>;


export const TaskList = ({ tasks }: { tasks: TasksWithProject[] }) => {
  return (
    <div className={styles.taskWrapper}>
      {tasks.map((task) => (
        <div className={styles.task} key={task.id}>
          <div className={styles.titleWrapper}>
            <h3>{task.name}</h3>
            <EditButton data={task} type="task" />
          </div>
          <p>{task.description}</p>
          <p>Due: {task.due ? formatDate(task.due, "short") : null}</p>
          <p>Project: {task.project.name}</p>
        </div>
      ))}
    </div>
  );
};
