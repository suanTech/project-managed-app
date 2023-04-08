import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import GlassPane from "@/components/UI/GlassPane";
import styles from "./layout.module.scss";
import Sidebar from "@/components/Sidebar";

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
      <body className={`${styles.body} rainbow-mesh`}>
        <GlassPane className={styles.container}>
          <Sidebar/>
          <main className={styles.main}>
            {children}
          </main>
        </GlassPane>
      </body>
    </html>
  );
}
