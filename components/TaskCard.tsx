import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task, TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./UI/Button";
import Card from "./UI/Card";
import styles from "./TaskCard.module.scss";
import { formatDate } from "@/lib/helper";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: true,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
  return tasks;
};

export default async function TaskCard({
  title,
  tasks,
}: {
  title: string;
  tasks: Task[];
}) {
  const data = tasks || (await getData());
  return (
    <Card className="task">
      <div className={styles.titleWrapper}>
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <Button className="secondary small">+ Create New</Button>
        </div>
      </div>
      {data && data.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{formatDate(task.due!)}</td>
                <td>{task.status === 'COMPLETED' ? 'O' : task.status === 'NOT_STARTED' ? '△' : 'X'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (

        <div>No Tasks</div>
      )}
    </Card>
  );
}
