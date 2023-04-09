import "@/styles/globals.scss";
import { Overpass } from "next/font/google";

const overpass = Overpass({
  subsets: ["latin"],
});

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${overpass.className} candy-mesh`}>
      <body>
        <main className='container'>
          {children}
        </main>
      </body>
    </html>
  );
}
