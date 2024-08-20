"use client";

// components/BookComp.tsx
import React, { use } from "react";
import { Book as BookType } from "./types";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authProvider";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

interface BookProps {
  book: BookType;
  setStreamingMode: (mode: boolean) => void;
}

const Box = styled.div`
  width: 50px; /* Adjust the width as desired */
  height: 50px; /* Equal height to make it a square */
  background-color: #f0f0f0; /* Set your preferred background color */
  text-align: center;
  padding: 10px 0;
  border: 3px solid green;
`;

const Slider = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 12px;
  border-radius: 40px;
  background: ${(props) =>
    `linear-gradient(to right, #ff9800 0%, #ff9800 ${props.value}%, #fff ${props.value}%, #fff 100%);`};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }

  ::-moz-range-thumb {
    width: 24px;
    height: 24px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
`;

const StreamingComp: React.FC<BookProps> = ({ book, setStreamingMode }) => {
  const auth = useAuth();
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState(false);
  const [message, setShowMessage] = useState("");
  const [book_content, setBookContent] = useState([{}]);
  const [current_page, setCurrentPage] = useState(-1);
  const [currentContent, setCurrentContent] = useState({});
  const [heading_to_highlight, setHeadingToHighlight] = useState(false);
  // value for font size
  const [value, setValue] = useState(14);

  // font family
  const [font_family, setFontFamily] = useState("")

  // an array of font families a Reader can choose From
  const font_families = [
    {
      name: "None",
      value: "font-normal",
    },
    {
      name: "Sans",
      value: "font-sans",
    },
    {
      name: "Serif",
      value: "font-serif",
    },
    {
      name: "Monospace",
      value: "font-mono",
    },
    {
      name: "Dailymirror",
      value: "font-title",
    },
    {
      name: "Oswald",
      value: "font-projects",
    },
    {
      name: "Montserrat",
      value: "font-body",
    },
    {
      name: "Sail",
      value: "font-quote",
    },
  ];
  // Exit Streaming Mode
  const toggleCloseStreamingMode = () => {
    const modeOpen = true;
    setStreamingMode(!modeOpen);
  };

  // navigate to the next page of this book
  const NavigateToNextPage = () => {
    setCurrentPage(current_page + 1);
    setCurrentContent(book_content[current_page + 1]);
    setHeadingToHighlight(true);
  };
  // Navigate back to the previous page of this book
  const NavigateToPreviousPage = () => {
    setCurrentPage(current_page - 1);
    setCurrentContent(book_content[current_page - 1]);
  };

  // fetch the book content from server when in streaming Mode
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
    // call streaming mode
    handleBookStreaming();
  }, [book.id]);
  return (
    <>
      {/* An Error Message to prompt the user if something goes wrong */}

      <div
        className={`absolute top-[23em] md:top-[4em] z-[20000] right-2 md:-right-[5em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 shadow-md ${
          !error ? "bg-green-500" : "bg-red-400"
        } md:bg-opacity-50 ${showPrompt ? "block" : "hidden"}`}
      >
        <p>{message}</p>
      </div>
      {/* The Main content of the book goes here */}
      <main className="absolute flex space-x-3 -top-[4.5em] -left-[6.8em] -right-[6.8em] inset-0 to z-[10000]">
        {/* This section displays the Table Of content to the Reader */}
        <section className="w-1/4 bg-white relative">
          <div className="fixed  w-[18em] p-4">
            <p className="text-center underline font-bold text-3xl italic">
              Table of Content
            </p>
            <ul className="flex flex-col space-y-10 mt-10">
              {/* Loop through each Heading of the book */}
              {book_content.map((heading) => (
                <li key={heading.heading_id}>
                  {/* Display the heading name */}
                  <p
                    className={`font-bold text-xl ${
                      // Highlight the heading green if the current content the reader is reading is the heading.
                      heading_to_highlight &&
                      current_page + 1 === heading.heading_id
                        ? "text-green-600"
                        : ""
                    }`}
                  >
                    <span className="font-bold">{heading.heading_id}.</span>{" "}
                    {heading.heading_name}
                  </p>
                  <ul className="mt-4 pl-4">
                    {/* Loop through the subheadings of the current heading and display it's content as well */}
                    {heading.subheadings &&
                      heading.subheadings.map((subheading, index) => (
                        <li
                          className="hover:bg-green-600 hover:bg-opacity-10 mt-2"
                          key={subheading.subheading_id}
                        >
                          <span className="font-bold">
                            {heading.heading_id}.{index + 1}{" "}
                          </span>
                          {/* if the reader is reading this heading, reader can navigate easily to subheadings */}
                          <Link href={`#${subheading.subheading_id}`}>
                            {subheading.subheading_name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* This section Displays the actual content of the book and some settings related to the content */}
        <section className={`w-full ${value > 27 ? "h-fit" : ""} bg-green-200 bg-opacity-80`}>
          <div className="relative flex bg-white bg-opacity-90 justify-end border-t-4 border-t-black">
            {/* Settings Menu to help reader adjust prefrence */}
            <div className="bg-blue-500 absolute top-12 w-[20em] h-[40em] z-[1000] border-2 shadow-2xl border-black rounded-md">
              <p className="text-center font-light font-mono text-2xl border-b-2 p-1 shadow-2xl">
                SETTINGS
              </p>
              <p className="p-2 font-title">
                Modify how text, font sizes and colors appear to suit your
                prefrence.
              </p>
              <div className="bg-yellow-50 p-2">
                {/* text related settings */}
                <p className="font-mono text-lg mb-5 border-b-2 border-b-black">
                  Text Related
                </p>
                {/* font size */}
                <p className="ml-1 mr-2 font-about text-center">
                  font size{" "}
                  <span className="font-title block  text-red-600">
                    adjust the slider to prefered font size
                  </span>
                </p>

                {/* Group Styled objects */}
                <div className="flex justify-between">
                  {/* A Slider component */}
                  <div className="p-3">
                    <Slider
                      value={value}
                      // assign the value of the slider to the state variable
                      onChange={(e) => setValue(parseInt(e.target.value))}
                    />
                  </div>
                  <Box>{value}px</Box>
                </div>
                {/* font family for user to choose which fonts they want to apply */}
                <div className="mt-6">
                  <p className="text-center">font family</p>
                  <div className="text-2xl bg-blue-600 font-title flex flex-wrap space-x-6">
                    {font_families.map((font) => (
                      <label key={font.value}>
                        <input
                          type="radio"
                          name="fontFamily"
                          value={font.value}
                          
                          // Handle the onChange event to capture the selected value
                          onChange={(e) =>
                            setFontFamily(e.target.value)
                          }
                        />
                        {font.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* This div displays the readers progress through the book */}
            <div className="p-2 flex absolute left-2 -top-1">
              <div className="relative flex">
                <Image
                  src="/images/completed.svg"
                  className="w-[3em]"
                  alt="tracker"
                  width={400}
                  height={60}
                />
                {/* progress in terms of percentage */}
                <div className="bg-slate-300 rounded-full h-[2em] w-16 text-center border-2 border-black font-bold">
                  100%
                </div>
              </div>
              {/* Notebook, to Help Readers Jot down Notes */}
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
                className="w-[2em] bg-red-400 shadow-md hover:w-[2.4em] hover:shadow-red-600 hover:transition-all rounded-full"
                title="Close"
                alt="settings"
                width={700}
                height={60}
                onClick={toggleCloseStreamingMode}
              />
            </div>
          </div>
          {/* Keep track of the Reader time to stop reading */}
          <div className="text-center border-b-4 bg-white pt-4 border-b-black">
            <span className="text-green-600 font-bold">Time Started:</span>{" "}
            <span className="italic">8 am</span> to{" "}
            <span className="text-orange-600 font-bold">End Time:</span>{" "}
            <span className="italic">not specified</span>
          </div>

          {/* The actual content area */}
          <article className="relative">
            {/* Display the left arrow if current page is not the cover page */}
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
            {/* Don't Display the right arrow if current page is the last page */}
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
                  <ul className="mt-4 bg-white w-[20em] text-center rounded-md">
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
                // set the font size prefrence by the reader
                <article className={`bg-yellow-50 border-x-2 border-x-black px-2 mx-[5em] flex flex-col items-center`}
                  style={{fontSize: value !== 14 ? `${value}px` : ""}}
                >
                  <p className={`text-center p-4 ${value > 20 ? "text-4xl" :"text-3xl" } font-bold`}>
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
                    className="flex flex-col items-center my-10 "
                    id={`${subheading.subheading_id}`}
                  >
                    <p className={`mb-5 underline ${value > 20 ? "text-4xl": "text-2xl"} `}>
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
