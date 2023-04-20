import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import styles from "./page.module.scss";
import Card from "@/components/UI/Card";
import TaskList from "@/components/TaskList";
import Link from "next/link";
import AddButton from "@/components/AddButton";
import EditButton from "@/components/EditButton";

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
    due: project?.due?.toJSON(),
    createdAt: project?.createdAt.toJSON(),
    updatedAt: project?.updatedAt.toJSON(),
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
          <div className={styles.navButton}>
            <Link href="/home">
              <p className="small">◂ back to dashboard</p>
            </Link>
          </div>
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <h1>{project.name}</h1>
              {/* @ts-expect-error */}
              <EditButton project={project} />
            </div>
            <div className={styles.buttonWrapper}>
              <AddButton type="task" id={project.id!} />
            </div>
          </div>
          <div className={styles.projectDescription}>
            <p className="sub">
              <i>Description: {project.description}</i>
            </p>
          </div>
        </div>
        <div className={styles.taskList}>
          {tasks && tasks.length ? (
            <TaskList data={tasks} />
          ) : (
            <div>No Tasks</div>
          )}
        </div>
      </Card>
    </div>
  );
}
