
import { getUserFromCookie } from "@/lib/auth"
import { db } from "@/lib/db";
import { cookies } from "next/headers"
import styles from '../../home/page.module.scss';
import DetailedProject from "@/app/(dashboard)/project/[id]/DetailedProject";

interface Params {
  id: string
}
const getData = async(id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
  where: {
    id,
    ownerId: user?.id
  },
  include: {
    tasks: {
      orderBy: {
        status: 'asc'
      }
    }
  },
  })
  return {
    ...project,
    tasks: project?.tasks.map(task => {
    return {
      ...task,
      due: task.due?.toJSON(),
      createdAt: task.createdAt.toJSON(),
      updatedAt: task.updatedAt.toJSON()
    }
  })}
}
export default async function ProjectPage({params}: {params: Params}) {
  const project = await getData(params.id)
  return (
    <div className={styles.container}>
      {/* @ts-expect-error */}
      <DetailedProject project={project} tasks={project.tasks}/>
    </div>
  )
}
