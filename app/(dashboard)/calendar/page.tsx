// import CreateNew from "@/components/CreateNew";
// import Greetings from "@/components/Greetings";
// import ProjectCard from "@/components/ProjectCard";
// import TaskCard from "@/components/TaskCard";
// import { getUserFromCookie } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { cookies } from "next/headers";
// import Link from "next/link";
// import styles from "./page.module.scss";

// const getData = async () => {
//   const user = await getUserFromCookie(cookies());
//   const projects = await db.task.findMany({
//     where: {
//       ownerId: user?.id,
//       deleted: false,
//     },
//     orderBy: {
//       due: "asc"
//     },
//     include: {
//       project: true
//     },
//   });
//   return projects;
// };

// export default async function CalendarPage() {
//   const tasks = await getData();
//   return (
//     <div className={styles.container}>
//       <div className={styles.innerContainer}>
//         <div className={styles.greetings}>
//           {/* @ts-expect-error */}
//           <Greetings />
//         </div>
//         <div className={styles.projectWrapper}>
//           <div className={styles.newProject}>
//             <CreateNew type="project" />
//           </div>
//           {projects.map((project) => (
//             <div className={styles.project} key={project.id}>
//               <Link href={`/project/${project.id}`}>
//                 <ProjectCard project={project} />
//               </Link>
//             </div>
//           ))}
//         </div>
//         <div className={styles.taskWrapper}>
//           <div className={styles.task}>
//             {/* @ts-expect-error */}
//             <TaskCard />
//           </div>
//           <div>
//             <br />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
