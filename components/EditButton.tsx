"use client";

import React, { useState } from "react";
import { Icon } from "./UI/Icon";
import Modal from "./UI/Modal";
import { useRouter } from "next/navigation";
import { deleteProject, updateProject } from "@/lib/api";
import { delay } from "@/lib/helper";
import styles from "./UI/Modal.module.scss";
import { Project } from "@prisma/client";
import { TaskProps } from "./TaskTable";
export type ProjectProps = Omit<
  Project,
  "due" | "createdAt" | "updatedAt" | "tasks"
> & {
  type: "project";
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

export default function EditButton({ type }: { type: ProjectProps | TaskProps }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [values, setValues] = useState({
    name: type.name,
    description: type.description || "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    if ((e.target as HTMLButtonElement).name === "update") {
      try {
        await updateProject(values, type.id);
      } catch (err) {
        console.log(err);
      } finally {
        router.refresh();
        delay(2000);
      }
    } else if ((e.target as HTMLButtonElement).name === "delete") {
      try {
        await deleteProject(type.id);
      } catch (err) {
        console.log(err);
      } finally {
        router.replace("/home");
        delay(2000);
        console.log(values);
      }
    }
  };
  const content = type.type === "project" ? "project" : "task"
  return (
    <>
      <button className="warning icon" onClick={() => setModalOpen(true)}>
        <Icon name="Settings" size="16" />
      </button>
      <Modal
        modalOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      >
        <form className={styles.form}>
          {isDeleting ? (
            <>
              <h3 className="warning" style={{ textAlign: "center" }}>
                Are you sure you want to delete this {content}?
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
              <h1>Update {content}</h1>
              <input
                placeholder={type.name}
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
                placeholder={type.description || "enter description"}
                value={values.description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <div className={styles.buttonWrapper}>
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
