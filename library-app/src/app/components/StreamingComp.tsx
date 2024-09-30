"use client";

// components/BookComp.tsx
import React, { use } from "react";
import { Book as BookType } from "./types";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authProvider";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { Heading } from "./types";
import { useRef } from "react";



interface BookProps {
  book: BookType;
  setStreamingMode: (mode: boolean) => void;
}

// structure for how subheadings are modelled

const Box = styled.div`
  width: 50px; /* Adjust the width as desired */
  height: 50px; /* Equal height to make it a square */
  background-color: #f0f0f0; /* Set your preferred background color */
  text-align: center;
  padding: 10px 0;
  border: 3px solid green;
`;

const Circle = styled.div`
  width: 50px; /* Adjust the size as desired */
  height: 50px; /* Equal height to maintain the circle shape */
  text-align: center;
  padding: 10px 0;
  border: 3px solid green;
  border-radius: 50%; /* Turn the square into a circle! */
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

const Volume = styled.input.attrs({ type: "range" })`
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
  const [book_content, setBookContent] = useState<Heading[]>([
    {
      heading_id: 0,
      heading_name: "",
      heading_content: "",
      heading_image: "",
      subheadings: [
        {
          subheading_id: 0,
          subheading_name: "",
          subheading_content: "",
          subheading_image: "",
        },
      ],
    },
  ]);
  const [currentContent, setCurrentContent] = useState<Heading>({
    heading_id: 0,
    heading_name: "",
    heading_content: "",
    heading_image: "",
    subheadings: [
      {
        subheading_id: 0,
        subheading_name: "",
        subheading_content: "",
        subheading_image: "",
      },
    ],
  });
  const [current_page, setCurrentPage] = useState(-1);
  const [heading_to_highlight, setHeadingToHighlight] = useState(false);
  const [show_menu, setShowMenu] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const [audioSrc, setAudioSrc] = useState<string>("");
  // value for font size

  const [value, setValue] = useState(14);
  const [volume, setVolume] = useState(50);

  const [togglePlay, setTogglePlay] = useState(false);

  // font family

  const [font_family, setFontFamily] = useState("");

  // set the theme for the streaming mode

  const [theme, setTheme] = useState("");

  // an array of font families a Reader can choose From

  const font_families = [
    {
      name: "None",
      value: "font-normal",
    },
    {
      name: "DM Serif Display",
      value: "font-main",
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
    {
      name: "IBM Plex Sans",
      value: "font-sub",
    },
  ];

  const themes = [
    {
      theme: "Default",
      colors: ["bg-green-500", "bg-stylish-300", "bg-yellow-50"],
    },
    {
      theme: "Dark",
      colors: ["bg-black", "bg-green-500", "bg-stylish-200"],
    },
    {
      theme: "Loly",
      colors: [
        "bg-orange-500",
        "bg-stylish-200",
        "bg-slate-900",
        "bg-yellow-50",
      ],
    },
  ];

  // toggle settings menu

  const toggleSettingsMenu = () => {
    setShowMenu(!show_menu);
  };

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
    const url_to_audio_route = "/api/audio/";
    const options = {
      methods: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const response = await fetch(
        `${book.book_type === "AU" ? url_to_audio_route : url_to_pages_route}${
          book.id
        }`,
        options
      );

      if (response.ok) {
        setStreamingMode(true);
        if (book.book_type === "AU") {
          const audio_data = await response.json();
          setAudioSrc(audio_data["audio_uri"]);
        } else {
          const routeData = await response.json();
          setBookContent(routeData.content);
        }
      } else {
        setError(true);
        setShowPrompt(true);
        setShowMessage("An Error Has Occured while trying to retrieve pages");
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

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

      <main className="absolute flex -top-[4.5em] -left-[6.8em] -right-[6.8em] inset-0 to z-[10000]">
        {/* This section displays the Table Of content to the Reader */}
        {book.book_type === "EB" ? (
          <section
            className={`w-1/4 ${
              theme === "Default"
                ? "bg-stylish-300"
                : theme === "Dark"
                ? "bg-black text-stylish-200"
                : theme === "Loly"
                ? "bg-orange-500 text-stylish-300"
                : "bg-stylish-300"
            } relative border-r-4 border-r-black`}
          >
            <div
              className={`fixed  w-[18em] p-4 ${
                theme === "Default"
                  ? "bg-stylish-300"
                  : theme === "Dark"
                  ? "bg-black"
                  : theme === "Loly"
                  ? "bg-orange-500 text-stylish-300"
                  : "bg-stylish-300"
              }`}
            >
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
                          ? `${
                              theme === "Loly"
                                ? "text-slate-900"
                                : "text-green-600"
                            }`
                          : ""
                      }`}
                    >
                      <span className="font-bold">
                        {heading.heading_id ? `${heading.heading_id}.` : ""}
                      </span>{" "}
                      {heading.heading_name}
                    </p>
                    <ul className="mt-4 pl-4">
                      {/* Loop through the subheadings of the current heading and display it's content as well */}
                      {heading.subheadings &&
                        heading.subheadings.map((subheading, index) => (
                          <li
                            className={`${
                              theme === "Default"
                                ? "hover:bg-green-600 hover:bg-opacity-10 mt-2"
                                : theme === "Dark"
                                ? "hover:bg-green-600 hover:bg-opacity-50 hover:transition-all p-1 rounded-md mt-2"
                                : theme === "Loly"
                                ? "hover:bg-slate-900 hover:bg-opacity-90 hover:transition-all p-1 mt-2"
                                : "hover:bg-green-600 hover:bg-opacity-10 mt-2"
                            }`}
                            key={subheading.subheading_id}
                          >
                            <span className="font-bold">
                              {heading.heading_id
                                ? `${heading.heading_id}.${index + 1}${" "}`
                                : ""}
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
        ) : (
          ""
        )}
        {/* This section Displays the actual content of the book and some settings related to the content */}
        <section
          className={`w-full ${value > 27 ? "h-fit" : ""} ${
            theme === "Default"
              ? "bg-stylish-300"
              : theme === "Dark"
              ? "bg-black text-white-100"
              : theme === "Loly"
              ? "bg-slate-900 bg-opacity-80 text-stylish-300"
              : "bg-stylish-300"
          } `}
        >
          <div
            className={`${
              theme === "Default"
                ? "bg-white bg-opacity-90 border-t-4 border-t-black"
                : theme === "Dark"
                ? "bg-black text-green-500"
                : theme === "Loly"
                ? "bg-orange-500"
                : "bg-white"
            } relative flex  justify-end`}
          >
            {/* Settings Menu to help reader adjust prefrence */}
            {show_menu && (
              <div
                ref={settingsRef}
                className="bg-yellow-50 absolute top-12 w-[25em] text-black h-fit z-[1000] border-2 shadow-2xl border-black rounded-md"
              >
                <p className="text-center font-light font-mono text-2xl border-b-2 p-1 shadow-2xl">
                  SETTINGS
                </p>
                <p className="p-2 font-title">
                  Modify how text, font sizes and colors appear to suit your
                  prefrence.
                </p>
                <div className="bg-yellow-50 p-2">
                  <p className="font-mono text-lg mb-5 border-b-2 border-b-black">
                    Themes
                  </p>
                  <div>
                    {themes.map((theme) => (
                      <div key={theme.theme} className="mt-4">
                        <h3>
                          <label>
                            <input
                              type="radio"
                              name="themes"
                              value={theme.theme}
                              // Handle the onChange event to capture the selected value
                              onChange={(e) => setTheme(e.target.value)}
                            />
                            {theme.theme}
                          </label>
                        </h3>
                        <div className="flex">
                          {theme.colors.map((color) => (
                            <Circle key={color} className={`${color}`} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                    <p className="text-center mb-4">font family</p>
                    <div className="text-2xl font-title grid grid-flow-row grid-cols-2">
                      {font_families.map((font) => (
                        <div key={font.value}>
                          <label>
                            <input
                              type="radio"
                              name="fontFamily"
                              value={font.value}
                              // Handle the onChange event to capture the selected value
                              onChange={(e) => setFontFamily(e.target.value)}
                            />
                            {font.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                <div className="bg-slate-300 rounded-full text-black h-[2em] w-16 text-center border-2 border-black font-bold">
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
              {/* Toggle Settings Menu*/}
              <Image
                src="/images/adjust.png"
                className="w-[2em] hover:cursor-pointer"
                title="settings"
                alt="settings"
                width={700}
                height={60}
                onClick={toggleSettingsMenu}
              />
              {/* Exit Streaming Mode*/}
              <Image
                src="/images/close.png"
                className={`w-[2em] ${
                  theme === "Loly" ? "bg-slate-50" : "bg-red-400"
                } shadow-md hover:w-[2.4em] hover:shadow-red-600 hover:transition-all rounded-full`}
                title="Close"
                alt="settings"
                width={700}
                height={60}
                onClick={toggleCloseStreamingMode}
              />
            </div>
          </div>
          {/* Keep track of the Reader time to stop reading */}
          <div
            className={`${
              theme === "Default"
                ? "bg-white"
                : theme === "Dark"
                ? "bg-black text-white"
                : theme === "Loly"
                ? "bg-slate-900 text-white"
                : "bg-white"
            } text-center border-b-4 pt-4 border-b-black`}
          >
            <span className="text-green-600 font-bold">Time Started:</span>{" "}
            <span
              className={`italic ${
                theme === "Default"
                  ? "text-black"
                  : theme === "Dark"
                  ? "text-white-100"
                  : theme === "Loly"
                  ? "text-white-100"
                  : "text-black"
              }`}
            >
              8 am
            </span>{" "}
            to <span className="text-orange-600 font-bold">End Time:</span>{" "}
            <span
              className={`italic ${
                theme === "Default"
                  ? "text-black"
                  : theme === "Dark"
                  ? "text-white-100"
                  : theme === "Loly"
                  ? "text-white-100"
                  : "text-black"
              }`}
            >
              not specified
            </span>
          </div>

          {/* The actual content area */}
          <article
            className={`relative ${theme === "Loly" ? "text-stylish-600" : ""}`}
          >
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
            {current_page < book_content.length - 1 &&
            book.book_type !== "AU" ? (
              <Image
                src="/images/right.svg"
                alt="right"
                title="next chapter"
                className="w-[4em] bg-white border-2 border-green-600 fixed right-1 top-[50%] hover:w-[4.4em] hover:transition-all"
                width={150}
                height={60}
                onClick={NavigateToNextPage}
              />
            ) : (
              ""
            )}
            {current_page === -1 ? (
              <>
                <div className="p-3 text-3xl text-center font-sub font-bold">
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

                {book.book_type === "AU" ? (
                  <>
                    <div className="flex flex-col items-center mt-[2em]">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute left-[28em]"
                          viewBox="0 0 719.25 30.42"
                        >
                          <g id="a" />
                          <g id="b">
                            <g id="c">
                              <g>
                                <g>
                                  <rect
                                    x="11.27"
                                    y="23.08"
                                    width="2.17"
                                    height="7.33"
                                  />
                                  <rect
                                    x="15.03"
                                    y="23.08"
                                    width="2.17"
                                    height="7.33"
                                  />
                                  <rect
                                    x="18.79"
                                    y="23.17"
                                    width="2.17"
                                    height="7.25"
                                  />
                                  <rect y="25.23" width="2.17" height="5.19" />
                                  <rect
                                    x="3.76"
                                    y="25.23"
                                    width="2.17"
                                    height="5.19"
                                  />
                                  <rect
                                    x="7.52"
                                    y="25.29"
                                    width="2.17"
                                    height="5.13"
                                  />
                                  <rect
                                    x="22.55"
                                    y="20.94"
                                    width="2.17"
                                    height="9.48"
                                  />
                                  <rect
                                    x="26.3"
                                    y="17.88"
                                    width="2.17"
                                    height="12.54"
                                  />
                                  <rect
                                    x="30.06"
                                    y="16.25"
                                    width="2.17"
                                    height="14.17"
                                  />
                                  <rect
                                    x="33.82"
                                    y="11.29"
                                    width="2.17"
                                    height="19.12"
                                  />
                                  <rect
                                    x="37.58"
                                    y="6.92"
                                    width="2.17"
                                    height="23.5"
                                  />
                                  <rect
                                    x="41.34"
                                    y="13.7"
                                    width="2.17"
                                    height="16.72"
                                  />
                                  <rect
                                    x="45.09"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect x="48.85" width="2.17" height="30.42" />
                                  <rect
                                    x="52.61"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="56.37"
                                    y="9.33"
                                    width="2.17"
                                    height="21.08"
                                  />
                                  <rect
                                    x="60.13"
                                    y="12.35"
                                    width="2.17"
                                    height="18.06"
                                  />
                                  <rect
                                    x="63.88"
                                    y="7.85"
                                    width="2.17"
                                    height="22.56"
                                  />
                                  <rect
                                    x="67.64"
                                    y="9.6"
                                    width="2.17"
                                    height="20.81"
                                  />
                                  <rect
                                    x="108.98"
                                    y="7.98"
                                    width="2.17"
                                    height="22.44"
                                  />
                                  <rect
                                    x="112.74"
                                    y="3.6"
                                    width="2.17"
                                    height="26.81"
                                  />
                                  <rect
                                    x="116.49"
                                    y="9.36"
                                    width="2.17"
                                    height="21.05"
                                  />
                                  <rect
                                    x="120.25"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect
                                    x="124.01"
                                    width="2.17"
                                    height="30.42"
                                  />
                                  <rect
                                    x="127.77"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="131.52"
                                    y="9.33"
                                    width="2.17"
                                    height="21.08"
                                  />
                                  <rect
                                    x="135.28"
                                    y="12.35"
                                    width="2.17"
                                    height="18.06"
                                  />
                                  <rect
                                    x="139.04"
                                    y="7.85"
                                    width="2.17"
                                    height="22.56"
                                  />
                                  <rect
                                    x="142.8"
                                    y="12.66"
                                    width="2.17"
                                    height="17.75"
                                  />
                                  <rect
                                    x="146.56"
                                    y="9.36"
                                    width="2.17"
                                    height="21.05"
                                  />
                                  <rect
                                    x="150.31"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect
                                    x="154.07"
                                    width="2.17"
                                    height="30.42"
                                  />
                                  <rect
                                    x="157.83"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="161.59"
                                    y="9.36"
                                    width="2.17"
                                    height="21.05"
                                  />
                                  <rect
                                    x="165.35"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect x="169.1" width="2.17" height="30.42" />
                                  <rect
                                    x="172.86"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="176.62"
                                    y="9.33"
                                    width="2.17"
                                    height="21.08"
                                  />
                                  <rect
                                    x="180.38"
                                    y="12.35"
                                    width="2.17"
                                    height="18.06"
                                  />
                                  <rect
                                    x="184.13"
                                    y="7.85"
                                    width="2.17"
                                    height="22.56"
                                  />
                                  <rect
                                    x="187.89"
                                    y="9.6"
                                    width="2.17"
                                    height="20.81"
                                  />
                                  <rect
                                    x="71.4"
                                    y="15.14"
                                    width="2.17"
                                    height="15.27"
                                  />
                                  <rect
                                    x="75.16"
                                    y="11.65"
                                    width="2.17"
                                    height="18.77"
                                  />
                                  <rect
                                    x="78.91"
                                    y="17.06"
                                    width="2.17"
                                    height="13.35"
                                  />
                                  <rect
                                    x="82.67"
                                    y="7.99"
                                    width="2.17"
                                    height="22.43"
                                  />
                                  <rect
                                    x="86.43"
                                    y="6.12"
                                    width="2.17"
                                    height="24.29"
                                  />
                                  <rect
                                    x="90.19"
                                    y="10.25"
                                    width="2.17"
                                    height="20.17"
                                  />
                                  <rect
                                    x="93.95"
                                    y="13.58"
                                    width="2.17"
                                    height="16.84"
                                  />
                                  <rect
                                    x="97.7"
                                    y="15.99"
                                    width="2.17"
                                    height="14.43"
                                  />
                                  <rect
                                    x="101.46"
                                    y="12.4"
                                    width="2.17"
                                    height="18.02"
                                  />
                                  <rect
                                    x="105.22"
                                    y="13.8"
                                    width="2.17"
                                    height="16.62"
                                  />
                                  <rect
                                    x="191.65"
                                    y="11.29"
                                    width="2.17"
                                    height="19.12"
                                  />
                                  <rect
                                    x="195.41"
                                    y="6.92"
                                    width="2.17"
                                    height="23.5"
                                  />
                                  <rect
                                    x="199.17"
                                    y="13.7"
                                    width="2.17"
                                    height="16.72"
                                  />
                                  <rect
                                    x="202.92"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect
                                    x="206.68"
                                    width="2.17"
                                    height="30.42"
                                  />
                                  <rect
                                    x="210.44"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="214.2"
                                    y="9.33"
                                    width="2.17"
                                    height="21.08"
                                  />
                                  <rect
                                    x="217.96"
                                    y="12.35"
                                    width="2.17"
                                    height="18.06"
                                  />
                                  <rect
                                    x="221.71"
                                    y="7.85"
                                    width="2.17"
                                    height="22.56"
                                  />
                                  <rect
                                    x="225.47"
                                    y="9.6"
                                    width="2.17"
                                    height="20.81"
                                  />
                                  <rect
                                    x="304.34"
                                    y="9.36"
                                    width="2.17"
                                    height="21.05"
                                  />
                                  <rect
                                    x="308.1"
                                    y="2.33"
                                    width="2.17"
                                    height="28.08"
                                  />
                                  <rect
                                    x="311.86"
                                    width="2.17"
                                    height="30.42"
                                  />
                                  <rect
                                    x="315.62"
                                    y="5.17"
                                    width="2.17"
                                    height="25.25"
                                  />
                                  <rect
                                    x="319.37"
                                    y="9.33"
                                    width="2.17"
                                    height="21.08"
                                  />
                                  <rect
                                    x="323.13"
                                    y="12.35"
                                    width="2.17"
                                    height="18.06"
                                  />
                                  <rect
                                    x="326.89"
                                    y="7.85"
                                    width="2.17"
                                    height="22.56"
                                  />
                                  <rect
                                    x="330.65"
                                    y="9.6"
                                    width="2.17"
                                    height="20.81"
                                  />
                                  <rect
                                    x="334.41"
                                    y="11.29"
                                    width="2.17"
                                    height="19.12"
                                  />
                                  <g>
                                    <rect
                                      x="266.81"
                                      y="15.18"
                                      width="2.17"
                                      height="15.24"
                                    />
                                    <rect
                                      x="270.56"
                                      y="6.92"
                                      width="2.17"
                                      height="23.5"
                                    />
                                    <rect
                                      x="274.32"
                                      y="12.32"
                                      width="2.17"
                                      height="18.09"
                                    />
                                    <rect
                                      x="278.08"
                                      y="2.33"
                                      width="2.17"
                                      height="28.08"
                                    />
                                    <rect
                                      x="281.84"
                                      width="2.17"
                                      height="30.42"
                                    />
                                    <rect
                                      x="285.6"
                                      y="5.17"
                                      width="2.17"
                                      height="25.25"
                                    />
                                    <rect
                                      x="289.35"
                                      y="9.33"
                                      width="2.17"
                                      height="21.08"
                                    />
                                    <rect
                                      x="293.11"
                                      y="12.35"
                                      width="2.17"
                                      height="18.06"
                                    />
                                    <rect
                                      x="296.87"
                                      y="7.85"
                                      width="2.17"
                                      height="22.56"
                                    />
                                    <rect
                                      x="300.63"
                                      y="9.6"
                                      width="2.17"
                                      height="20.81"
                                    />
                                  </g>
                                  <g>
                                    <rect
                                      x="229.23"
                                      y="16.61"
                                      width="2.17"
                                      height="13.8"
                                    />
                                    <rect
                                      x="232.99"
                                      y="21.73"
                                      width="2.17"
                                      height="8.69"
                                    />
                                    <rect
                                      x="236.74"
                                      y="23.57"
                                      width="2.17"
                                      height="6.22"
                                    />
                                    <rect
                                      x="240.5"
                                      y="22.37"
                                      width="2.17"
                                      height="8.05"
                                    />
                                    <rect
                                      x="244.26"
                                      y="23.99"
                                      width="2.17"
                                      height="6.12"
                                    />
                                    <rect
                                      x="248.02"
                                      y="23.77"
                                      width="2.17"
                                      height="6.65"
                                    />
                                    <rect
                                      x="251.78"
                                      y="23.68"
                                      width="2.17"
                                      height="6.73"
                                    />
                                    <rect
                                      x="255.53"
                                      y="22.93"
                                      width="2.17"
                                      height="7.48"
                                    />
                                    <rect
                                      x="259.29"
                                      y="21.76"
                                      width="2.17"
                                      height="8.65"
                                    />
                                    <rect
                                      x="263.05"
                                      y="18.59"
                                      width="2.17"
                                      height="11.83"
                                    />
                                  </g>
                                </g>
                                <g>
                                  <g>
                                    <rect
                                      x="405.81"
                                      y="23.08"
                                      width="2.17"
                                      height="7.33"
                                    />
                                    <rect
                                      x="402.05"
                                      y="23.08"
                                      width="2.17"
                                      height="7.33"
                                    />
                                    <rect
                                      x="398.29"
                                      y="23.17"
                                      width="2.17"
                                      height="7.25"
                                    />
                                    <rect
                                      x="413.32"
                                      y="25.23"
                                      width="2.17"
                                      height="5.19"
                                    />
                                    <rect
                                      x="409.56"
                                      y="25.29"
                                      width="2.17"
                                      height="5.13"
                                    />
                                    <rect
                                      x="417.08"
                                      y="25.23"
                                      width="2.17"
                                      height="5.19"
                                    />
                                    <rect
                                      x="394.53"
                                      y="20.94"
                                      width="2.17"
                                      height="9.48"
                                    />
                                    <polyline points="390.77 30.42 390.77 17.88 392.95 17.88 392.95 30.42" />
                                    <polyline points="387.02 30.42 387.02 16.25 389.19 16.25 389.19 30.42" />
                                    <rect
                                      x="383.26"
                                      y="11.29"
                                      width="2.17"
                                      height="19.12"
                                    />
                                  </g>
                                  <g>
                                    <rect
                                      x="338.16"
                                      y="6.92"
                                      width="2.17"
                                      height="23.5"
                                    />
                                    <rect
                                      x="341.92"
                                      y="13.7"
                                      width="2.17"
                                      height="16.72"
                                    />
                                    <rect
                                      x="345.68"
                                      y="2.33"
                                      width="2.17"
                                      height="28.08"
                                    />
                                    <rect
                                      x="349.44"
                                      width="2.17"
                                      height="30.42"
                                    />
                                    <rect
                                      x="353.2"
                                      y="5.17"
                                      width="2.17"
                                      height="25.25"
                                    />
                                    <rect
                                      x="371.98"
                                      y="2.33"
                                      width="2.17"
                                      height="28.08"
                                    />
                                    <rect
                                      x="375.74"
                                      width="2.17"
                                      height="30.42"
                                    />
                                    <rect
                                      x="379.5"
                                      y="5.17"
                                      width="2.17"
                                      height="25.25"
                                    />
                                    <rect
                                      x="356.95"
                                      y="9.33"
                                      width="2.17"
                                      height="21.08"
                                    />
                                    <rect
                                      x="360.71"
                                      y="12.35"
                                      width="2.17"
                                      height="18.06"
                                    />
                                    <rect
                                      x="364.47"
                                      y="7.85"
                                      width="2.17"
                                      height="22.56"
                                    />
                                    <rect
                                      x="368.23"
                                      y="9.6"
                                      width="2.17"
                                      height="20.81"
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      {/* <div className="flex space-x-20 mt-[4em]">
                        <Image
                          src={`${
                            !togglePlay
                              ? "/images/play.png"
                              : "/images/pause.png"
                          } `}
                          alt="play button"
                          className="w-[5em] shadow-2xl hover:scale-110 transition-all cursor-pointer"
                          width={1000}
                          height={30}
                          onClick={() => {
                            setTogglePlay(!togglePlay);
                          }}
                        />
                        <div className="flex space-x-4">
                          <Image
                            src="/images/audio.png"
                            alt="play button"
                            className="w-[2em] h-[2em] hover:scale-105 transition-all cursor-pointer"
                            width={1000}
                            height={30}
                          />
                          <div className="pt-3 flex">
                            <Volume
                              value={volume}
                              onChange={(e) =>
                                setVolume(parseInt(e.target.value))
                              }
                            />
                          </div>
                          <p className="pt-1 rounded-full shadow-md h-[2em] w-[2.5em] bg-white-100 text-stylish-600 font-bold">
                            <span className="pl-2">{volume}</span>
                          </p>
                        </div> */}
                        {audioSrc && <audio className="mt-[4em]" controls src={audioSrc}/>}
                      {/* </div> */}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              // set the font size prefrence by the reader
              <article
                className={`${
                  theme === "Dark" ? "bg-black text-white" : "bg-yellow-50"
                } border-x-2 border-x-black px-2 mx-[5em] flex flex-col items-center`}
                style={{ fontSize: value !== 14 ? `${value}px` : "" }}
              >
                <p
                  className={`text-center p-4 ${
                    value > 20 ? "text-4xl" : "text-3xl"
                  } font-bold`}
                >
                  {currentContent.heading_name}
                </p>
                {currentContent.heading_content && (
                  <p className={`my-10 ${font_family ? `${font_family}` : ""}`}>
                    {currentContent.heading_content}
                  </p>
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
                    <p
                      className={`mb-5 underline ${
                        value > 20 ? "text-4xl" : "text-2xl"
                      } `}
                    >
                      {subheading.subheading_name}
                    </p>
                    {subheading.subheading_content && (
                      <p
                        className={`mb-2 ${
                          font_family ? `${font_family}` : ""
                        }`}
                      >
                        {subheading.subheading_content}
                      </p>
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
