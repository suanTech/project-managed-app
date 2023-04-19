import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import styles from "./page.module.scss";
import Card from "@/components/UI/Card";
import CreateNew from "@/components/CreateNew";
import TaskList from "@/components/TaskList";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "@/components/UI/Spinner";

interface Params {
  id: string;
}
const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: {
        orderBy: {
          status: "asc",
        },
        where: {
          deleted: false,
        },
      },
    },
  });
  return {
    ...project,
    tasks: project?.tasks.map((task) => {
      return {
        ...task,
        due: task.due?.toJSON(),
        createdAt: task.createdAt.toJSON(),
        updatedAt: task.updatedAt.toJSON(),
      };
    }),
  };
};
export const generateMetadata = async ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Params;
}) => {
  const project = await getData(params.id);
  return { title: project.name, description: project.description };
};
export default async function ProjectPage({ params }: { params: Params }) {
  const project = await getData(params.id);
  const tasks = project.tasks;
  return (
    <div className={styles.container}>
      <Card>
        <div>
          <div className={styles.goBack}>
            <Link href="/home">
              <p className="small">◂ back to dashboard</p>
            </Link>
          </div>
          <div className={styles.titleWrapper}>
            <div>
              <h1>{project.name}</h1>
            </div>
            <div className={styles.addBtn}>
              <CreateNew type="task" id={project.id!} />
            </div>
          </div>
          <div className={styles.projectDescription}>
            <p className="sub">
              <i>Description: {project.description}</i>
            </p>
          </div>
          <div className={styles.taskList}>
            {tasks && tasks.length ? (
              <TaskList data={tasks} />
            ) : (
              <div>No Tasks</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
