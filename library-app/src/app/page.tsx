"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import GenreCompo from "./components/GenreComp";
import { Genre } from "./components/types";
import LandingComp from "./components/LandingComp";
import { useAuth } from "@/components/authProvider";
import HeaderComp from "./components/HeaderComp";

export default function Home() {
  const is_authenticated = useAuth();

  const getGenreFromDjangoAPI = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/books/genres");
    const data = await response.json();
    return data;
  };
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenresAndBooks = async () => {
      try {
        const genresData = await getGenreFromDjangoAPI();
        setGenres(genresData);
      } catch (error) {
        console.error("Error fetching genres", error);
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
    <>
      <HeaderComp></HeaderComp>

      <main className="bg-stylish-500 mt-[3em] md:px-[10em]">
        {/* Landing Page should only show when the user is not authenticated */}
        {!is_authenticated?.isAuthenticated && <LandingComp />}
        <section className={`${is_authenticated?.isAuthenticated ? 'mt-[5em]' : ' md:mt-[27em]'}`}>
          {/* Genre Component Goes in here */}

          {genres.map((genre) => (
            <GenreCompo key={genre.id} genre={genre} />
          ))}
        </section>
      </main>
    </>
  );
}
