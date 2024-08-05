import { deleteToken } from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // delete the user access token to log out the user
  deleteToken();
  // and return a 200 ok
  return NextResponse.json({}, { status: 200 });
}
