import { getToken } from "../../../lib/auth";
import { NextResponse } from "next/server";

// Get and return a users Token
export async function GET(request: Request) {
  // getToken isn't accessible on
  const authToken = getToken();
  // return a 401 unauthorized status code if token doesn't exist
  if (!authToken) {
    return NextResponse.json({}, { status: 401 });
  }
  // return a status of 200 ok if Token exists
  return NextResponse.json({}, { status: 200 });
}
