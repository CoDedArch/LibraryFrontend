import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";



export const metadata: Metadata = {
  title: "Library App",
  description: "An app which targets users below the ages of 18",
};

export default function RootLayout({children,}:{children:React.ReactNode}) {
  return (
    <html>
      <body className="bg-creamy-100">
        <header className="flex flex-row justify-between p-2 text-lg">
          <div className="p-2 font-extrabold text-2xl flex space-x-6">
            {/* This contains the Logo and the Name of the application */}
            <p>Let&lsquo;s Learn</p>
            <p className="absolute top-[2.4em] md:static font-extralight text-2xl md:text-lg p-1 md:bg-orange-200 bg-opacity-25 hover:bg-opacity-10 transition-opacity">
              <a href="http://" className=" hover:text-orange-300 transition-colors">My Books</a>
            </p>
          </div>
          <div className="flex md:space-x-2">
              <button className="flex flex-row relative top-[3em] left-[4em] md:static md:p-2">
                <p className="font-extralight font-mono w-fit text-2xl">Browse</p> 
                <div className="p-3 pl-[2px] w-[2em]">
                  <Image src="/images/dropdown.png" alt="drop down" width={30} height={20} className="w-[0.7em]"/>
                </div>
              </button>
            {/* this is the search bar */}
            <div className="hidden w-[15em] md:w-[20em] md:flex flex-row justify-between rounded-md border-r-2 border-orange-200">
              <form action="">
                <select name="" id="" className="h-[2.8em] bg-orange-200 opacity-55 border-r-2 border-black rounded-l-md">
                  <option value="">All</option>
                </select>
                <input type="text" placeholder="Search" className="pl-1 h-[2.6em] w-[9em] md:w-[14.3em] bg-orange-200 bg-opacity-20 text-black font-normal ml-1 border-r-2 border-black placeholder:text-black placeholder:font-light outline-none" />
              </form>
              <div className="p-2">
                <Image src="/images/barcode.png" alt="barcode reader" className="cursor-pointer" width={30} height={50}/>
              </div>
            </div>
            <div className="relative md:-left-28 p-3">
              <Image src="/images/search.png" alt="search icon" className="w-[1.4em] cursor-pointer" width={40} height={50}/>
            </div>
            <a href="" className="hidden sm:block w-[5em] hover:text-green-500 transition-colors p-1 pt-2 font-bold font-mono">Log in</a>
            <button className="hidden sm:block bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</button>
            <div className="p-2">
              <Image src="/images/menu.png" alt="menu button" className="cursor-pointer" width={30} height={50} />
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  )
}