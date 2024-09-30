import Signup from "@/app/signup/page";
import { NextResponse } from "next/server";

//  Link to Api endpoint to authenticate users
const Ninja_API_SIGNUP_URL = "http://127.0.0.1:8000/api/user/create_reader";

// post request to login endpoint.
export async function POST(request: Request) {
  const requestData = await request.json();
  // convert data to sting
  const jsonData = JSON.stringify(requestData);

  // Post request headers
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };

  // try to fetch a response from backend server
  try {
    const response = await fetch(Ninja_API_SIGNUP_URL, requestOptions);
    const responseData = await response.json();

    // return a 200 status to the client if the user has logged in
    if (response.ok) {
      console.log("response recieved");
      return NextResponse.json({ Signup: true }, { status: 200 });
    } else if (response.status === 400) {
      // Response is 400, bad request (e.g., username/email already exists)
      console.log("Signup failed:", responseData);
      return NextResponse.json(requestData, { status: 400 });
    } else {
      // Handle other status codes (e.g., 500)
      console.log("An error occurred:", responseData);
      return NextResponse.json(responseData, { status: 500 });
    }
  } catch (error) {
    // Handle any unexpected errors that occurred during the request
    console.log("Request failed:", error);
    alert("An unexpected error occurred. Please try again later.");
  }
}
