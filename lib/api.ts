import { Task } from "@prisma/client";

type FetcherOptions = {
  url: string;
  method: string;
  body?: object;
  json?: boolean;
};
const fetcher = async ({ url, method, body, json = true }: FetcherOptions) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async (user: object) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
    json: false
  })
}
export const signin = async (user: object) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
    json: false
  })
}
export const createProject = (name:string, description:string) => {
  return fetcher({
    url: "/api/createProject",
    method: "POST",
    body: {name, description},
  })
}
export const createTask = (id:string, task: {name: string, description:string, due: string}) => {
  return fetcher({
    url: "/api/createTask",
    method: "POST",
    body: {id, task}
  })
}
export const updateTask = (task: object, taskId: string) => {
  return fetcher({
    url: "/api/updateTask",
    method: "PUT",
    body: {task, taskId}
  })
}
export const updateProject = (project: {name: string, description: string}, projectId: string) => {
  return fetcher({
    url: "/api/updateProject",
    method: "PUT",
    body: {project, projectId}
  })
}

export const deleteTask = (taskId: string) => {
  return fetcher({
    url: "/api/deleteTask",
    method: "PUT",
    body: {taskId}
  })
}

export const deleteProject = (projectId: string) => {
  return fetcher({
    url: "/api/deleteProject ",
    method: "PUT",
    body: {projectId}
  })
}