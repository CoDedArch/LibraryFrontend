// components/BookComp.tsx
import React from 'react';
import Image from 'next/image';
import { Book as BookType } from './types';
import Link from 'next/link';

interface BookProps {
    book: BookType;
}

const StatsComp: React.FC<BookProps> = ({ book }) => {
    
  return (
    <div className="mt-[38em] md:mt-[3em]">
        <ul className="flex space-x-3">
            <li className="absolute top-[13em] md:static flex"><Image src="/images/star2.png" alt="star" width={30} height={30} /><span className="pl-2  mt-1 font-bold">{book.average_rating}</span></li>
            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.number_of_ratings} ratings</li>
            <li className="border-l-2 border-l-black mt-1 pl-2"> { book.want_to } want to read</li>
            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.readers_currently_reading} currently reading</li>
            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.readers_finished_reading} have read</li>
        </ul>
    </div>
  );
};

export default StatsComp;
