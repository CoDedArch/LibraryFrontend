import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const NINJA_GET_USER_URL = "http://127.0.0.1:8000/api/user/reader-info";
export async function GET(
  request: Request,
  { params }: { params: { id: number }}
) {
  // get use authentication token which is the access token of the bearer
  const authtoken = getToken();

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
    NINJA_GET_USER_URL,
    options
  );
  const reader_info = await response.json();
  console.log("start");
  console.log(reader_info);
  if (response.ok) {
    return NextResponse.json({ content: reader_info }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 404 }
    );
  }
}
