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
      className="bg-white-100 bg-opacity-25 w-[12em] md:w-[12em] shadow-2xl flex flex-col h-fit md:max-h-none"
    >
      <p className="h-[15em] max-h-[15em] w-[12em] bg-stylish-400 relative">
        <Image
          src={book.cover_img}
          alt={book.title}
          className="w-[12em] h-full transition-transform transform hover:scale-95"
          width={1230}
          height={30}
        />
        {
          book.book_type == "AU" ? (<div className="bg-white-100 w-[7em] flex justify-center absolute top-0 right-0 rounded-md shadow-2xl shadow-stylish-600">
            <Image
          src="/images/audio.png"
          alt="audio"
          className="w-[4em]"
          width={1230}
          height={30}
        />
          </div>) : ""
        }
      </p>
      <div className="">
        <p className="font- p-1 font-bold text-xl text-center">{book.title}</p>
        <p className="font-main text-center mt-2 text-lg text-stylish-200">{book.publisher}</p>
        <p className="text-center mt-2 pb-3 text-slate-500 font-light ">({book.publication_date})</p>
      </div>
    </Link>
  );
};

export default BookComp;
