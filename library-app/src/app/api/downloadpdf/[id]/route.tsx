import { getToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";

//  Link to Api endpoint to request download of pdf
const NINJA_DOWNLOAD_PDF = "http://127.0.0.1:8000/api/books/download_book/";

// make a get request to ninja endpoint
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const authToken = getToken();
  // return a 401 status code if token doesn't exist
  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }
  // Headers for making the Get Request
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };
  // obtain the response from the backend server
  const response = await fetch(`${NINJA_DOWNLOAD_PDF}${params.id}`, options);
  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to download PDF" },
      { status: 400 }
    );
  }
  // convert response into binary file
  const blob = await response.blob();
  const stream = blob.stream();

  // and then return this file as filestream to the frontend
  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="book.pdf"`,
    },
  });
}
