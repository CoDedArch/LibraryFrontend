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

  const toggleCloseStreamingMode = () => {
    const modeOpen = true;
    setStreamingMode(!modeOpen);
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
          <ul className="bg-blue-400 flex flex-col space-y-10">
            {book_content.map((heading) => (
              <li key={heading.heading_id}>
                <p className="font-bold text-xl">
                  <span className="font-bold">{heading.heading_id}.</span>{" "}
                  {heading.heading_name}
                </p>
                <ul className="mt-4 pl-4">
                  {heading.subheadings &&
                    heading.subheadings.map((subheading) => (
                      <li key={subheading.subheading_id}>
                        <span className="font-bold">
                          {heading.heading_id}.{subheading.subheading_id}{" "}
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
        </section>
      </main>
    </>
  );
};

export default StreamingComp;
