"use client";
import { Task } from "@prisma/client";
import styles from "./TaskTableItem.module.scss";
import TaskItem from "./TaskTableItem";
import { useContext } from "react";
import Spinner from "./UI/Spinner";
import { LoadingContext } from "@/app/Context";
export type TaskProps = Omit<Task, "due" | "createdAt" | "updatedAt" | "deletedAt"> & {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deletedAt: string | undefined;
} & {
  type: "task"
}

export default function TaskTable({ data }: { data: TaskProps[] }) {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Spinner />
              </td>
            </tr>
          ) : (
            data.filter(task => !task.deletedAt).map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </tbody>
      </table>
    </>
  );
}
