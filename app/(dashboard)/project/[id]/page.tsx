import TaskCard from "@/components/TaskCard";
import { getUserFromCookie } from "@/lib/auth"
import { db } from "@/lib/db";
import { cookies } from "next/headers"
import styles from '../../home/page.module.scss';

interface Params {
  id: string
}
const getData = async(id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = db.project.findFirst({
  where: {
    id,
    ownerId: user?.id
  },
  include: {
    tasks: true,
  }
  })
  return project;
}
export default async function ProjectPage({params}: {params: Params}) {
  const project = await getData(params.id)
  return (
    <div className={styles.container}>
      {/* @ts-expect-error */}
      <TaskCard tasks={project.tasks} title={project.name}/>
    </div>
  )
}
