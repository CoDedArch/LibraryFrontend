// components/BookComp.tsx
import React from 'react';
const BookHeaderComp: React.FC = () => {
    
  return (
    <ul className="flex space-x-7 justify-center border-b-2 border-b-black">
        <li className="w-[10em] text-center py-2 bg-green-300 bg-opacity-15 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Overview</li>
        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Details</li>
        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all h-[2.5em] rounded-md">Inquiries</li>
        <li className="w-[10em] text-center py-2 hover:bg-green-300 hover:bg-opacity-15 hover:transition-all md:h-[2.5em] h-[3.5em] rounded-md">Related Books</li>
    </ul>
  );
};

export default BookHeaderComp;
