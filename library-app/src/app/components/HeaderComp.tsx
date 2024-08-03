import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";


const AUTHENTICATED = "/api/authenticated";
const LOGOUT_URL = "/api/logout";

const HeaderComp: React.FC = () => {
    const contribs = ["Add a Book"]
    const browse_links = ["all books", "trending", "lists", "My Books"]
    const [showmenu, setShowMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const renderMenu = () => {
        setShowMenu(!showmenu)

    }
    useEffect(() => {
        const checkUserIsAuthenticated = async () => {
            const response = await fetch(AUTHENTICATED);
            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        checkUserIsAuthenticated();
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
    }, [])
    
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
        if (response.ok) {
            router.replace("/");
            setIsLoggedIn(false);
        }
    }

    return (
        <header className="flex flex-row justify-between p-2 text-lg md:pr-[9em]">
            <div className="p-2 font-extrabold text-2xl flex space-x-6">
            {/* This contains the Logo and the Name of the application */}
            <Link href="/">Let&lsquo;s Learn</Link>
            <p className="absolute top-[2.4em] md:static font-extralight text-2xl md:text-lg p-1 md:bg-orange-200 bg-opacity-25 hover:bg-opacity-10 transition-opacity">
                <a href="http://" className=" hover:text-orange-300 transition-colors">My Books</a>
            </p>
            </div>
            <div className="flex md:space-x-2">
                <button className="flex flex-row relative top-[3em] left-[4em] md:static md:p-2">
                <p className="font-extralight font-mono w-fit text-2xl">Browse</p> 
                <div className="p-3 pl-[2px] w-[2em]">
                    <Image src="/images/dropdown.png" alt="drop down" width={30} height={20} className="w-[0.7em]"/>
                </div>
                </button>
            {/* this is the search bar */}
                <div className="hidden w-[15em] md:w-[20em] md:flex flex-row justify-between rounded-md border-r-2 border-orange-200">
                <form action="">
                <select name="" id="" className="h-[2.8em] bg-orange-200 opacity-55 border-r-2 border-black rounded-l-md">
                    <option value="">All</option>
                </select>
                <input type="text" placeholder="Search" className="pl-1 h-[2.6em] w-[9em] md:w-[14.3em] bg-orange-200 bg-opacity-20 text-black font-normal ml-1 border-r-2 border-black placeholder:text-black placeholder:font-light outline-none" />
                </form>
                <div className="p-2">
                <Image src="/images/barcode.png" alt="barcode reader" className="cursor-pointer" width={30} height={50}/>
                </div>
            </div>
            <div className="relative md:-left-28 p-3">
                <Image src="/images/search.png" alt="search icon" className="w-[1.4em] cursor-pointer" width={40} height={50}/>
                </div>
                { 
                    isLoggedIn ? (
                        <button onClick={handleLogout} className="hidden sm:block right-[18em] text-center hover:bg-red-400 hover:text-white hover:border-black transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-red-400 mt-1">Log out</button>
                    ) : (
                        <Link href="/login" className="hidden sm:block w-[5em] hover:text-green-500 transition-colors p-1 pt-2 font-bold font-mono">Log in</Link>           
                    )
                }
            <Link href="/signup" className="hidden sm:block text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</Link>
            <button className="p-2" onClick={renderMenu}>
                <Image src="/images/menu.png" alt="menu button" width={30} height={50} />
            </button>
            { 
                showmenu && (
                    <>
                        <div className="fixed inset-0 bg-black opacity-25 z-10" onClick={() => setShowMenu(false)}></div>
                        <section ref={menuRef} className="absolute bg-orange-200 shadow-2xl z-[1000] -right-[0.5px] md:right-[1em] w-[11em] rounded-t-md h-[20em]">
                            <p className="text-center border-b-2 border-b-yellow-800 font-description">my Let&apos;s learn</p>
                            <div className="flex space-x-2 md:space-x-3 py-2">
                            {
                                isLoggedIn ? (
                                    <button onClick={handleLogout} className="hidden sm:block right-[18em] text-center hover:bg-red-400 hover:text-white hover:border-black transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-red-400 mt-1">Log out</button>
                                ) : (
                                    <Link href="/login" className="text-center pt-1 bg-creamy-100 hover:bg-creamy-100 hover:text-blue-500 hover:border-blue-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">log in</Link>          
                                )         
                            }        
                            <Link href="/signup" className="text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</Link>
                        </div>
                        <p className="text-center border-b-2 border-b-yellow-800 font-description mt-3">Browse</p>
                        <ul>
                            {
                            browse_links.map((link, link_index) => (
                                <li key={link_index} className="pt-2 hover:bg-creamy-100 hover:bg-opacity-20"><Link href={link === "all books" ? "/" : `/${link}`} className="pl-2">{link}</Link></li>
                            ))
                            }
                        </ul>
                        <p className="text-center border-b-2 border-b-yellow-800 font-description mt-3">Contribute</p>
                        {
                            contribs.map((contrib, contrib_index) => (
                            <p key={contrib_index} className="pl-2 shadow-md shadow-green-400 w-fit bg-creamy-100 ml-1aa"><a href="">{ contrib}</a></p>
                            ))
                        }
                        </section>
                    </>
                )
            }
            </div>
        </header>
    );
  };
  
  export default HeaderComp;
  