import { TASK_STATUS } from "@prisma/client";

export type TaskType = {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deletedAt: string | null;
  id: string | undefined;
  ownerId: string | undefined;
  projectId: string | undefined;
  status: TASK_STATUS;
  name: string | undefined;
  description: string | undefined;
}

export type TaskTypeWithProject = TaskType & {
  project: {
    name: string;
  }
}
