"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Book as BookType } from "@/app/components/types";
import BookComp from "@/app/components/BookComp";

export default function BookDetails({ params }: { params: {id:string} }) {
    const stars = Array.from({ length: 5 }, (_, index) => (
        <Image key={index} src="/images/star.svg" alt="star" width={30} height={30} />
    ));

    const [book, setBook] = useState<BookType | null>(null);
    const [authorBooks, setAuthorBooks] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [booksPerPage, setBooksPerPage] = useState(2);

    const getBookFromDjangoAPI = async (id:string) => {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
        const data = await response.json();
        return data
    }
    const getBooksByAuthor = async (publisher: string) => {
        const response = await fetch(`http://127.0.0.1:8000/api/books/publisher/${publisher}`);
        const data = await response.json();
        return data;
    };
    useEffect(() => {
        if (params.id) {
            console.log(params.id);
            const fetchBook = async () => {
              try {
                  const bookData = await getBookFromDjangoAPI(params.id);
                  setBook(bookData);
                  const authorBooksData = await getBooksByAuthor(bookData.publisher);
                  setAuthorBooks(authorBooksData);
              } catch (error) {
                console.error("Error retrieving this Book", error);
              } finally {
                setLoading(false);
              }
            };
            fetchBook();
        } else {
            setLoading(false);
        }

        const updateBooksPerPage = () => {
            setBooksPerPage(window.innerWidth < 640 ? 2 : 2);
        };
        
        updateBooksPerPage(); // Set initial value
        window.addEventListener('resize', updateBooksPerPage); // Update on resize
        
        return () => window.removeEventListener('resize', updateBooksPerPage); // Cleanup on unmount
    },[params.id]);

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Book not found</div>;
    
    const totalPages = Math.ceil(authorBooks.length / booksPerPage);
    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);};
    
    const handlePrev = () => {
          setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };
    const startIndex = currentPage * booksPerPage;
    const selectedBooks = Array.isArray(authorBooks) ? authorBooks.slice(startIndex, startIndex + booksPerPage) : [];
    return (
        <main className="h-fit">
            <section className="relative mt-[3em] md:mt-0 md:flex bg-orange-200 md:mx-[7em] bg-opacity-25 h-fit justify-between rounded-md p-2">
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
                <div className="relative -top-[31em] md:static w-full flex flex-col pb-3 pl-2">
                    <ul className="flex space-x-7 justify-center border-b-2 border-b-black">
                        <li className="w-[10em] text-center py-2 bg-green-300 bg-opacity-15 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Overview</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Details</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Inquiries</li>
                        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all md:h-[2.5em] h-[3.5em] rounded-md">Related Books</li>
                    </ul>
                    <p className="mt-2">An edition of <span className="underline italic font-bold">{book.title}</span> ({ book.publication_date})</p>
                    <h1 className="text-3xl md:text-5xl md:w-[10em]">{book.title}</h1>
                    <p className="mt-1">by <span className="font-main underline">{book.publisher}</span></p>
                    <div className="mt-[38em] md:mt-[3em]">
                        <ul className="flex space-x-3">
                            <li className="absolute top-[13em] md:static flex"><Image src="/images/star2.png" alt="star" width={30} height={30} /><span className="pl-2  mt-1 font-bold">{book.average_rating}</span></li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.number_of_ratings} ratings</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> { book.want_to } want to read</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.readers_currently_reading} currently reading</li>
                            <li className="border-l-2 border-l-black mt-1 pl-2"> {book.readers_finished_reading} have read</li>
                        </ul>
                    </div>
                    <div className="mt-[2em]">
                        <ul className="flex space-x-3 justify-center">
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Published date</p>
                                <p>{book.publication_date}</p>
                            </li>
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Publisher</p>
                                <p>{book.publisher}</p>
                            </li>
                            <li className="bg-slate-500 bg-opacity-20 h-[8em] w-[12em] text-center border-2 border-black">
                                <p className="text-orange-500">Pages</p>
                                <p>{book.no_pages}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-[1em]">
                        <p className="p-4 text-2xl border-b-2 border-b-black">Book Details</p>
                        <p className="pl-4 font-title text-lg">edition notes</p>
                        <p className="pl-7 font-title text-lg">Source Title:<span className="italic font-bold"> {book.title}</span> ({book.publication_date})</p>
                        <p className="pl-4 font-title text-lg mt-[1em]">The Physical Object</p>
                        <p className="pl-7"><span>Format</span><span className="ml-5">paperback</span></p>
                        <p className="pl-7">number of pages: <span className="font-bold ml-7">{book.no_pages }</span> </p>
                        <p className="pl-4 font-title text-lg mt-[1em]">ID Numbers</p>
                        <p className="pl-7">Let&apos;s learn:<span className="font-bold ml-3">{book.LibraryId}</span> </p>
                        <p className="pl-7">ISBN 10:<span className="font-bold ml-7">{book.isbn10}</span> </p>
                        <p className="pl-7">ISBN 13:<span className="font-bold ml-7">{book.isbn13}</span> </p>
                    </div>
                    <div className="mt-[2em]">
                        <p className="font-light text-2xl">More Books by this Author</p>
                        <div className="flex space-x-2 md:space-x-10 justify-center mt-[2em]">
                            {/* More books from the author */}
                            <div className="flex justify-center">
                                <div className="flex flex-col justify-center mr-10">
                                    { 
                                        totalPages > 1 && (
                                            <button onClick={handlePrev}><Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30} /></button>
                                        )
                                    }
                                </div>
                                <div className="flex space-x-2 md:space-x-10">
                                        {
                                        selectedBooks.map((authorbook) => (
                                            <BookComp key={authorbook.id} book={authorbook} />
                                        ))
                                        }
                                </div>
                                <div className="flex flex-col justify-center ml-10">
                                    {
                                        totalPages > 1 && (
                                            <button onClick={handleNext}><Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}