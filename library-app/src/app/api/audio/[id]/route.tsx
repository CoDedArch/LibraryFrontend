import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const NINJA_GET_AUDIO_URL = "http://127.0.0.1:8000/api/books/";
export async function GET(
  request: Request,
  { params }: { params: { id: number } }
) {
  // get use authentication token which is the access token of the bearer
  const authtoken = getToken();
  console.log(params);

  if (!authtoken) {
    return NextResponse.json(
      { message: "You are Unauthorized, please login" },
      { status: 401 }
    );
  }

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${authtoken}`,
    },
  };
  const response = await fetch(
    `${NINJA_GET_AUDIO_URL}${params.id}/audio`,
    options
  );
  console.log("In HERE");
  const book_audio = await response.json();
  if (!response.ok) {
    return NextResponse.json({ status: 400 });
  }
  // send the audio url to the requesting link
  console.log(book_audio);
  return NextResponse.json(book_audio, { status: 200 });
}
