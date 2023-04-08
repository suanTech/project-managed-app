import Greetings from "@/components/Greetings";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/UI/Button";
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.greetings}>
          <Greetings />
        </div>
        <div className={styles.project}>
          projects map here
          <div>
            new project here
          </div>
        </div>
        <div>
          <div className={styles.task}>
            tasks here
          </div>
        </div>
      </div>
    </div>
  )
}
