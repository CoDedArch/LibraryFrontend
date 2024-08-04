"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Book as BookType } from "@/app/components/types";
import LeftBookComp from "@/app/components/LeftBookComp";
import RightBookComp from "@/app/components/RightBookComp";

export default function BookDetails({ params }: { params: { id: string } }) {
    
    const [book, setBook] = useState<BookType | null>(null);
    const [loading, setLoading] = useState(true);
    

    const getBookFromDjangoAPI = async (id:string) => {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
        const data = await response.json();
        return data
    }
    useEffect(() => {
        if (params.id) {
            console.log(params.id);
            const fetchBook = async () => {
              try {
                  const bookData = await getBookFromDjangoAPI(params.id);
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
    },[params.id]);

    if (loading) return <div>Loading...</div>;
    if (!book) return <div>Book not found</div>;
    
   
    return (
        <main className="h-fit">
            <section className="relative mt-[3em] md:mt-0 md:flex bg-orange-200 md:mx-[7em] bg-opacity-25 h-fit justify-between rounded-md p-2">
                <LeftBookComp book={book}></LeftBookComp>
                <RightBookComp book={book} publisher={book.publisher }></RightBookComp>
            </section>
        </main>
    )
}