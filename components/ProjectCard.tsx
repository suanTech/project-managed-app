import { formatDate } from "@/lib/helper";
import { Prisma } from "@prisma/client";
import Card from "./UI/Card";
import styles from "./ProjectCard.module.scss";

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: {
      where: {
        deleted: false,
      },
    },
  },
});
export type ProjectWithTasks = Prisma.ProjectGetPayload<
  typeof projectWithTasks
>;

export default function ProjectCard({
  project,
}: {
  project: ProjectWithTasks;
}) {
  const completeCount = project.tasks.filter(
    (task) => task.status === "COMPLETED" && task.deleted === false
  ).length;
  const progress = Math.ceil(
    (completeCount /
      project.tasks.filter((task) => task.deleted === false).length) *
      100
  );
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
          {project.tasks.filter((task) => task.deleted === false).length} completed
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
