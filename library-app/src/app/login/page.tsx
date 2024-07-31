import Image from "next/image";
import Link from "next/link";
export default function Login() {
    return (
        <main className="h-[100vh] flex flex-col justify-center">
            <section className="md:flex bg-orange-200 md:mx-[7em] bg-opacity-25 h-fit justify-between rounded-md shadow-md">
                <div className="hidden w-1/2 md:flex flex-col justify-center px-7 border-r-2 border-r-creamy-100">
                    <p className="text-5xl">WELCOME <span className="text-orange-400">BACK!!</span></p>
                    <h2 className="pt-2 text-xl font-light">Let&apos;s Learn, offers you a collection of it&apos;s digital library contents. <span className="font-description font-bold text-blue-900">Read</span> our eBook, <span className="font-description font-bold text-blue-900">Listen </span>and audiobook collections even as you are empowered to seek knowledge for yourself.
                    </h2>
                </div>
                <div className="md:w-1/2 flex flex-col items-center pb-3">
                    <form action="" className="p-2">
                        <legend className="font-bold pt-2">Email</legend>
                        <input type="email" name="" id="" placeholder="Ex: johnDoe@gmail.com" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        
                        <legend className="font-bold pt-2">Password</legend>
                        <input type="password" name="" id="" className="w-[17em] h-[2em] md:w-[25em] rounded-md outline-none pl-2" />
                        <br />
                        <button type="submit" className="bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[17em] h-[2em] md:w-[25em] rounded-md font-mono border-solid border-2 border-black mt-2">Sign Up</button>
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