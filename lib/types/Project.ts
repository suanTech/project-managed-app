import { TASK_STATUS } from "@prisma/client";

export type ProjectType = {
  due: string | undefined;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  tasks: {
    due: string | undefined;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    id: string;
    ownerId: string;
    projectId: string;
    status: TASK_STATUS;
    name: string;
    description: string;
}[];
}