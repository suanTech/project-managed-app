"use client";

import { Icon } from "./UI/Icon";
import styles from "./AllTask.module.scss";
import { useState } from "react";
import { TaskList } from "./TaskList";
import { TaskTypeWithProject } from "@/lib/types/Task";
import Button from "./UI/Button";

export default function AllTask({ tasks }: { tasks: TaskTypeWithProject[] }) {
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
        <span>
          <Button btnType="icon" size="small">
            <Icon name="Filter" size={20} />
          </Button>
        </span>
      </div>
      <div className={styles.statusWrapper}>
        <Button
          btnType="primary-black"
          size="small"
          className={activeButton === 1 ? styles.active : ""}
          onClick={() => handleClick(1)}
        >
          To Do
        </Button>
        <Button
          size="small"
          btnType="primary-black"
          className={activeButton === 2 ? styles.active : ""}
          onClick={() => handleClick(2)}
        >
          Doing
        </Button>
        <Button
          size="small"
          btnType="primary-black"
          className={activeButton === 3 ? styles.active : ""}
          onClick={() => handleClick(3)}
        >
          Done
        </Button>
      </div>
      <div className={styles.contentWrapper}>
        {data.map((item) => {
          if (item.id === activeListId) {
            return (
              <div className={styles.col} id={item.id} key={item.id}>
                <TaskList tasks={item.tasks} />
              </div>
            );
          }
        })}
      </div>
      {/* for screen size bigger than 992px */}
      <div className={styles.hiddenWrapper}>
        {data.map((item) => (
          <div className={styles.col} key={item.id}>
            <TaskList tasks={item.tasks} />
          </div>
        ))}
      </div>
    </>
  );
}
