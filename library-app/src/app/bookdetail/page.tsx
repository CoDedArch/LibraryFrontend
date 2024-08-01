"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function BookDetails() {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Image key={index} src="/images/star.svg" alt="star" width={30} height={30} />
    ));
    const authoBooks = [
        { name: "To Kill a Mockingbird", author: "Harper Lee", dateOfPublication: "1960-07-11", genre: "kids" },
        { name: "1984", author: "George Orwell", dateOfPublication: "1949-06-08", genre: "kids" },
        { name: "The Great Gatsby", author: "F. Scott Fitzgerald", dateOfPublication: "1925-04-10", genre: "kids" },
    ]
    const [currentPage, setCurrentPage] = useState(0);
    const [booksPerPage, setBooksPerPage] = useState(2);
    useEffect(() => {
        const updateBooksPerPage = () => {
            setBooksPerPage(window.innerWidth < 640 ? 2 : 2);
        };
        
        updateBooksPerPage(); // Set initial value
        window.addEventListener('resize', updateBooksPerPage); // Update on resize
        
        return () => window.removeEventListener('resize', updateBooksPerPage); // Cleanup on unmount
    }, []);
    
    const totalPages = Math.ceil(authoBooks.length / booksPerPage);
    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);};
    
    const handlePrev = () => {
          setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };
    const startIndex = currentPage * booksPerPage;
    const selectedBooks = authoBooks.slice(startIndex, startIndex + booksPerPage);
    
    return (
        <main className="h-fit">
            <section className="mt-[3em] md:mt-0 md:flex bg-orange-200 md:mx-[7em] bg-opacity-25 h-fit justify-between rounded-md p-2">
                <div className="hidden bg-blue-300 bg-opacity-10 p-2 w-1/5 md:flex flex-col items-center rounded-md border-r-2 border-2 border-black">
                    <div className="h-[13em] bg-blue-400 w-[10em]">book image</div>
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
                    <div className="flex space-x-3 mt-[2em]">
                        <div>
                            <p className="flex justify-center"><Image src="/images/ask.png" alt="star" width={30} height={30} /></p>
                            <p>Inquire</p>
                        </div>
                        <div>
                            <p className="flex justify-center"><Image src="/images/download.png" alt="star" width={30} height={30} /></p>
                            <p>Download</p>
                        </div>
                        <div>
                            <p className="flex justify-center"><Image src="/images/share.png" alt="star" width={30} height={30} /></p>
                            <p>Share</p>
                        </div>

                    </div>
                </div>
                <div className="w-full flex flex-col pb-3 pl-2">
                    <ul className="flex space-x-7 justify-center border-b-2 border-b-black">
                        <li className="w-[10em] text-center py-2 bg-green-300 bg-opacity-15 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Overview</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Details</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Inquiries</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Related Books</li>
                    </ul>
                    <p className="mt-2">An edition of <span className="underline italic font-bold">El hombre mas rico de Babilonia</span> (2014)</p>
                    <h1 className="text-5xl w-[10em]">El hombre mas rico de Babilonia</h1>
                    <p className="mt-1">by <span className="font-main underline">Kelvin CoDed</span></p>
                    <div className="mt-[3em]">
                        <ul className="flex space-x-3">
                            <li className="flex"><Image src="/images/star2.png" alt="star" width={30} height={30} /><span className="pl-2  mt-1 font-bold">5.0</span></li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> 10 ratings</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> 180 want to read</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> 2 currently reading</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> 20 have read</li>
                        </ul>
                    </div>
                    <div className="mt-[2em]">
                        <ul className="flex space-x-3 justify-center">
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Published date</p>
                                <p>Dec 12, 2014</p>
                            </li>
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Publisher</p>
                                <p>Kelvin CoDed</p>
                            </li>
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Pages</p>
                                <p>312</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-[1em]">
                        <p className="p-4 text-2xl border-b-2 border-b-black">Book Details</p>
                        <p className="pl-4 font-title text-lg">edition notes</p>
                        <p className="pl-7 font-title text-lg">Source Title:<span className="italic font-bold"> El hombre mas rico de Babilonia</span> (2014)</p>
                        <p className="pl-4 font-title text-lg mt-[1em]">The Physical Object</p>
                        <p className="pl-7"><span>Format</span><span className="ml-5">paperback</span></p>
                        <p className="pl-7">number of pages: <span className="font-bold ml-7">312</span> </p>
                        <p className="pl-4 font-title text-lg mt-[1em]">ID Numbers</p>
                        <p className="pl-7">Let&apos;s learn:<span className="font-bold ml-3">OL35824630M</span> </p>
                        <p className="pl-7">ISBN 10:<span className="font-bold ml-7">1505355494</span> </p>
                        <p className="pl-7">ISBN 13:<span className="font-bold ml-7">9781505355499</span> </p>
                    </div>
                    <div className="mt-[2em]">
                        <p className="font-light text-2xl">More Books by this Author</p>
                        <div className="flex space-x-2 md:space-x-10 justify-center">
                            {/* More books from the author */}
                            <div className="flex space-x-4 justify-center">
                                <div className="flex flex-col justify-center mr-10">
                                    <button onClick={handlePrev}><Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30} /></button>
                                </div>
                                <div className="flex space-x-2 md:space-x-10">
                                    {
                                    selectedBooks.map((book, b_index) => (
                                        <div key={b_index} className="bg-yellow-300 w-[8em] md:w-[10em] shadow-2xl flex flex-col justify-end md:block max-h-[16em] md:max-h-none">
                                        <p className="h-[13em] max-h-[13em] md:w-[10em] bg-blue-400">img</p>
                                        <p className="font-projects pl-2">{ book.name}</p>
                                        <p className="font-title pl-2">{ book.author}</p>
                                        <p className="flex justify-end pr-1">{ book.dateOfPublication}</p>
                                        </div>
                                        ))
                                    }
                                    <div className="flex flex-col justify-center">
                                    <button onClick={handleNext}><Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}