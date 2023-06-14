import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./UI/Card";
import styles from "./TaskCard.module.scss";
import { formatDate } from "@/lib/helper";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = db.task.findMany({
    where: {
      ownerId: user?.id,
      deletedAt: null,
      NOT: {
        status: TASK_STATUS.COMPLETED,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });
  return tasks;
};

export default async function TaskCard() {
  const data = await getData();
  return (
    <Card type="primary" role="task">
      <div className={styles.titleWrapper}>
        <div>
          <h2>Due Tasks</h2>
        </div>
      </div>
      {!data || data.length < 0 ? (
        <div>No Tasks</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody className={styles.listContainer}>
            {data.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{formatDate(task.due!, "short")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}
