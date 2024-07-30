"use client";
import Image from "next/image";
import { useEffect,useState } from "react";

export default function Home() {
  let genre = ["kids","fictional", "non-fictional"];
  const books = [
    { name: "To Kill a Mockingbird", author: "Harper Lee", dateOfPublication: "1960-07-11", genre: "kids" },
    { name: "1984", author: "George Orwell", dateOfPublication: "1949-06-08", genre: "kids" },
    { name: "The Great Gatsby", author: "F. Scott Fitzgerald", dateOfPublication: "1925-04-10", genre: "kids" },
    { name: "The Catcher in the Rye", author: "J.D. Salinger", dateOfPublication: "1951-07-16", genre: "kids" },
    { name: "life", author: "CoDed", dateOfPublication: "2020-05-01", genre: "kids" },
    { name: "Things fall apart", author: "Author 6", dateOfPublication: "2020-06-01", genre: "kids" },
    { name: "Dessert Rivers", author: "Author 7", dateOfPublication: "2020-07-01", genre: "kids" },
  ];
  const kidsBooks = books.filter(book => book.genre === "kids")
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(2);
  
  useEffect(() => {
    const updateBooksPerPage = () => {
        setBooksPerPage(window.innerWidth < 640 ? 2 : 5);
    };

    updateBooksPerPage(); // Set initial value
    window.addEventListener('resize', updateBooksPerPage); // Update on resize

    return () => window.removeEventListener('resize', updateBooksPerPage); // Cleanup on unmount
  }, []);
  
  const totalPages = Math.ceil(kidsBooks.length / booksPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);};

  const handlePrev = () => {
      setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };
  const startIndex = currentPage * booksPerPage;
  const selectedBooks = kidsBooks.slice(startIndex, startIndex + booksPerPage);
  return (
    <main className="mt-[3em] md:px-[10em]">
      <section className="">
        <p className="p-3 md:pl-[5em] text-blue-700">Benefits of using let&apos;s learn</p>
        {/* tell the user about */}
        <div className="flex space-x-4 justify-center">
          <div><Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></div>
          <div className="flex bg-orange-400 bg-opacity-10 space-x-3 max-w-[18em]">
            <div className="pt-6">
              <Image src="/images/goals.png" alt="goals icon" width={100} height={50}/>
            </div>
            <div>
              <p className="text-2xl font-bold">Goals setting</p>
              <p className="font-extralight">With let&apos;s learn, you can set and monitor your personal learning goals</p>
            </div>
          </div>
          <div className="hidden md:flex bg-orange-400 bg-opacity-10 space-x-3 max-w-[18em]">
            <div className="pt-6">
              <Image src="/images/goals.png" alt="goals icon" width={100} height={50}/>
            </div>
            <div>
              <p className="text-2xl font-bold">Goals setting</p>
              <p className="font-extralight">With let&apos;s learn, you can set and monitor your personal learning goals</p>
            </div>
          </div>
          <div className="hidden md:flex bg-orange-400 bg-opacity-10 space-x-3 max-w-[18em]">
            <div className="pt-6">
              <Image src="/images/goals.png" alt="goals icon" width={100} height={50}/>
            </div>
            <div>
              <p className="text-2xl font-bold">Goals setting</p>
              <p className="font-extralight">With let&apos;s learn, you can set and monitor your personal learning goals</p>
            </div>
          </div>
          <div><Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></div>
        </div>
      </section>
      {
        genre.map((item, index) => (
          <section key={index} className="mt-[3em]">
            <p className="p-2 font-title text-2xl">{item}</p>
            <div className="flex space-x-4 justify-center">
              <button onClick={handlePrev}><Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em] absolute right-[20.99em] md:right-[80em] top-[28.5em]" width={70} height={30} /></button>
              <div className="flex space-x-2 md:space-x-10">
                {
                  item === "kids" &&
                  selectedBooks.map((book, b_index) => (
                    <div key={index} className="bg-yellow-300 w-[8em] md:w-[10em] shadow-2xl flex flex-col justify-end md:block max-h-[16em] md:max-h-none">
                      <p className="h-[13em] max-h-[13em] md:w-[10em] bg-blue-400">img</p>
                      <p className="font-projects pl-2">{ book.name}</p>
                      <p className="font-title pl-2">{ book.author}</p>
                      <p className="flex justify-end pr-1">{ book.dateOfPublication}</p>
                    </div>
                    ))
                }
              </div>
              <button onClick={handleNext}><Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em] absolute left-[20.99em] md:left-[80em] top-[28.5em]" width={70} height={30}/></button>
            </div>
          </section>
        ))
      }
    </main>
  );
}
