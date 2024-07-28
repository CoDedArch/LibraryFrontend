import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
  title: "Library App",
  description: "An app which targets users below the ages of 18",
};

export default function RootLayout({ children, }: {children:React.ReactNode}) {
  return (
    <html>
      <body className="bg-creamy-100">
        <header className="flex flex-row justify-between p-2 text-lg">
          <div className="p-2 font-extrabold text-2xl">
            {/* This contains the Logo and the Name of the application */}
            <p>Let&lsquo;s Learn</p>
          </div>
          <div className="flex space-x-2">
            <button className="bg-green-500 w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</button>
            <div className="block sm:hidden">
              <Image src="/images/menu.png" alt="menu button" width={40} height={50} />
            </div>
          </div>
        </header>
        <main></main>
        <footer></footer>
      </body>
    </html>
  )
}