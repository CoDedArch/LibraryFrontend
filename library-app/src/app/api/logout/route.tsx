import { deleteToken } from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  deleteToken();
  return NextResponse.json({}, { status: 200 });
}
