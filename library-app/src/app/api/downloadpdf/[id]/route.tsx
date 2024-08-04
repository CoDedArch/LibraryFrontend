import { getToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";

const NINJA_DOWNLOAD_PDF = "http://127.0.0.1:8000/api/books/download_book/";
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  const authToken = getToken();
  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  const response = await fetch(`${NINJA_DOWNLOAD_PDF}${params.id}`, options);
  if (!response.ok) {
    return NextResponse.json(
      { message: "Failed to download PDF" },
      { status: 400 }
    );
  }
  const blob = await response.blob();
  const stream = blob.stream();

  return new Response(stream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="book.pdf"`,
    },
  });
}
