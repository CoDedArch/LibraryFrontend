import { getToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";


export async function GET(request:Request) {
    const authToken = getToken()
    if (!authToken) {
        return NextResponse.json({}, {status: 401})
    }

    return NextResponse.json({}, {status:200})
}