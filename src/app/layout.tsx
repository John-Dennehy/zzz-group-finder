
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Providers from "@/app/providers";


const inter = Inter({ subsets: [ "latin" ] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="">
      <body
        className={`${inter.className} bg-slate-50 border-t-4 border-blue-600`}
      >
        <Providers>
          <div className="border-b-2 bg-slate-100">
            <nav className="container flex flex-col md:flex-row p-6  justify-between ">
              <h1 className="font-bold text-center">Group Finder</h1>
              <ul className="flex flex-col gap-4 md:flex-row ">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/create">Create New Group</Link>
                </li>
              </ul>
            </nav>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
