// components/BookComp.tsx
import React from "react";
import Image from "next/image";
import { Book as BookType } from "./types";
import Link from "next/link";

interface BookProps {
  book: BookType;
}

const BookComp: React.FC<BookProps> = ({ book }) => {
  return (
    <Link
      href={`/bookdetail/${book.id}`}
      className="bg-orange-200 bg-opacity-25 w-[8em] md:w-[10em] shadow-2xl flex flex-col max-h-[19em] md:max-h-none"
    >
      <p className="h-[13em] max-h-[13em] md:w-[10em]">
        <Image
          src={book.cover_img}
          alt={book.title}
          className="w-full h-full"
          width={1230}
          height={30}
        />
      </p>
      <div className="mt-auto">
        <p className="font-projects pl-2">{book.title}</p>
        <p className="font-title pl-2">{book.publisher}</p>
        <p className="flex justify-end pr-1">{book.publication_date}</p>
      </div>
    </Link>
  );
};

export default BookComp;
