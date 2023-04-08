import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import GlassPane from "@/components/UI/GlassPane";
import styles from "./layout.module.scss";

const inter = Inter({
  subsets: ["latin"],
});

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={`${styles.body} candy-mesh`}>
        <main className={styles.container}>
          {children}
        </main>
      </body>
    </html>
  );
}
