import "@/styles/globals.css";
import { Inter } from "next/font/google";
import GlassPane from "@/components/GlassPane";
import styles from './layout.module.scss';

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
      <body className={`${styles.body} rainbow-mesh`}>
        <GlassPane className={styles.container}>
          {children}
          </GlassPane>
      </body>
    </html>
  );
}
