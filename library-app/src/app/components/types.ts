// types.ts
export interface Book {
  id: number;
  title: string;
  book_type: string;
  cover_img: string;
  genre_name: string;
  publisher: string;
  publication_date: string;
  no_pages: number;
  LibraryId: string;
  isbn10: string;
  isbn13: string;
  genre: number;
  reader_id: number;
  average_rating: number;
  number_of_ratings: number;
  readers_currently_reading: number;
  readers_finished_reading: number;
  want_to: number;
  total_downloads: number;
  total_shares: number;
}

export interface Genre {
  id: number;
  genre: string;
}

export type Heading = {
  heading_id: number;
  heading_name: string;
  heading_content: string;
  heading_image: string; // Assuming this is a URL or file path
  subheadings: Subheading[]; // Optional subheading
};

// structure for how subheadings are modelled

type Subheading = {
  subheading_id: number;
  subheading_name: string;
  subheading_content: string;
  subheading_image: string; // Assuming this is a URL or file path
};
