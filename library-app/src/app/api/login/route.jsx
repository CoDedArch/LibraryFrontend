import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


const Ninja_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"
export async function POST(request) {
    const myAuthToken = cookies().get('auth-token')
    console.log(myAuthToken.value)
    
    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData);
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    };

    try {
        const response = await fetch(Ninja_API_LOGIN_URL, requestOptions);
        const responseData = await response.json();
        if (response.ok) {
            console.log("Logged in successfully");
            const authToken =  responseData.access
            cookies().set(
                {
                    name: 'auth-token',
                    value: authToken,
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge:3600,
                }
            ) 
            // Handle successful login (e.g., save token, redirect user)
        } else {
            console.error("Login failed:");
            // Handle login failure (e.g., show error message)
        }
    } catch (error) {
        console.error("Error during login:", error);
        // Handle network or other errors
    }
    // const authToken = cookies().get("auth-token")
    
    return NextResponse.json({ "hello": "world"}, {status:200})
}