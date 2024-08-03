"use client"
import type { Metadata } from "next";
import "./globals.css";
import { useEffect, useState, useRef, ReactNode } from "react";
import HeaderComp from "./components/HeaderComp";


interface RootLayoutProps {
  children: ReactNode;
  isLoggedIn: boolean;
}

const metadata: Metadata = {
  title: "Library App",
  description: "An app which targets users below the ages of 18",
};

export default function RootLayout({ children, isLoggedIn }: RootLayoutProps) {
 
  return (
    <html>
      <body className="bg-creamy-100">
        {/* Header goes in here */}
        <HeaderComp></HeaderComp>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  )
}