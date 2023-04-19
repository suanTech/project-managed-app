"use client";
import { Task } from "@prisma/client";
import styles from "./TaskItem.module.scss";
import TaskItem from "./TaskItem";
import { useContext } from "react";
import { LoadingContext } from "@/app/(dashboard)/layout";
import Spinner from "./UI/Spinner";
export type TaskProps = Omit<Task, "due" | "createdAt" | "updatedAt"> & {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export default function TaskList({ data }: { data: TaskProps[] }) {
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
            data.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </tbody>
      </table>
    </>
  );
}
