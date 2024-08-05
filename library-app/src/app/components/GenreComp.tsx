// components/GenreCompo.tsx
import React from 'react';
import { Genre, Book } from './types';
import { useEffect, useState } from 'react';
import BookComp from './BookComp';
import Image from 'next/image';

interface GenreProps {
  genre: Genre;
}
const GenreCompo: React.FC<GenreProps> = ({ genre }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    // manage the books to display per page
    const [booksPerPage, setBooksPerPage] = useState(2);
    useEffect(() => {
        const updateBooksPerPage = () => {
            setBooksPerPage(window.innerWidth < 640 ? 2 : 5);
        };
    //  fetch all the books in the database related to a particular genre
        const fetchBooks = async () => {
          const response = await fetch(`http://127.0.0.1:8000/api/books/books/genre/${genre.id}`);
          const data = await response.json();
          setBooks(data);
        };
        updateBooksPerPage(); // Set initial value
        window.addEventListener('resize', updateBooksPerPage);
        fetchBooks();
        return () => window.removeEventListener('resize', updateBooksPerPage);
    }, [genre.id]);
    
    const totalPages = Math.ceil(books.length / booksPerPage);
    
    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);};
    
    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
      };
    
    const startIndex = currentPage * booksPerPage;
    const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);
    return (
        <section key={genre.id} className="mt-[3em]">
            <p className="p-2 font-title text-2xl">{genre.genre}</p>
            <div className="flex justify-center relative">
            { 
                totalPages > 1 && (
                    <button onClick={handlePrev}>
                        <Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em] relative -left-2 md:-left-[70px]" width={70} height={30} />
                    </button>
                )
            } 
            <div className="flex space-x-2 md:space-x-10">
                {
                    selectedBooks.map((book) => (
                        <BookComp key={book.id} book={book} />
                    ))
                }
            </div>
            {
                totalPages > 1 && (
                    <button onClick={handleNext}>
                        <Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em] relative -right-2 md:-right-[70px]" width={70} height={30} />
                    </button>    
                ) 
            }
        </div>
    </section>
  );
};

export default GenreCompo;
