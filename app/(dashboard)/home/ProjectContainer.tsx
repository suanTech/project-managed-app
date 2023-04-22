"use client";

import ProjectCard, { ProjectWithTasks } from "@/components/ProjectCard";
import Spinner from "@/components/UI/Spinner";
import Link from "next/link";
import React, { useContext } from "react";
import { LoadingContext } from "../layout";
import styles from "./page.module.scss";

export default function ProjectContainer({
  children
}: {
  children: React.ReactNode
}) {
  const { isLoading } = useContext(LoadingContext);
  return (
    <>
      {isLoading ? <Spinner /> : children}
    </>
  );
}
