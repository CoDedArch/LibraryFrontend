"use client";

// components/BookComp.tsx
import React, { use } from "react";
import { Book as BookType } from "./types";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authProvider";
import Image from "next/image";

interface BookProps {
  book: BookType;
  setStreamingMode: (mode: boolean) => void;
}

const StreamingComp: React.FC<BookProps> = ({ book, setStreamingMode }) => {
  const auth = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(false);
  const [message, setShowMessage] = useState("");
  const [book_content, setBookContent] = useState([{}]);
  const [current_page, setCurrentPage] = useState(-1);
  const [currentContent, setCurrentContent] = useState({});
  const [heading_to_highlight, setHeadingToHighlight] = useState(0);

  const toggleCloseStreamingMode = () => {
    const modeOpen = true;
    setStreamingMode(!modeOpen);
  };

  const NavigateToNextPage = () => {
    setCurrentPage(current_page + 1);
    setCurrentContent(book_content[current_page + 1]);
    setHeadingToHighlight(current_page + 1);
  };
  const NavigateToPreviousPage = () => {
    setCurrentPage(current_page - 1);
    setCurrentContent(book_content[current_page - 1]);
  };

  const handleBookStreaming = async () => {
    const url_to_pages_route = "/api/bookPages/";
    const options = {
      methods: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const response = await fetch(`${url_to_pages_route}${book.id}`, options);
      const routeData = await response.json();
      if (response.ok) {
        setStreamingMode(true);
        setBookContent(routeData.content);
        console.log(`book content is : ${book_content}`);
      } else {
        setError(true);
        setShowPrompt(true);
        setShowMessage(routeData.message);
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      }
    } catch (error) {
      setShowPrompt(true);
      setError(true);
      setShowMessage("Internal Server Error, try checking after sometime");
      setTimeout(() => {
        setShowPrompt(false);
      }, 5000);
    }
  };
  useEffect(() => {
    handleBookStreaming();
  }, [book.id]);
  return (
    <>
      <div
        className={`absolute top-[23em] md:top-[4em] z-[20000] right-2 md:-right-[5em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 shadow-md ${
          !error ? "bg-green-500" : "bg-red-400"
        } md:bg-opacity-50 ${showPrompt ? "block" : "hidden"}`}
      >
        <p>{message}</p>
      </div>
      <main className="absolute flex space-x-3 -top-[4.5em] -left-[6.8em] -right-[6.8em] inset-0 to bg-blue-500 z-[10000]">
        <section className="w-1/4 bg-yellow-100 p-4">
          <p className="text-center underline font-bold text-3xl italic">
            Table of Content
          </p>
          <ul className="bg-blue-400 flex flex-col space-y-10 mt-10">
            {book_content.map((heading) => (
              <li key={heading.heading_id}>
                <p className="font-bold text-xl">
                  <span className="font-bold">{heading.heading_id}.</span>{" "}
                  {heading.heading_name}
                </p>
                <ul className="mt-4 pl-4">
                  {heading.subheadings &&
                    heading.subheadings.map((subheading, index) => (
                      <li key={subheading.subheading_id}>
                        <span className="font-bold">
                          {heading.heading_id}.{index + 1}{" "}
                        </span>
                        {subheading.subheading_name}
                      </li>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="w-full bg-green-200">
          <div className="relative flex bg-yellow-200 justify-end">
            <div className="p-2 flex absolute left-2 -top-1">
              <div className="relative flex">
                <Image
                  src="/images/completed.svg"
                  className="w-[3em]"
                  alt="tracker"
                  width={400}
                  height={60}
                />
                <div className="bg-slate-300 rounded-full h-[2em] w-16 text-center border-2 border-black font-bold">
                  100%
                </div>
              </div>
              <div className="flex  ml-[30em]">
                <span className="font-bold p-3">write notes</span>
                <Image
                  src="/images/notes.png"
                  className="w-[3em]"
                  alt="tracker"
                  width={400}
                  height={60}
                />
              </div>
            </div>
            <div className="flex space-x-2 p-2">
              <Image
                src="/images/setting.png"
                className="w-[2em]"
                title="settings"
                alt="settings"
                width={700}
                height={60}
              />
              <Image
                src="/images/close.png"
                className="w-[2em] bg-emerald-100 shadow-md hover:w-[2.4em] hover:shadow-red-600 hover:transition-all rounded-full"
                title="Close"
                alt="settings"
                width={700}
                height={60}
                onClick={toggleCloseStreamingMode}
              />
            </div>
          </div>
          <div className="text-center border-b-4 border-b-black">
            <span className="text-green-600 font-bold">Time Started:</span>{" "}
            <span className="italic">8 am</span> to{" "}
            <span className="text-orange-600 font-bold">End Time:</span>{" "}
            <span className="italic">not specified</span>
          </div>
          <article className="relative">
            {current_page >= 0 && (
              <Image
                src="/images/left.svg"
                alt="left"
                title="previous chapter"
                className="w-[3.5em] bg-white border-2 border-green-600 fixed top-[50%] hover:w-[4em] hover:transition-all"
                width={150}
                height={60}
                onClick={NavigateToPreviousPage}
              />
            )}
            {current_page < book_content.length - 1 && (
              <Image
                src="/images/right.svg"
                alt="left"
                title="next chapter"
                className="w-[4em] bg-white border-2 border-green-600 fixed right-1 top-[50%] hover:w-[4.4em] hover:transition-all"
                width={150}
                height={60}
                onClick={NavigateToNextPage}
              />
            )}
            {current_page === -1 ? (
              <>
                <div className="p-3 text-3xl text-center font-bold">
                  {book.title}
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-500 w-[30em] h-[50em]">
                    <Image
                      src={book.cover_img}
                      alt="book cover page"
                      className="w-full h-full"
                      width={150000}
                      height={60000}
                    />
                  </div>
                  <ul className="mt-4">
                    <li className="font-bold">
                      <span className="italic font-light text-xl">
                        Written By:{" "}
                      </span>
                      {book.publisher}
                    </li>
                    <li className="font-bold">
                      <span className="italic font-light text-xl">
                        published on:{" "}
                      </span>
                      {book.publication_date}
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <article className="bg-yellow-50 mx-[5em] flex flex-col items-center">
                <p className="text-center p-4 text-3xl font-bold">
                  {currentContent.heading_name}
                </p>
                {currentContent.heading_content && (
                  <p className="my-10">{currentContent.heading_content}</p>
                )}
                {currentContent.heading_image && (
                  <Image
                    src={currentContent.heading_image}
                    alt="image"
                    width={400}
                    height={100}
                  />
                )}
                {currentContent.subheadings.map((subheading) => (
                  <div
                    key={subheading.subheading_id}
                    className="flex flex-col items-center my-10"
                  >
                    <p className="mb-5 underline text-2xl">
                      {subheading.subheading_name}
                    </p>
                    {subheading.subheading_content && (
                      <p className="mb-2">{subheading.subheading_content}</p>
                    )}
                    {subheading.subheading_image && (
                      <Image
                        src={subheading.subheading_image}
                        alt="image"
                        width={400}
                        height={100}
                      />
                    )}
                  </div>
                ))}
              </article>
            )}
          </article>
        </section>
      </main>
    </>
  );
};

export default StreamingComp;
