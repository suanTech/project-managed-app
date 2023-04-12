import CreateNew from "@/components/CreateNew";
import CreateProject from "@/components/CreateNew";
import Greetings from "@/components/Greetings";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import Button from "@/components/UI/Button";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { delay } from "@/lib/helper";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./page.module.scss";

const getData = async () => {
  // try {
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
          {/* @ts-expect-error */}
          <Greetings />
        </div>
        <div className={styles.projectWrapper}>
          <div className={styles.newProject}>
            <CreateNew type='project' />
          </div>
          {projects.map((project) => (
            <div className={styles.project} key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
        </div>
        <div className={styles.taskWrapper}>
          <div className={styles.task}>
            {/* @ts-expect-error */}
            <TaskCard />
          </div>
          <div><br /></div>
        </div>
      </div>
    </div>
  );
}
