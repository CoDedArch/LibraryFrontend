"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/authProvider";


// const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"
const LOGOUT_URL = "/api/logout";
export default function Logout() {
    const auth = useAuth();
    const router = useRouter()
    async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ""
    };
    
        
    const response = await fetch(LOGOUT_URL, requestOptions);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        console.log("Logged out");
        auth?.logout();
        router.replace("/login");
    }
        
    }
    return (
        <main className="h-[100vh] flex flex-col justify-center">
            <button onClick={handleLogout} className="hidden sm:block text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</button>
        </main>
    )
}