"use client";

// components/BookComp.tsx
import React, { use } from "react";
import Image from "next/image";
import { Book as BookType } from "./types";
import ActionsComp from "./ActionsComp";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authProvider";
import StreamingComp from "./StreamingComp";

interface BookProps {
  book: BookType;
}

const LeftBookComp: React.FC<BookProps> = ({ book }) => {
  const auth = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [rated, setIsRated] = useState(false);
  const [error, setError] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [bookpages, setbookpages] = useState([]);
  const [message, setShowMessage] = useState("");
  const [streamingMode, setStreamingMode] = useState(false);

  useEffect(() => {
    if (auth?.isAuthenticated) {
      fetchUserRating(book.id);
    }
  }, [auth?.isAuthenticated, book.id]);

  const handleStreamingMode = () => setStreamingMode(!streamingMode);

  const fetchUserRating = async (book_id: number) => {
    const user_rating_url = `/api/userrating/${book_id}`;
    const get_options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(user_rating_url, get_options);
      const responseData = await response.json();
      console.log(responseData);
      if (response.ok) {
        const userRatingValue = responseData.user_rating.user_ratings[0].value;
        setIsRated(true);
        setSelectedRating(userRatingValue);
      } else {
        console.log("It doesn't work");
      }
    } catch (error) {
      console.log("ERROR");
    }
  };
  const handleStarHover = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleRatingRequest = async (book_id: number) => {
    // api url
    const api_url = "/api/rate/";
    // this is the data to be saved in the backend
    const data = {
      bookId: book_id,
      rating: selectedRating,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(api_url, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        setShowPrompt(true);
        setShowMessage(data.message);
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      } else if (response.ok) {
        setIsRated(data.Rated);
        setShowPrompt(true);
        setShowMessage(data.message);
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
        window.location.reload();
      } else {
        setIsRated(false);
        setShowPrompt(true);
        setShowMessage(data.message);
        setTimeout(() => {
          setShowPrompt(false);
        }, 5000);
      }
    } catch (error) {}
  };

  const handleStarClick = (rating: number) => {
    // Handle saving the rating (e.g., send to the server)
    console.log(`User selected rating: ${book.id}`);
    setSelectedRating(rating);
    handleRatingRequest(book.id);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      fill={
        index < selectedRating && auth?.isAuthenticated ? "green" : "#000000"
      }
      style={{ cursor: `${auth?.isAuthenticated ? "pointer" : "not-allowed"}` }}
      width="21.87"
      height="20.801"
    >
      <path
        d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z"
        className={`${auth?.isAuthenticated ? "" : "opacity-20"}`}
        onMouseEnter={() => handleStarHover(index + 1)}
        onClick={() => handleStarClick(index + 1)}
      />
    </svg>
  ));

  const actions = [
    { img: "ask.png", action: "Inquire", alt: "ask question" },
    { img: "download.png", action: "Download", alt: "download" },
    { img: "share.png", action: "Share", alt: "share" },
  ];

  return (
    <>
      {streamingMode && (
        <StreamingComp book={book} setStreamingMode={setStreamingMode} />
      )}
      <div
        className={`absolute top-[23em] md:top-[4em] z-[20000] right-2 md:-right-[5em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 shadow-md ${
          rated && !error ? "bg-green-500" : "bg-red-400"
        } md:bg-opacity-50 ${showPrompt ? "block" : "hidden"}`}
      >
        <p>{message}</p>
      </div>
      <div className="relative top-[17em] md:static bg-blue-300 bg-opacity-10 p-2 md:w-1/5 flex flex-col items-center rounded-md border-r-2 border-2 border-black">
        <div className="h-[13em] bg-blue-400 w-[10em]">
          <Image
            src={book.cover_img}
            className="w-full h-full"
            alt={book.title}
            width={1190}
            height={30}
          />
        </div>
        <p className="font-serif mt-2">
          Genre:{" "}
          <span className="font-bold font-description">&lt;Fictional&gt;</span>
        </p>
        <button
          className="bg-green-700 bg-opacity-50 w-[9em] h-[2.5em] mt-1 rounded-md text-lg hover:bg-green-400 shadow-md hover:transition-colors font-bold"
          onClick={handleStreamingMode}
        >
          Stream
        </button>
        <form
          action=""
          className="bg-slate-400 hover:bg-slate-700 hover:text-yellow-50 hover:transition-all shadow-md bg-opacity-50 hover:cursor-pointer w-[9em] h-[2.5em] flex justify-between mt-1 rounded-md text-lg"
        >
          <span className="p-1 pl-5">want to learn</span>
          <select name="" id="" className="h-full"></select>
        </form>
        <div className="flex space-x-2 p-2 mt-2 border-b-2 border-b-black">
          {stars}
        </div>
        <div className={`flex space-x-3 mt-[2em]`}>
          {actions.map((actionItem, index) => (
            <div key={index}>
              {book.total_downloads >= 1 ? (
                <div
                  className={`bg-green-200 shadow-md font-bold ${
                    index === 1 ? "block" : "hidden"
                  } absolute h-8 w-8 text-center pt-1 border-1 border-black rounded-full md:left-28 left-[11em] top-[25em] z-[1000] md:top-[25.4em]`}
                >
                  {book.total_downloads}
                </div>
              ) : (
                ""
              )}
              <ActionsComp
                key={index}
                img={actionItem.img}
                action={actionItem.action}
                alt={actionItem.alt}
                book={book}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LeftBookComp;
