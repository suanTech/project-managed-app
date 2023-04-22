"use client";

import { LoadingContext } from "@/app/Context";
import Spinner from "@/components/UI/Spinner";
import React, { useContext } from "react";

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
