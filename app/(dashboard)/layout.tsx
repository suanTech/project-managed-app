"use client";

import "@/styles/globals.scss";
import { Overpass } from "next/font/google";
import GlassPane from "@/components/UI/GlassPane";
import Sidebar from "@/components/Sidebar";
import { createContext, Dispatch, SetStateAction, useState } from "react";

const overpass = Overpass({
  subsets: ["latin"],
});
type ContextProps = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext<ContextProps>({
  isLoading: false,
  setIsLoading: () => {},
});
export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <html lang="en" className={`${overpass.className} rainbow-mesh`}>
      <body>
        <GlassPane className="container">
          <Sidebar />
          <main className="dashboard">
            <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
              {children}
            </LoadingContext.Provider>
          </main>
        </GlassPane>
      </body>
    </html>
  );
}
