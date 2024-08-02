// types.ts
export interface Book {
    id: number;
    title: string;
    cover_img: string;
    publisher: string;
    publication_date: string;
    no_pages: number;
    LibraryId: string;
    isbn10: string;
    isbn13: string;
    genre: number
    reader_id: number
    average_rating: number
    number_of_ratings: number
    readers_currently_reading: number
    readers_finished_reading: number
    total_downloads: number
    total_shares: number
  }
 
export interface Genre {
  id: number;
  genre: string;

}