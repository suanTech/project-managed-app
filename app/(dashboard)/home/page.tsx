import Greetings from "@/components/Greetings";
import Project from "@/components/Project";
import GreetingsSkeleton from "@/components/skeletons/GreetingsSkeleton";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/helper";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./page.module.scss";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return projects;
};

export default async function Home() {
  const projects = await getData();
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.greetings}>
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error */}
            <Greetings />
          </Suspense>
        </div>
        <div className={styles.projectWrapper}>
          {projects.map((project) => (
            <div className={styles.project}>
              <Link href={`/project/${project.id}`}>
                <Project project={project} />
              </Link>
            </div>
          ))}
          <div>new project here</div>
        </div>
        <div>
          <div className={styles.task}>tasks here</div>
        </div>
      </div>
    </div>
  );
}
