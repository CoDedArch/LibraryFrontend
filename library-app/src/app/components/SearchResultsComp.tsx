// components/BookComp.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SearchProps {
  search_query: string;
  toggleSearchResults: (mode: boolean) => void;
}

const SEARCH_LINK = "/api/search";
const SearchResultsComp: React.FC<SearchProps> = ({
  search_query,
  toggleSearchResults,
}) => {
  const [booksList, setBooksList] = useState([{
    id: "",
    title: "",
    cover_img: ""
  }]);
  const [notFound, setNotFound] = useState("");

  const getUserInfoDjangoAPI = async () => {
    const response = await fetch(`${SEARCH_LINK}?q=${search_query}`);
    const search_result = await response.json();
    if (response.ok) {
      return search_result["content"];
    } else if (response.status == 500) {
      return search_result["message"]["detail"];
    }
    // return the book data
  };
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksListResponse = await getUserInfoDjangoAPI();
        //   set the state of the book to book data return from the server
        if (typeof booksListResponse === "string") {
          setNotFound(booksListResponse);
        } else setBooksList(booksListResponse);
      } catch (error) {
        console.error("Error retrieving this Book", error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      <div
        onClick={() => toggleSearchResults(false)}
        className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-25 z-10"
        // onClick={() => setShowMenu(false)}
      ></div>
      <section className="absolute flex flex-col items-center top-[5em] right-[26em] text-stylish-400 shadow-2xl bg-white-100 w-[30em] h-fit z-[10000] rounded-lg">
        <p className="text-center underline">Search results</p>
        {booksList && notFound ? (<p className="p-10 text-center text-slate-400">{notFound}</p>) :(<div className="flex flex-col justify-center items-center space-y-6">
          {
            booksList.map((book, book_index) => (
              <Link key={book_index} href={`/bookdetail/${book.id}`} className="flex bg-yellow-300 p-4 space-x-4 bg-opacity-10">
              <div className="flex flex-col justify-center">
                {book.title}
              </div>
              <Image src={book.cover_img} alt="book img" className="w-[4em]" width={3000} height={30} /></Link>
            ))
          }
        </div>)}
      </section>
    </>
  );
};

export default SearchResultsComp;
