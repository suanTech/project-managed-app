"use client";

import React, { useContext, useState } from "react";
import { Icon } from "./UI/Icon";
import Modal from "./UI/Modal";
import { useRouter } from "next/navigation";
import {
  deleteProject,
  deleteTask,
  updateProject,
  updateTask,
} from "@/lib/api";
import { delay } from "@/lib/helper";
import styles from "./UI/Modal.module.scss";
import Button from "./UI/Button";
import { Project, Task } from "@prisma/client";
import { LoadingContext } from "@/app/Context";

export default function EditButton({
  data,
  type,
}: {
  data: Project | Task;
  type: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const {setIsLoading} = useContext(LoadingContext);
  const [values, setValues] = useState({
    name: data.name!,
    description: data.description || "",
  });
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setModalOpen(false);
    if ((e.target as HTMLButtonElement).name === "update") {
      try {
        if (type === "project") {
          await updateProject(values, data.id!);
        } else {
          await updateTask(values, data.id!);
        }
      } catch (err) {
        console.log(err);
      } finally {
        router.refresh();
        setIsLoading(false);
        await delay(2000);
      }
    } else if ((e.target as HTMLButtonElement).name === "delete") {
      if (type === "project") {
        try {
          await deleteProject(data.id!);
          await delay(4000);
        } catch (err) {
        } finally {
          router.replace("/home");
          setIsLoading(false);
        }
      } else {
        try {
          await deleteTask(data.id!);
          await delay(2000);
        } catch (err) {
          console.log(err);
        } finally {
          router.refresh();
          setIsLoading(false);
        }
      }
    }
  };
  const content = type === "project" ? "project" : "task";
  return (
    <>
      <Button
        btnType="icon-warning"
        size="small"
        onClick={() => setModalOpen(true)}
      >
        <Icon name="Settings" size="16" />
      </Button>
      <Modal modalOpen={modalOpen} closeModal={() => setModalOpen(false)}>
        <form className={styles.form}>
          {isDeleting ? (
            <>
              <h3 className="warning" style={{ textAlign: "center" }}>
                Are you sure you want to delete this {content}?
              </h3>
              <Button
                type="submit"
                btnType="primary-confirm"
                size="medium"
                name="delete"
                onClick={(e) => handleSubmit(e)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <h1>Update {content}</h1>
              <input
                placeholder={data.name}
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
                placeholder={data.description || "enter description"}
                value={values.description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              <div className={styles.buttonWrapper}>
                <Button
                  type="submit"
                  size="medium"
                  name="update"
                  onClick={(e) => handleSubmit(e)}
                >
                  Update
                </Button>
                <Button
                  btnType="primary-confirm"
                  size="medium"
                  onClick={() => setIsDeleting(true)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </form>
      </Modal>
    </>
  );
}
