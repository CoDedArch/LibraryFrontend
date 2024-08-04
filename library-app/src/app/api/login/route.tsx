import { NextResponse } from "next/server";
import { setToken, setRefreshToken } from "@/lib/auth";


const Ninja_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";
export async function POST(request:Request) {
  const requestData = await request.json();
  const jsonData = JSON.stringify(requestData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  };
  try {
    const response = await fetch(Ninja_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();
    if (response.ok) {
      const { access, refresh } = responseData;
      setToken(access);
      setRefreshToken(refresh);
      return NextResponse.json({ loggedIn: true }, { status: 200 });
    } else {
      return NextResponse.json(
        { loggedIn: false, ...responseData },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during login", error: error},
      { status: 500 }
    );
  }
}
