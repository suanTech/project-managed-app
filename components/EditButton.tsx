"use client";

import React, { useState } from "react";
import { Icon } from "./UI/Icon";
import Modal from "./UI/Modal";
import { useRouter } from "next/navigation";
import { deleteProject, updateProject } from "@/lib/api";
import { delay } from "@/lib/helper";
import styles from "./UI/Modal.module.scss";
import { Project } from "@prisma/client";
export type ProjectProps = Omit<
  Project,
  "due" | "createdAt" | "updatedAt" | "tasks"
> & {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deletedAt: string | null;
  tasks: {
    due: string | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
    deletedAt: string | null;
  };
};
export default function EditButton({ project }: { project: ProjectProps }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [values, setValues] = useState({
    name: project.name,
    description: project.description || "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    if ((e.target as HTMLButtonElement).name === "update") {
      try {
        await updateProject(values, project.id);
      } catch (err) {
        console.log(err);
      } finally {
        router.refresh();
        delay(2000);
      }
    } else if ((e.target as HTMLButtonElement).name === "delete") {
      try {
        await deleteProject(project.id);
      } catch (err) {
        console.log(err);
      } finally {
        router.replace("/home");
        delay(2000);
        console.log(values);
      }
    }
  };
  return (
    <>
      <button className="text warning" onClick={() => setModalOpen(true)}>
        <Icon name="Settings" size="16" />
      </button>
      <Modal
        className="small-card"
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <form className={styles.form}>
          {isDeleting ? (
            <>
              <h3 className="warning" style={{ textAlign: "center" }}>
                Are you sure you want to delete this project?
              </h3>
              <button
                type="submit"
                name="delete"
                className="primary-confirm medium"
                onClick={(e) => handleSubmit(e)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <h1>Update Project</h1>
              <input
                placeholder={project.name}
                value={values.name}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
              <input
                className={styles.description}
                placeholder={project.description || "enter description"}
                value={values.description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <div>
                <button
                  type="submit"
                  className="primary small"
                  name="update"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update
                </button>
                <button
                  className="primary-confirm small"
                  onClick={() => setIsDeleting(true)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </>
  );
}
