import "@/styles/globals.scss";
import { Overpass } from "next/font/google";

const font = Overpass({
  subsets: ["latin"],
});

export const metadata = {
  icons: {
    icon: {url: "/icon.png", type: "image/png" }
  }
};

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="candy-mesh">
      <body className={font.className}>
        <main className="app-container">{children}</main>
      </body>
    </html>
  );
}
