"use client";
import { Prisma } from "@prisma/client";
import styles from "./TaskTableItem.module.scss";
import { useContext } from "react";
import Spinner from "./UI/Spinner";
import { LoadingContext } from "@/app/Context";
import TaskTableItem from "./TaskTableItem";
import { TaskType } from "@/lib/types/Task";

export default function TaskTable({ data }: { data: TaskType[] }) {
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
            data
              .filter((task) => !task.deletedAt)
              .map((task) => <TaskTableItem key={task.id} task={task} />)
          )}
        </tbody>
      </table>
    </>
  );
}
