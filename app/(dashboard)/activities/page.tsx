import Card from "@/components/UI/Card";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { Task } from "@prisma/client";
import { cookies } from "next/headers";
import styles from "./page.module.scss";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const updatedTasks = await db.$queryRaw<
    Task[]
  >`SELECT * FROM "Task" WHERE "ownerId" = ${user?.id} AND "updatedAt" != "createdAt" AND "deletedAt" IS NOT null;`;
  const deletedTasks = await db.$queryRaw<
    Task[]
  >`SELECT * FROM "Task" WHERE "ownerId" = ${user?.id} AND "deletedAt" IS null ORDER BY "updatedAt" ASC;`;
  return { updatedTasks, deletedTasks };
};
export default async function ActivityPage() {
  const { updatedTasks, deletedTasks } = await getData();
  return (
    <div className={styles.container}>
      <Card type="primary" className={styles.innerContainer}>
        <h2>Upcoming Deadline</h2>
        <div className={styles.contentWrapper}>
          <div className={styles.projectGrid}>
            {updatedTasks.map((task, i) => (
              <Card key={i} type="secondary" className={styles.gridItem}>
                {" "}
                UpdatedTask {task.name}
              </Card>
            ))}
          </div>
          {/* <h2>Recent activities</h2>
            {updatedTasks.map((task, i) => <p key={i}> UpdatedTask {task.name}</p>)}
            {deletedTasks.map((task, i) => <p key={i}> DeletedTask {task.name}</p>)} */}
        </div>
        <h2>Recent Activities</h2>
      </Card>
    </div>
  );
}
