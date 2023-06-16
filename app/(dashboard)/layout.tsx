import "@/styles/globals.scss";
import { Overpass } from "next/font/google";
import GlassPane from "@/components/UI/GlassPane";
import Sidebar from "@/components/Sidebar";
import LoadingContextProvider from "../Context";

export const metadata = {
  title: "Home",
  description: "Homepage",
  icons: {
    icon: {url: "/icon.png", type: "image/png" }
  }
};
const overpass = Overpass({
  subsets: ["latin"],
  display: "swap"
});
export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="rainbow-mesh">
      <body className={overpass.className}>
        <GlassPane className="app-container">
          <Sidebar />
          <main className="dashboard">
            <LoadingContextProvider>
              {children}
            </LoadingContextProvider>
          </main>
        </GlassPane>
      </body>
    </html>
  );
}
