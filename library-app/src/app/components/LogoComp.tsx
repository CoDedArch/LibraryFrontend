// components/BookComp.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LogoComp = () => {
  return (
    <div className="p-2 font-bold shadow-md font-main text-stylish-400 text-4xl md:text-3xl flex space-x-6">
        <div className="flex space-x-1">
          <Image
            src="/images/logo.png"
            className={`w-[2em] md:w-[2em] md:h-[1em] h-10`}
            alt="logo"
            width={40}
            height={30}
          />
          <Link href="/">
            Let&lsquo;s Learn
          </Link>
        </div> 
      </div>
  );
};

export default LogoComp;
