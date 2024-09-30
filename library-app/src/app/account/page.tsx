"use client";

import { useEffect, useState } from "react";
import { Book as BookType } from "@/app/components/types";
import Image from "next/image";
import styled from "styled-components";
import HeaderComp from "../components/HeaderComp";

interface BookCompletionProps {
  completion: number; // Define the type for the completion prop
  ending: number;
}

const BookCompletionBox = styled.div<BookCompletionProps>`
  width: 130px; /* Adjust the width as desired */
  height: 2px; /* Equal height to make it a square */
  text-align: center;
  padding: 5px 0;
  background: linear-gradient(
    to right,
    #0074d9 ${(props) => props.completion}%,
    #ffffff ${(props) => props.ending}%
  );
  border-radius: 10px;
`;

const READER_INFO = "/api/account";
// This page presents the details of a book

export default function Account() {
  const [readerInfo, setReaderInfo] = useState("");

  const getUserInfoDjangoAPI = async () => {
    const response = await fetch(READER_INFO);
    const data = await response.json();
    // return the book data
    return data["content"]["username"];
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const readerInfoBackend = await getUserInfoDjangoAPI();
        //   set the state of the book to book data return from the server
        setReaderInfo(readerInfoBackend);
      } catch (error) {
        console.error("Error retrieving this Book", error);
      }
    };
    fetchInfo();
  }, []);
  return (
    <>
      <HeaderComp></HeaderComp>
      <main className="bg-stylish-500 pb-6">
        <section className="relative flex justify-center">
          <Image
            src="/images/dash1.png"
            alt="dash1"
            className="w-[70em]"
            width={10000}
            height={60}
          />
          <div className="absolute top-[11.4em] right-[20em] w-[35em]">
            <p className="text-5xl font-sub">Hello 👋 {readerInfo}</p>
            <div className="flex space-x-2 justify-between mt-10">
              <div className="flex flex-col items-center w-1/2 bg-blue-600 p-3 text-center text-white-100 rounded-lg">
                <Image
                  src="/images/books_read.png"
                  className="w-[5em] border-b-2 pb-3"
                  alt="books read logo"
                  width={3000}
                  height={30}
                />
                <div>
                  <p className="mt-5 text-2xl font-extrabold">500</p>
                  <p className="mt-2">Books Read</p>
                </div>
              </div>
              <div className="flex flex-col items-center w-1/2 bg-blue-600 p-3 text-center text-white-100 rounded-lg">
                <Image
                  src="/images/time_spent.png"
                  className="w-[5em] border-b-2 pb-3"
                  alt="books read logo"
                  width={3000}
                  height={30}
                />
                <div>
                  <p className="mt-5 text-2xl font-extrabold">880</p>
                  <p className="mt-2">Reading Hours</p>
                </div>
              </div>
              <div className="flex flex-col items-center w-1/2 bg-blue-600 p-3 text-center text-white-100 rounded-lg">
                <Image
                  src="/images/genres.png"
                  className="w-[5em] border-b-2 pb-3"
                  alt="books read logo"
                  width={3000}
                  height={30}
                />
                <div>
                  <p className="mt-5 text-2xl font-extrabold">5</p>
                  <p className="mt-2">Genres Read</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="md:px-[10em] space-y-3">
          <p className="font-bold">RECENTLY READ</p>
          <div>
            <div className="flex justify-evenly">
              <div className="space-y-2">
                <Image
                  src="/images/book3.png"
                  alt="book3"
                  className="w-[8em] rounded-md"
                  width={10000}
                  height={60}
                />
                <BookCompletionBox
                  completion={100}
                  ending={70}
                ></BookCompletionBox>
              </div>
              <div className="space-y-2">
                <Image
                  src="/images/book2.png"
                  alt="book3"
                  className="w-[8em] rounded-md"
                  width={10000}
                  height={60}
                />
                <BookCompletionBox
                  completion={75}
                  ending={70}
                ></BookCompletionBox>
              </div>
              <div className="space-y-2">
                <Image
                  src="/images/book4.png"
                  alt="book3"
                  className="w-[8em] rounded-md"
                  width={10000}
                  height={60}
                />
                <BookCompletionBox
                  completion={50}
                  ending={45}
                ></BookCompletionBox>
              </div>
              <div className="space-y-2">
                <Image
                  src="/images/book5.png"
                  alt="book3"
                  className="w-[8em] rounded-md"
                  width={10000}
                  height={60}
                />
                <BookCompletionBox
                  completion={10}
                  ending={9}
                ></BookCompletionBox>
              </div>
            </div>
          </div>
        </section>
        <section className="md:px-[10em] mb-4 mt-10">
          <p className="font-bold">UPCOMING EVENTS</p>
          <div className="flex flex-col space-y-10 mt-4">
            <div className="bg-slate-300 pt-5 px-5 pb-2 rounded-md">
              <h1 className="text-2xl font-bold">Calbank Essay Competition</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio
                molestias recusandae impedit dicta necessitatibus! Deleniti
                dicta quae facilis quo, labore cumque officiis assumenda, magnam
                velit ducimus nesciunt veritatis illum!
              </p>
              <div className="flex mt-5 justify-evenly">
                <div className="flex space-x-2">
                  <Image
                    src="/images/calendar.png"
                    className="w-[1.4em]"
                    alt="marker"
                    width={1000}
                    height={30}
                  />
                  <p>7th October, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/marker.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p> Calbank Head Office</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/clock.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p>8:00 AM</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/more.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p>calbank.com/essaycomp</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-300 pt-5 px-5 pb-2 rounded-md">
              <h1 className="text-2xl font-bold">Calbank Essay Competition</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex odio
                molestias recusandae impedit dicta necessitatibus! Deleniti
                dicta quae facilis quo, labore cumque officiis assumenda, magnam
                velit ducimus nesciunt veritatis illum!
              </p>
              <div className="flex mt-5 justify-evenly">
                <div className="flex space-x-2">
                  <Image
                    src="/images/calendar.png"
                    className="w-[1.4em]"
                    alt="marker"
                    width={1000}
                    height={30}
                  />
                  <p>7th October, 2024</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/marker.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p> Calbank Head Office</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/clock.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p>8:00 AM</p>
                </div>
                <div className="flex space-x-2">
                  <Image
                    src="/images/more.png"
                    alt="marker"
                    className="w-[1.4em]"
                    width={1000}
                    height={30}
                  />
                  <p>calbank.com/essaycomp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
