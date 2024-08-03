"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

// const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair"
const LOGIN_URL = "/api/login"
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const success_styles = "bg-green-500 bg-opacity-30";
    const error_styles = "bg-red-400 bg-opacity-50";
    const success_text = "Login Successfull";
    const error_text = "Sorry, incorrect username or password";

    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, setUsername: React.Dispatch<React.SetStateAction<string>>, setPassword: React.Dispatch<React.SetStateAction<string>>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const objectFromForm = Object.fromEntries(formData);
        const jsonData = JSON.stringify(objectFromForm);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        };
    
        try {
            const response = await fetch(LOGIN_URL, requestOptions);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                console.log("Logged int successfully");
                setUsername('');
                setPassword('');
                setMessage(success_text);
                setMessageStyle(success_styles);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3500);
                window.location.href = '/';
                // Handle successful login (e.g., save token, redirect user)
            } else {
                console.error("Login failed:", data);
                // Handle login failure (e.g., show error message)
                setMessage(error_text);
                setMessageStyle(error_styles);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 3000);
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Handle network or other errors
            setMessage("An error occurred during login.");
            setMessageStyle(error_styles);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
        }
    }
    return (
        <main className="h-[100vh] flex flex-col justify-center">
            <div className={`absolute top-[10em] md:top-[7em] right-2 md:right-[10em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 ${showMessage ? '' : 'hidden'} ${messageStyle}`}>
                <p>{message}</p>
            </div>
            <section className="md:flex bg-orange-200 md:mx-[7em] bg-opacity-25 h-fit justify-between rounded-md shadow-md">
                <div className="hidden w-1/2 md:flex flex-col justify-center px-7 border-r-2 border-r-creamy-100">
                    <p className="text-5xl">WELCOME <span className="text-orange-400">BACK!!</span></p>
                    <h2 className="pt-2 text-xl font-light">Let&apos;s Learn, offers you a collection of it&apos;s digital library contents. <span className="font-description font-bold text-blue-900">Read</span> our eBook, <span className="font-description font-bold text-blue-900">Listen </span>to our audiobook collections even as you are empowered to seek knowledge for yourself.
                    </h2>
                </div>
                <div className="md:w-1/2 flex flex-col items-center pb-3">
                    <form onSubmit={(event) => handleSubmit(event, setUsername, setPassword)} className="p-2">
                        <legend className="font-bold pt-2">Username</legend>
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required id="" placeholder="Ex: johnDoe" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">Password</legend>
                        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required id="" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <br />
                        <button type="submit" className="bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[17em] h-[2em] md:w-[25em] rounded-md font-mono border-solid border-2 border-black mt-2">Login</button>
                        <div className="flex mt-2 justify-between">
                            <div ><input type="checkbox" name="" id="" /> remember me</div>
                            <div>
                                <Link href="" className="font-bold hover:underline hover:transition-all"> Forgot password</Link>
                            </div>
                        </div>
                    </form>
                    <div className="flex">
                        <p>OR</p>
                    </div>
                    <button type="submit" className="hover:bg-blue-200 hover:bg-opacity-50 transition-all p-2 space-x-5 md:space-x-20 flex h-fit   w-[17em] md:w-[25em] rounded-md font-mono border-solid border-2 border-black mt-1">
                        <Image src="/images/google.png" alt="google icon" width={30} height={20} />
                        <span className="pt-1">login with Google</span>    
                    </button>
                    <div>
                    </div>
                </div>
            </section>
        </main>
    )
}