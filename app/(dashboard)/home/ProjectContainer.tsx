"use client";

import ProjectCard, { ProjectWithTasks } from "@/components/ProjectCard";
import Spinner from "@/components/UI/Spinner";
import Link from "next/link";
import React, { useContext } from "react";
import { LoadingContext } from "../layout";
import styles from "./page.module.scss";

export default function ProjectContainer({
  data
}: {
  data: ProjectWithTasks[]
}) {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data.map((project) => (
          <div className={styles.project} key={project.id}>
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))
      )}
    </>
  );
}
