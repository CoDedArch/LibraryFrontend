import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

//  Link to Api endpoint to request download of pdf
const NINJA_USER_RATINGS = "http://127.0.0.1:8000/api/books/user/ratings/";

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
  const response = await fetch(`${NINJA_USER_RATINGS}${params.id}`, options);
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    return NextResponse.json({ user_rating: data }, { status: 200 });
  } else {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
