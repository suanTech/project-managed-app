import AllTask from "@/components/AllTask";
import GreetingsSkeleton from "@/components/skeletons/GreetingsSkeleton";
import Card from "@/components/UI/Card";
import { Icon } from "@/components/UI/Icon";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { Suspense } from "react";
import styles from "./page.module.scss";

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      deletedAt: null,
    },
    orderBy: {
      due: "asc",
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
  });
  return tasks.map((task) => ({
    ...task,
    due: task?.due?.toJSON(),
    createdAt: task?.createdAt.toJSON(),
    updatedAt: task?.updatedAt.toJSON(),
    deletedAt: task?.deletedAt?.toJSON(),
  }));
};

export default async function StatusPage() {
  const tasks = await getData();
  return (
    <div className={styles.container}>
      <Card className={styles.innerContainer}>
          <AllTask tasks={tasks} />
      </Card>
    </div>
  );
}