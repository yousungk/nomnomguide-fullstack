// import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRoute";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar/page";
import Footer from "./Footer/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* //<AppRouterCacheProvider> */}
        <div className="flex flex-row min-h-screen">
          <NavBar />
          <div>{children}</div>
        </div>
        <Footer />
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  );
}
