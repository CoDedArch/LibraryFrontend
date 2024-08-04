// components/BookComp.tsx
import React from 'react';
import Image from 'next/image';
import { Book as BookType } from './types';
import ActionsComp from './ActionsComp';

interface BookProps {
    book: BookType;
}

const LeftBookComp: React.FC<BookProps> = ({ book }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Image key={index} src="/images/star.svg" alt="star" width={30} height={30} />
    ));

    const actions = [
        { "img": "ask.png", "action": "Inquire", "alt":"ask question"},
        { "img": "download.png", "action": "Download", "alt": "download" },
        {"img": "share.png", "action": "Share", "alt": "share"}
    ]

  return (
    <div className="relative top-[17em] md:static bg-blue-300 bg-opacity-10 p-2 md:w-1/5 flex flex-col items-center rounded-md border-r-2 border-2 border-black">
    <div className="h-[13em] bg-blue-400 w-[10em]">
        <Image src={book.cover_img} className="w-full h-full" alt={book.title} width={1190} height={30}/>
    </div>
    <p className="font-serif mt-2">Genre: <span className="font-bold font-description">&lt;Fictional&gt;</span></p>
    <button className="bg-green-700 bg-opacity-50 w-[9em] h-[2.5em] mt-1 rounded-md text-lg">
        Stream
    </button>
    <form action="" className="bg-slate-400 bg-opacity-50 hover:cursor-pointer w-[9em] h-[2.5em] flex justify-between mt-1 rounded-md text-lg">
        <span className="p-1 pl-5">want to learn</span>
        <select name="" id="" className="h-full">

        </select>
    </form>
    <div className="flex space-x-2 p-2 mt-2 border-b-2 border-b-black">
        {stars}
    </div>
    <div className={`flex space-x-3 mt-[2em]`}>
    {actions.map((actionItem, index) => (
        <ActionsComp
            key={index}
            img={actionItem.img}
            action={actionItem.action}
            alt={actionItem.alt}
            book={book}
            />
        ))}
    </div>
</div>
  );
};

export default LeftBookComp;
