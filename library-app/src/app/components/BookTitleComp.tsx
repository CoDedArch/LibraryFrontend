// components/BookComp.tsx
import React from "react";
import { Book as BookType } from "./types";

interface BookProps {
  book: BookType;
}

const BookTitleComp: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="">
      <p className="mt-2">
        An edition of{" "}
        <span className="underline italic font-bold">{book.title}</span> (
        {book.publication_date})
      </p>
      <h1 className="text-3xl md:text-5xl md:w-[10em]">{book.title}</h1>
      <p className="mt-1">
        by <span className="font-main underline">{book.publisher}</span>
      </p>
    </div>
  );
};

export default BookTitleComp;
