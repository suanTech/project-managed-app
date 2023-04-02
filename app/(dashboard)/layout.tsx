import "@/styles/globals.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import styles from "./layout.module.scss";

export const metadata = {
  title: "Home",
  description: "Homepage",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${styles.body} candy-mesh`}>
        <GlassPane className={styles.container}>
          {/* <SideBar/> */}
          <main className={styles.main}>
            {children}
          </main>
        </GlassPane>
      </body>
    </html>
  );
}
