// components/BookComp.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LandingComp = () => {
  const [contentIndex, setContentIndex] = useState(0);
  const changingContent = [
    "Where Adventure Meets Knowledge",
    "Read Free E-Books",
    "Listen to Free AudioBooks",
    "Track Your Progress",
    "Inquire and Engage with Peers",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the content index (loop back to 0 if it exceeds the array length)
      setContentIndex((prevIndex) => (prevIndex + 1) % changingContent.length);
    }, 5000); // Change content every 2 seconds
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const currentContent = changingContent[contentIndex];
  return (
    <section className="bg-stylish-500 flex flex-col h-[100vh] mt-[6em] md:mt-0">
      <div className="flex flex-col justify-center">
        <div className="">
          <h1 className="text-5xl font-main text-center text-stylish-400">
            Welcome to Let&apos;s Learn!
          </h1>
          <div className="flex justify-center">
            <h2 className="text-xl md:text-2xl text-center border-b-2 border-r-2 border-l-2 border-black p-3 font-main text-stylish-200 rounded-br-3xl rounded-bl-3xl shadow-xl">
              {currentContent.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h2>
          </div>
          <p className="flex p-2 font-title text-justify text-lg">
            At Let&apos;s Learn, we believe in the power of stories, curiosity,
            and imagination! This is a special online library designed for kids
            and teens under 20, offering a world of books that inspire
            creativity, learning, and fun. Whether you&apos;re looking for your
            next favorite adventure, exploring science, history, or discovering
            new worlds, Let&apos;s Learn has something for everyone.
          </p>
          <div className="flex justify-center p-2">
            <Link
              href="/signup"
              className="text-center p-2 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all rounded-md font-main border-solid  border-2 border-black mt-1"
            >
              Get Started with Us Today! 😊
            </Link>
          </div>
        </div>
      </div>
      <div>
        <Image
          src="/images/landing.png"
          alt="reading image"
          width={1500}
          height={70}
        />
      </div>
    </section>
  );
};

export default LandingComp;
