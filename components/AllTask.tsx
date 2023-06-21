"use client";

import { Icon } from "./UI/Icon";
import styles from "./AllTask.module.scss";
import { useState } from "react";
import { TaskList, TasksWithProject } from "./TaskList";
import Button from "./UI/Button";
import LoadingStateContainer from "@/app/(dashboard)/home/LoadingStateContainer";

export default function AllTask({ tasks }: { tasks: TasksWithProject[] }) {
  const [activeButton, setActiveButton] = useState(1);
  const [activeListId, setActiveListId] = useState("not-started");
  const handleClick = (buttonId: number) => {
    setActiveButton(buttonId);
    activeButton === 1
      ? setActiveListId("not-started")
      : activeButton === 2
      ? setActiveListId("started")
      : setActiveListId("completed");
  };
  const data = [
    {
      id: "not-started",
      tasks: tasks.filter((t) => t.status === "NOT_STARTED"),
    },
    {
      id: "started",
      tasks: tasks.filter((t) => t.status === "STARTED"),
    },
    {
      id: "completed",
      tasks: tasks.filter((t) => t.status === "COMPLETED"),
    },
  ];
  return (
    <>
      <div className={styles.titleWrapper}>
        <h2>All Tasks</h2>
      </div>
      <div className={styles.statusWrapper}>
        <Button
          btnType="secondary"
          size="small"
          className={activeButton === 1 ? styles.active : ""}
          onClick={() => handleClick(1)}
        >
          To Do
        </Button>
        <Button
          size="small"
          btnType="secondary"
          className={activeButton === 2 ? styles.active : ""}
          onClick={() => handleClick(2)}
        >
          Doing
        </Button>
        <Button
          size="small"
          btnType="secondary"
          className={activeButton === 3 ? styles.active : ""}
          onClick={() => handleClick(3)}
        >
          Done
        </Button>
      </div>
      <div className={styles.contentWrapper}>
        <LoadingStateContainer>
          {data.map((item) => {
            if (item.id === activeListId) {
              return (
                <div className={styles.col} id={item.id} key={item.id}>
                  <TaskList tasks={item.tasks} />
                </div>
              );
            }
          })}
        </LoadingStateContainer>
      </div>
      <div className={styles.hiddenWrapper}>
        <LoadingStateContainer>
          {data.map((item) => (
            <div className={styles.col} key={item.id}>
              <TaskList tasks={item.tasks} />
            </div>
          ))}
        </LoadingStateContainer>
      </div>
    </>
  );
}
