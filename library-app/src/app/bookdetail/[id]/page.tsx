"use client";

import { useEffect, useState } from "react";
import { Book as BookType } from "@/app/components/types";
import LeftBookComp from "@/app/components/LeftBookComp";
import RightBookComp from "@/app/components/RightBookComp";
import HeaderComp from "@/app/components/HeaderComp";

// This page presents the details of a book
export default function BookDetails({ params }: { params: { id: string } }) {
  // manage the state of a book
  const [book, setBook] = useState<BookType | null>(null);
  // manage the time it take to fetch data
  const [loading, setLoading] = useState(true);

  // make a requst to backend server to get the details the book using it's id
  const getBookFromDjangoAPI = async (id: string) => {
    const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
    const data = await response.json();
    // return the book data
    return data;
  };
  useEffect(() => {
    if (params.id) {
      // fetch the book data
      const fetchBook = async () => {
        try {
          const bookData = await getBookFromDjangoAPI(params.id);
          //   set the state of the book to book data return from the server
          setBook(bookData);
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
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <>
      <HeaderComp></HeaderComp>
      <main className="h-fit bg-stylish-500 pb-[5em]">
        <section className="relative mt-[7em] md:mt-[7em] md:flex bg-white-100 md:mx-[7em] h-fit justify-between rounded-md p-2">
          <LeftBookComp book={book}></LeftBookComp>
          <RightBookComp book={book} publisher={book.publisher}></RightBookComp>
        </section>
      </main>
    </>
  );
}
