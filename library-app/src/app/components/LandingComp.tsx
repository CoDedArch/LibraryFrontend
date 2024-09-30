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
          <h1 className="text-5xl md:text-8xl font-sub text-center text-stylish-400">
            Welcome to Let&apos;s Learn!
          </h1>
          <div className="flex justify-center">
            <h2 className="text-xl md:text-2xl text-center border-b-2 border-r-2 border-l-2 border-black p-3 font-main text-stylish-200 rounded-br-3xl rounded-bl-3xl shadow-xl">
              {currentContent.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h2>
          </div>
          <div className="flex justify-center">
            <p className="flex p-2 font-body text-center text-lg w-[45em]">
            Africa&apos;s Biggest Online Library for Basic School & High School Students.
            Come on and join the fun side!
            </p>
          </div>
          <div className="flex justify-center p-2">
            <Link
              href="/signup"
              className="text-center p-2 bg-stylish-600 text-white-100 hover:bg-creamy-100 hover:text-stylish-600 hover:border-stylish-600 transition-all rounded-md font-body font-semibold border-solid  border-2 border-black mt-1"
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
