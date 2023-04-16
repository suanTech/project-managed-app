import { Task } from "@prisma/client";
import styles from "./TaskItem.module.scss";
import TaskItem from "./TaskItem";
export type TaskProps = Omit<Task, "due" | "createdAt" | "updatedAt"> & {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
};

export default function TaskList({ data }: { data: TaskProps[] }) {
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
          {data.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </>
  );
}
