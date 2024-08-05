import { NextResponse } from "next/server";
import { setToken, setRefreshToken } from "@/lib/auth";

//  Link to Api endpoint to authenticate users
const Ninja_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";

// post request to login endpoint.
export async function POST(request: Request) {
  // obtain login in data from UI
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
    const response = await fetch(Ninja_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();

    // return a 200 status to the client if the user has logged in
    if (response.ok) {
      const { access, refresh } = responseData; // responseData contains access and refresh tokens
     
      // Then set the user access Token so that the client can getToken
      setToken(access);
     
      // set the refresh Token as well, this token will be use to fetch a new  access token
      setRefreshToken(refresh);
      return NextResponse.json({ loggedIn: true }, { status: 200 });
    }
    else {
      // return a 400 if the user isn't login
      return NextResponse.json(
        { loggedIn: false, ...responseData },
        { status: 400 }
      );

    }
  }
  catch (error) {
    return NextResponse.json(
      // else return a server error
      { message: "An error occurred during login", error: error},
      { status: 500 }
    );
  
  }
}
