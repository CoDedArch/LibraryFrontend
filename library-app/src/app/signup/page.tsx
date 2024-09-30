"use client";
import { headers } from "next/headers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/authProvider";
import LogoComp from "../components/LogoComp";

const SIGNUP_URL = "/api/signup";
export default function Signup() {
  const auth = useAuth();
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [ageLimitError, setAgeLimitError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    date_of_birth: "",
    city: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // validate passwords
    if (name === "confirmpassword" && value !== formData.password) {
      setFormIsValid(false);
    }
  };

  //show password when the user wants to see the password
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const success_styles = "bg-green-500 bg-opacity-30";
  const error_styles = "bg-red-400 bg-opacity-50";
  const success_text = "Join ...";
  const error_text = "Account Creation Failed";
  const login_failed_text = "Auto Loging in Failed!";

  const validate_date_of_birth = () => {
    const birthDate = new Date(formData.date_of_birth);
    const currentDate = new Date();
    const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
    if (ageInYears < 10) {
      setAgeLimitError(true);
    } else {
      setAgeLimitError(false);
      setFormIsValid(true);
    }
  };

  useEffect(() => {}, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event, event.target);
    validate_date_of_birth();
    if (formIsValid) {
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
      const signupResponse = await fetch(SIGNUP_URL, requestOptions);
      const signupData = await signupResponse.json();
      if (signupResponse.ok) {
        const loginData = {
          username: objectFromForm.username,
          password: objectFromForm.password,
        };
        setMessage(success_text);
        setMessageStyle(success_styles);
        setShowMessage(true);
        const loginResponse = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const loginResult = await loginResponse.json();
        if (loginResponse.ok) {
          try {
            auth?.login();
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 2000);
            window.location.href = "/";
          } catch (error) {
            console.log("Error");
          }

          // Redirect or update UI as needed
        } else {
          setMessage(login_failed_text);
          setMessageStyle(error_styles);
          setShowMessage(true);
          setTimeout(() => setShowMessage(false), 3000);
        }
      } else if (signupResponse.status == 500) {
        setMessage(signupData["detail"]);
        setShowError(true);
      }
    }
  }
  return (
    <main className="bg-stylish-500 pb-[5em]">
      <LogoComp />
      <div
        className={`absolute top-[10em] md:top-[7em] right-2 md:left-[15em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 z-[10000] ${
          showMessage ? "" : "hidden"
        } ${messageStyle}`}
      >
        <p>{message}</p>
      </div>
      <section className="mt-[5em] md:mt-[7em] md:flex bg-white-100 md:mx-[15em] h-fit justify-between rounded-md">
        <div className="relative hidden w-1/2 md:flex flex-col justify-center px-7 border-r-2 border-r-black">
          {/* <div className="bg-stylish-400">
            <Image src="/images/signupImage.jpg" alt="signup image" width={400} height={100} className="w-[39em] h-[40em] opacity-25"/>
          </div> */}
          <div className="absolute p-1">
          <p className="text-5xl font-sub">
            JOIN{" "}
            <span className="text-stylish-600 font-extrabold">
              LET&apos;S LEARN
              </span>{" "}
              <span className="text-stylish-200">LIBRARY</span>
          </p>
          <h2 className="pt-2 text-xl font-bold">
            Get your free Let&apos;s learn Library card and download, borrow and
            stream audio books for free as a{" "}
            <span className=" italic font-sub text-stylish-600 underline">Student</span>
          </h2>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center pb-3">
          <form onSubmit={handleSubmit} className="p-2">
            <p className={`text-red-500 ${showError ? "block" : "hidden"}`}>
              {message}
            </p>
            <legend className="font-bold">Name</legend>
            <input
              required
              type="text"
              name="fullname"
              placeholder="full name"
              className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
              value={formData.fullname}
              onChange={handleChange}
            />
            <legend className="font-bold pt-2">Date of Birth</legend>
            <input
              required
              type="date"
              name="date_of_birth"
              id=""
              placeholder="date of birth"
              className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
            <p className={`text-red-500 ${ageLimitError ? "block" : "hidden"}`}>
              You must be at least 10 years old to submit the form.
            </p>
            <legend className="font-bold pt-2">City</legend>
            <input
              required
              type="text"
              name="city"
              placeholder="city:where you live"
              className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
              value={formData.city}
              onChange={handleChange}
            />
            <legend className="font-bold pt-2">Username</legend>
            <input
              required
              type="text"
              name="username"
              placeholder="name will be visible to other users"
              className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
              value={formData.username}
              onChange={handleChange}
            />
            <legend className="font-bold pt-2">Email</legend>
            <input
              required
              type="email"
              name="email"
              id=""
              placeholder="Ex: johnDoe@gmail.com"
              className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative">
              <legend className="font-bold pt-2">Password</legend>
              <input
                required
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                id=""
                className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none border-2 border-black pl-2"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Image
                src="/images/showpassword.png"
                alt="show password"
                width={30}
                height={30}
                className="w-[1.3em] absolute top-10 right-2 hover:cursor-pointer"
                onClick={handleTogglePassword}
              />
              <legend className="font-bold pt-2">Confirm Password</legend>
              <input
                required
                type={`${showPassword ? "text" : "password"}`}
                name="confirmpassword"
                id=""
                className="w-[17em] h-[2.5em] md:w-[25em] rounded-md outline-none pl-2 border-2 border-black"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            </div>
            {formData.password &&
              formData.confirmpassword &&
              formData.password !== formData.confirmpassword && (
                <p className="text-red-500">Passwords do not match.</p>
              )}
            <br />
            <button
              type="submit"
              className="bg-stylish-600 text-white-100 w-[17em] h-[2.5em] hover:shadow-md transition-all md:w-[25em] rounded-md font-body font-extrabold border-solid border-2 border-black mt-2"
            >
              {" "}
              Join{" "}
            </button>
          </form>
          <div className="flex">
            <p className="font-sub">OR</p>
          </div>
          <button
            type="submit"
            className="bg-black text-white-100 p-2 space-x-5 md:space-x-20 flex h-[2.7em] w-[17em] md:w-[25em] rounded-md font-body font-extrabold border-solid border-2 border-black mt-1"
          >
            <Image
              src="/images/google.png"
              alt="google icon"
              width={30}
              height={20}
            />
            <span className="pt-1">Join with Google</span>
          </button>
          <div></div>
        </div>
      </section>
    </main>
  );
}
