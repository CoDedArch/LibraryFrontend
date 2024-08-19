// components/BookComp.tsx
import React from "react";
import Image from "next/image";
import { Book as BookType } from "./types";
import Link from "next/link";

interface BookProps {
  book: BookType;
  info_title: string;
  info: string;
}

const InfoComp: React.FC<BookProps> = ({ book, info_title, info }) => {
  const getInfo = () => {
    if (info === "publication_date") {
      return book.publication_date;
    } else if (info === "publisher") {
      return book.publisher;
    } else if (info === "no_pages") {
      return book.no_pages;
    } else {
      return "Unknown info";
    }
  };
  return (
    <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
      <p className="text-orange-500">{info_title}</p>
      <p>{getInfo()}</p>
    </li>
  );
};

export default InfoComp;
