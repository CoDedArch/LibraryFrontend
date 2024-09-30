"use client";
import { useAuth } from "@/components/authProvider";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import LogoComp from "../components/LogoComp";

const LOGIN_URL = "/api/login";
export default function Login() {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const success_styles = "bg-green-500 bg-opacity-30";
  const error_styles = "bg-red-400 bg-opacity-50";
  const success_text = "Login Successfull";
  const error_text = "Sorry, incorrect username or password";

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>
  ) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    try {
      const response = await fetch(LOGIN_URL, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        console.log("Loggedin successfully");
        auth?.login();
        setUsername("");
        setPassword("");
        setMessage(success_text);
        setMessageStyle(success_styles);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
        window.location.href = "/";
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
    <>
      <LogoComp />
      <main className="h-[100vh] flex flex-col justify-center bg-stylish-500">
        <div
          className={`absolute top-[10em] md:top-[7em] right-2 md:right-[10em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 ${
            showMessage ? "" : "hidden"
          } ${messageStyle}`}
        >
          <p>{message}</p>
        </div>
        <section className="md:flex text-stylish-400 md:mx-[7em] bg-opacity-25 h-fit justify-between">
          {/* <div className="relative hidden w-1/2 md:flex flex-col justify-center border-r-2 border-r-creamy-100">
            <Image
              src="/images/loginImg.jpg"
              alt="login pic"
              width={400}
              height={70}
              className="w-[30em] opacity-30"
            />
            <div className="absolute  p-2 text-justify bg-opacity-35 font-bold">
              <p className="text-5xl font-main">
                WELCOME <span className="text-orange-400">BACK!!</span>
              </p>
              <h2 className="pt-2 text-xl ">
                Let&apos;s Learn, offers you a collection of it&apos;s digital
                library contents.{" "}
                <span className="font-description font-bold text-stylish-200">
                  Read
                </span>{" "}
                our eBook,{" "}
                <span className="font-description font-bold text-stylish-200">
                  Listen{" "}
                </span>
                to our audiobook collections even as you are empowered to seek
                knowledge for yourself.
              </h2>
            </div>
          </div> */}
          <div className="md:w-1/2 flex flex-col justify-center  items-center pb-3">
            <div className="mb-2">
              <h1 className="text-5xl font-sub text-stylish-400">
                Welcome Back!
              </h1>
              <p>Have an account already? jump right in!</p>
            </div>
            <form
              onSubmit={(event) =>
                handleSubmit(event, setUsername, setPassword)
              }
              className="p-8 bg-white-100 rounded-md shadow-2xl"
            >
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                id=""
                placeholder="Username"
                className="w-[17em] h-[3em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2 placeholder:font-bold placeholder:text-black block mb-2"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                id=""
                placeholder="Password"
                className="w-[17em] h-[3em] md:w-[25em] border-2 border-black rounded-md outline-none pl-2  placeholder:font-bold placeholder:text-black"
              />
              <div className="flex mt-2 justify-between">
                <div>
                  <input type="checkbox" name="" id="" /> remember me
                </div>
                <div>
                  <Link
                    href=""
                    className="font-bold hover:underline hover:transition-all"
                  >
                    {" "}
                    Forgot password
                  </Link>
                </div>
              </div>
              <br />
              <button
                type="submit"
                className="bg-stylish-600 text-white-100 font-body font-extrabold w-[17em] h-[2.5em] md:w-[25em] rounded-md border-2 border-black mt-2"
              >
                Login
              </button>
              
            <div className="mt-2 text-center">
              <p className="font-sub text-center">OR</p>
            </div>
            <button
              type="submit"
              className="bg-black text-white-100 font-body font-extrabold transition-all p-2 space-x-5 md:space-x-20 flex h-[2.7em] w-[17em] md:w-[25em] rounded-md border-solid border-2 border-black mt-1"
            >
              <Image
                src="/images/google.png"
                alt="google icon"
                width={30}
                  height={20}
                  className="pb-2"
              />
              <span className="">Login with Google</span>
              </button>
              <div className="mt-5">
                Else <Link href="/signup" className="text-blue-500 underline hover:text-blue-700 hover:font-bold">Sign Up</Link>
              </div>
            </form>
          </div>
          <Image
            src="/images/landing.png"
            alt="login logo"
            className="w-[40em] h-[30em] hidden md:block"
            width={1000}
            height={60}
          />
        </section>
      </main>
    </>
  );
}
