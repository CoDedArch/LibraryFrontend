import Image from "next/image";
export default function Signup() {
    return (
        <>
            <section className="mt-[3em] md:mt-0 md:flex bg-orange-200 md:mx-[15em] bg-opacity-25 h-fit justify-between rounded-md">
                <div className="hidden w-1/2 md:flex flex-col justify-center px-7 border-r-2 border-r-creamy-100">
                    <p className="text-5xl">sign up</p>
                    <h2 className="pt-2 text-xl font-light">Get your free Let&apos;s learn Library card and download, borrow and stream 
                        audio books for free as a <span className=" italic font-extrabold underline">Student</span>
                    </h2>
                </div>
                <div className="md:w-1/2 flex flex-col items-center pb-3">
                    <form action="" className="p-2">
                        <legend className="font-bold">Name</legend>
                        <input type="text" placeholder="full name"  className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2"/>
                        <legend className="font-bold pt-2">Date of Birth</legend>
                        <input type="date" name="" id="" placeholder="date of birth" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">City</legend>
                        <input type="text" placeholder="city:where you live" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">Email</legend>
                        <input type="email" name="" id="" placeholder="Ex: johnDoe@gmail.com" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">Visible Name</legend>
                        <input type="text" placeholder="name will be visible to other users" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">Password</legend>
                        <input type="password" name="" id="" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <legend className="font-bold pt-2">Confirm Password</legend>
                        <input type="password" name="" id="" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <br />
                        <button type="submit" className="bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[17em] h-[2em] md:w-[25em] rounded-md font-mono border-solid border-2 border-black mt-2">Sign Up</button>
                    </form>
                    <div className="flex">
                        <p>OR</p>
                    </div>
                    <button type="submit" className="hover:bg-blue-200 hover:bg-opacity-50 transition-all p-2 space-x-5 md:space-x-20 flex h-fit   w-[17em] md:w-[25em] rounded-md font-mono border-solid border-2 border-black mt-1">
                        <Image src="/images/google.png" alt="google icon" width={30} height={20} />
                        <span className="pt-1">Sign in with Google</span>    
                    </button>
                    <div>

                    </div>
                </div>
            </section>
        </>
    )
}