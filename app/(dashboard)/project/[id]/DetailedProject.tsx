"use client";

import styles from "./DetailedProject.module.scss";
import { formatDate } from "@/lib/helper";
import { Project, Task, TASK_STATUS } from "@prisma/client";
import Card from "@/components/UI/Card";
import Button from "@/components/UI/Button";
import { updateStatus } from "@/lib/api";
import { Fragment, useState } from "react";
import CreateNew from "@/components/CreateNew";

export default function DetailedProject({
  project,
  tasks
  
}: {
  project: Project
  tasks: Task[];
}) {
  const data = tasks;
  const [target, setTarget] = useState("");
  const toggleDescription = (itemId: string) => {
    if (itemId === target) setTarget("");
    else setTarget(itemId);
  };
  return (
    <Card className="task">
      <div className={styles.titleWrapper}>
        <div>
          <h2>{project.name}</h2>
        </div>
        <div>
          <CreateNew type="task" id={project.id!} />
        </div>
      </div>
      <div className={styles.projectDescription}>
        <p className="sub">
          <i>Description: {project.description}</i>
        </p>
      </div>
      {data && data.length ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((task) => (
              <Fragment key={task.id}>
                <tr
                  className={styles.item}
                  onClick={() => toggleDescription(task.id)}
                >
                  <td>{task.name}</td>
                  <td>{formatDate(task.due!)}</td>
                  <td>{task.status}</td>
                </tr>
                <tr
                  className={`${styles.taskDescription} ${
                    target === task.id ? styles.show : ""
                  }`}
                >
                  <td colSpan={3}>
                    <div>
                      <p>{task.description}</p>
                      <div className={styles.buttonWrapper}>
                        <Button className="secondary small">
                          Update status
                        </Button>
                        <Button className="secondary small">Delete task</Button>
                      </div>
                    </div>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Tasks</div>
      )}
    </Card>
  );
}
