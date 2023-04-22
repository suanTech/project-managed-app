"use client";

import { Icon } from "./UI/Icon";
import styles from "./AllTask.module.scss";
import { useState } from "react";
import { TaskProps } from "./TaskTable";
import { TaskList } from "./TaskList";
export interface TaskWithProject extends TaskProps{
  project: {
    name: string
  }
}

export default function AllTask({ tasks }: { tasks: TaskWithProject[] }) {
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
          <button className="icon small">
            <Icon name="Filter" size={20} />
          </button>
        </span>
      </div>
      <div className={styles.statusWrapper}>
        <a href="#not-started">
          <button
            className={`secondary small ${
              activeButton === 1 ? styles.active : ""
            }`}
            onClick={() => handleClick(1)}
          >
            To Do
          </button>
        </a>
        <a href="#started">
          <button
            className={`secondary small ${
              activeButton === 2 ? styles.active : ""
            }`}
            onClick={() => handleClick(2)}
          >
            Doing
          </button>
        </a>
        <a href="#completed">
          <button
            className={`secondary small ${
              activeButton === 3 ? styles.active : ""
            }`}
            onClick={() => handleClick(3)}
          >
            Done
          </button>
        </a>
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
