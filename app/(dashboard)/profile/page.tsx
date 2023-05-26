import Card from "@/components/UI/Card";
import styles from "./page.module.scss";

export default async function ProfilePage() {
  // const tasks = await getData();
  return (
    <div className={styles.container}>
      <Card className={styles.innerContainer}>
          {/* <AllTask tasks={tasks}/> */}
      </Card>
    </div>
  );
}