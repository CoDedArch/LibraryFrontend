"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import GenreCompo from "./components/GenreComp";
import { Genre } from "./components/types";

export default function Home() {
  const getGenreFromDjangoAPI = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/books/genres");
    const data = await response.json();
    return data
  }
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenresAndBooks = async () => {
      try {
        const genresData = await getGenreFromDjangoAPI();
        setGenres(genresData);
      } catch (error) {
        console.error('Error fetching genres', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGenresAndBooks();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <main className="mt-[3em] md:px-[10em]">
      <section className="">
        <p className="p-3 md:pl-[5em] text-blue-700">Benefits of using let&apos;s learn</p>
        {/* tell the user about */}
        <div className="flex space-x-4 justify-center">
          <button><Image src="/images/backward.png" alt="back icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></button>
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
          <button><Image src="/images/forward.png" alt="forward icon" className="pt-9 w-[2.5em] md:w-[3em]" width={70} height={30}/></button>
        </div>
      </section>
      {/* Genre Component Goes in here */}
      {
        genres.map((genre) => (
          <GenreCompo key={genre.id} genre={genre}/>
        ))
      }
    </main>
  );
}