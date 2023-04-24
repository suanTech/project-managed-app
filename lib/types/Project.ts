import { TASK_STATUS } from "@prisma/client";
export type ProjectType = {
  due: string | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
  deletedAt: string | null;
  tasks:
    | {
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
      }[]
    | undefined;
  id?: string | undefined;
  ownerId?: string | undefined;
  name?: string | undefined;
  description?: string | undefined | null;
};
