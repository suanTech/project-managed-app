import "@/styles/globals.scss";
import { Overpass} from "next/font/google";
import GlassPane from "@/components/UI/GlassPane";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import GreetingsSkeleton from "@/components/skeletons/GreetingsSkeleton";

export const metadata = {
  title: "Home",
  description: "Homepage",
};

const overpass = Overpass({
  subsets: ["latin"],
});

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${overpass.className} rainbow-mesh`}>
      <body>
        <GlassPane className='container'>
          <Sidebar/>
          <main className='dashboard'>
            <Suspense fallback={<GreetingsSkeleton/>}>
            {children}
            </Suspense>
          </main>
        </GlassPane>
      </body>
    </html>
  );
}
