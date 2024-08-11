import { NextResponse } from "next/server";
import { getToken } from "@/lib/auth";

//  Link to Api endpoint to authenticate users
const Ninja_API_RATEBOOK_URL = "http://127.0.0.1:8000/api/books/book/rating";

// post request to rate a book
export async function POST(request: Request) {
  const authToken = getToken();
  // return a 401 status code if token doesn't exist
  if (!authToken) {
    return NextResponse.json({message: "Hi there!👋 Please Login to rate this book"}, { status: 401 });
}
    
  const requestData = await request.json();

  // convert data to sting
  const jsonData = JSON.stringify(requestData);
  
  // Post request headers
  const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
    },
    body: jsonData,
  };
  
  // try to fetch a response from backend server
  try {
    const response = await fetch(Ninja_API_RATEBOOK_URL, requestOptions);
    const responseData = await response.json();

      if (response.ok) {
        console.log("response is okay")
      return NextResponse.json({ Rated: true, message: "Successfully Rated This Book"}, { status: 200 });
    }
    else {
        console.log("unauthorized")   ; 
          return NextResponse.json(
        { Rated: false, message: "UNAUTHORIZED: Try Logging In"},
        { status: 400 }
      );

    }
  }
  catch (error) {
    return NextResponse.json(
      // else return a server error
      { message: "An error occurred When trying to rate the book", error: error},
      { status: 500 }
    );
  
  }
}
