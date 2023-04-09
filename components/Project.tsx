import { formatDate } from "@/lib/helper";
import { Prisma } from "@prisma/client";
import Card from "./UI/Card";
import styles from './Project.module.scss';

const projectWithTasks = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    tasks: true,
  },
});
type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

export default function Project({ project }: { project: ProjectWithTasks }) {
  const completeCount = project.tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;
  const progress = Math.ceil((completeCount / project.tasks.length) * 100);
  return (
    <Card className="project">
      <div>
        <p className="small muted">{formatDate(project.createdAt)}</p>
      </div>
      <div>
        <h2>{project.name}</h2>
      </div>
      <div>
        <span className="sub">
          {completeCount}/{project.tasks.length} completed
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
