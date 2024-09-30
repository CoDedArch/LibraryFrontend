// components/BookComp.tsx
import React from "react";
import Link from "next/link";
const BookHeaderComp: React.FC = () => {
  return (
    <ul className="flex space-x-7 justify-center border-b-2 border-b-black">
      <li className="w-[10em] text-center py-2 bg-stylish-600 bg-opacity-50 hover:bg-stylish-600 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">
        <Link href="#Overview"> Overview </Link>
      </li>
      <li className="w-[10em] text-center py-2 hover:bg-stylish-600 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">
        <Link href="#Details">Details</Link>
      </li>
      <li className="w-[10em] text-center py-2 hover:bg-stylish-600 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">
        <Link href="#Inquiries">Inquiries</Link>
      </li>
      <li className="w-[10em] text-center py-2 hover:bg-stylish-600 hover:bg-opacity-15 hover:transition-all md:h-[2.5em] h-[3.5em] rounded-md">
        <Link href="#Related">Related Books </Link>
      </li>
    </ul>
  );
};

export default BookHeaderComp;
