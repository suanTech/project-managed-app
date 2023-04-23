import { TASK_STATUS } from "@prisma/client";

export type TaskType = {
  due: string | undefined;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | undefined;
  id: string;
  ownerId: string;
  projectId: string;
  status: TASK_STATUS;
  name: string;
  description: string;
}

export type TaskTypeWithProject = TaskType & {
  project: {
    name: string;
  }
}
