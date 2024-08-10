// components/BookComp.tsx
import React from 'react';
import Image from 'next/image';
import { Book as BookType } from './types';
import BookHeaderComp from './BookHeaderComp';
import BookTitleComp from './BookTitleComp';
import StatsComp from './StatsComp';
import InfoComp from './InfoComp';
import BookComp from './BookComp';
import { useState, useEffect } from 'react';

interface RightBookCompProps {
    book: BookType;
    publisher: string
}

const RightBookComp: React.FC<RightBookCompProps> = ({ book, publisher }) => {
    const [booksPerPage, setBooksPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(0);
    const [authorBooks, setAuthorBooks] = useState<BookType[]>([]);
    const [loading, setLoading] = useState(true);

    const access = [
        "publication_date", "publisher", "no_pages"
    ]
    const info_titles= [
        "Published date", "Publisher", "Pages"
    ]

    const getBooksByAuthor = async (publisher_name:string) => {
        const response = await fetch(`http://127.0.0.1:8000/api/books/publisher/${publisher_name}`);
        const data = await response.json();
        return data;
    };

    useEffect(() => {
        if (publisher) {
            const fetchBook = async () => {
            try {
                  const authorBooksData = await getBooksByAuthor(publisher);
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
    },[publisher]);

    const totalPages = Math.ceil(authorBooks.length / booksPerPage);
    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };
    
    const handlePrev = () => {
          setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };
    const startIndex = currentPage * booksPerPage;
    const selectedBooks = Array.isArray(authorBooks) ? authorBooks.slice(startIndex, startIndex + booksPerPage) : [];

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Book not found</div>;

  return (
    <div className="relative -top-[31em] md:static w-full flex flex-col pb-3 pl-2">
    <BookHeaderComp></BookHeaderComp>
    <div id="Overview">
        <BookTitleComp book={book}></BookTitleComp>
        <StatsComp book={book}></StatsComp> 
    </div>
    {/* Displays Some Info about the Book */}
    <div className="mt-[2em]">
        <ul className="flex space-x-3 justify-center">
        {info_titles.map((info_title, info_index) => (
        <InfoComp
            key={info_index}
            info_title={info_title}
            info = {access[info_index]}    
            book={book}
            />
        ))}
        </ul>
    </div>
    {/* This section displays the details of a book */}
    <div className="mt-[1em]" id="Details">
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
    {/* This Section displays the Books related to an Author */}
    <div className="mt-[2em]" id="Related">
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
  );
};

export default RightBookComp;
