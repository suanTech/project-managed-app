import { formatDate } from "@/lib/helper";
import Card from "./UI/Card";
import styles from "./ProjectCard.module.scss";
import { TASK_STATUS } from "@prisma/client";
type ProjectPropTypes = {
  createdAt: string 
  deletedAt: string | null;
  id?: string | undefined;
  name?: string | undefined;
  description?: string | undefined | null;
  tasks: {
        deletedAt: string | null;
        projectId: string 
        status: TASK_STATUS;
        name: string 
        description: string 
      }[]
};
export default function ProjectCard({
  project,
}: {
  project: ProjectPropTypes;
}) {
  const completeCount = project.tasks ? project.tasks.filter(
    (task) => task.status === "COMPLETED" && task.deletedAt === null
  ).length : 0;
  const progress = Math.ceil(
    (completeCount /
      project.tasks.filter((task) => task.deletedAt === null).length) *
      100
  ) || 0;
  return (
    <Card className="project">
      <div>
        <p className="small muted">{formatDate(project.createdAt, "long")}</p>
      </div>
      <div className={styles.projectName}>
        <h2>{project.name}</h2>
      </div>
      <div>
        <span className="sub">
          {completeCount}/
          {project.tasks.filter((task) => task.deletedAt === null).length} completed
        </span>
      </div>
      <div>
        <div className={styles.progressBar}>
          <div style={{ width: `${progress}%` }}></div>
        </div>
        <div className={styles.percentage}>
          <p className="sub small">{progress}%</p>
        </div>
      </div>
    </Card>
  );
}
