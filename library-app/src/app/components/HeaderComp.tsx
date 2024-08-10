import { useAuth } from "@/components/authProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const LOGOUT_URL = "/api/logout";

const HeaderComp: React.FC = () => {
    const auth = useAuth();
    const contribs = ["Add a Book"];
    const browse_links = ["all books", "trending", "lists", "My Books"];
    const search_fields = ["title", "publisher", "year"];
    const [showmenu, setShowMenu] = useState(false);
    const [showBrowseMenu, setShowBrowseMenu] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const renderMenu = () => {
        setShowMenu(!showmenu);
    }

    const browseMenu = () => {
        setShowBrowseMenu(!showBrowseMenu);
    }
    const handleSearchIconClick = () => {
        setShowSearchBar(window.innerWidth < 640 ? !showSearchBar : false);
    };
    useEffect(() => {
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
            auth?.logout()
            router.replace("/");
        }
    }

    return (
        <header className="flex flex-row justify-between p-2 text-lg md:pr-[9em]">
            {/* Browsing links to help users navigate to various sections */}
            <ul className={`${showBrowseMenu ? 'block':'hidden'} absolute top-[6.4em] right-3 md:top-[3.4em] md:left-[32em] z-[10000] bg-orange-200 md:bg-opacity-80 rounded-md w-[10em]`}>
                {
                    browse_links.map((link, link_index) => (
                        <li key={link_index} className="my-3 pt-2 hover:bg-creamy-100 border-b-2 hover:bg-opacity-60"><Link href={link === "all books" ? "/" : `/${link}`} className="pl-2">{link}</Link></li>
                    ))
                }
            </ul>

            {/* This contains the Logo and the Name of the application */}
            <div className="p-2 font-extrabold text-2xl flex space-x-6">
            <Link href="/" className={`${showSearchBar ? 'hidden' : 'block'}`}>Let&lsquo;s Learn</Link>
            <p className="absolute top-[2.4em] md:static font-extralight text-2xl md:text-lg p-1 md:bg-orange-200 bg-opacity-25 hover:bg-opacity-10 transition-opacity">
                <a href="http://" className=" hover:text-orange-300 transition-colors">My Books</a>
            </p>
            </div>
            {/* This contains the search bar and menu icon as well as user profile and login, logout */}
            <div className="flex md:space-x-2">

                <button onClick={browseMenu} className={`flex flex-row absolute ${auth?.isAuthenticated ? 'top-[4.3em] right-[2em]' : 'top-[3.4em] right-[2em]'} md:static md:p-2`}>
                    <p className="font-extralight font-mono w-fit text-2xl">Browse</p> 
                    <div className="p-3 pl-[2px] w-[2em]">
                        { 
                            showBrowseMenu ? (
                                    <Image src="/images/up.png" alt="drop down" width={30} height={20} className="w-[0.7em]"/>
                            ) : (
                                    
                                    <Image src="/images/dropdown.png" alt="drop down" width={30} height={20} className="w-[0.7em]"/>
                            )
                        }
                    </div>
                </button>

            {/* this is the search bar */}
                <div className={`${showSearchBar ? 'block' : 'hidden'} w-[15em] md:w-[20em] md:flex flex-row justify-between rounded-md border-r-2 border-orange-200`}>
                    <form action="">
                    <select name="" id="" className=" max-w-[2.7em] h-[2.8em] bg-orange-200 opacity-55 border-r-2 border-black rounded-l-md">
                            <option value="">All</option>
                            {
                                search_fields.map((field, field_index) => (
                                    <option key={field_index} className="my-3 pt-2 hover:bg-creamy-100 border-b-2 hover:bg-opacity-60">{field}</option>
                                ))
                             }
                    </select>
                    <input type="text" placeholder="Search" className="pl-1 h-[2.6em] w-[9em] md:w-[14.3em] bg-orange-200 bg-opacity-20 text-black font-normal ml-1 border-r-2 border-black placeholder:text-black placeholder:font-light outline-none" />
                    </form>
                    <div className="md:p-2 md:static absolute top-5 right-[5.5em]">
                    <Image src="/images/barcode.png" alt="barcode reader" className="cursor-pointer" width={30} height={50}/>
                    </div>
                </div>
                {/* search icon */}
                <div className="relative md:-left-28 p-3">
                    <Image src="/images/search.png" alt="search icon" onClick={handleSearchIconClick} className="w-[1.4em] cursor-pointer" width={40} height={50} />
                </div>
                {/* show the logout if a user is authenticate else, login */}
                { 
                    auth?.isAuthenticated ? (
                        <button onClick={handleLogout} className="hidden sm:block right-[18em] text-center hover:bg-red-400 hover:text-white hover:border-black transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-red-400 mt-1">Log out</button>
                    ) : (
                        <Link href="/login" className="hidden sm:block w-[5em] hover:text-green-500 transition-colors p-1 pt-2 font-bold font-mono">Log in</Link>           
                    )
                }
                {/* also show the user profile if the user is authenticated */}
                { 
                    auth?.isAuthenticated ? (
                        <div className="pt-2 font-extralight underline">
                            <Image src="/images/acct.png" className="w-[2em] cursor-pointer" title="View Account" alt="profile" width={70} height={30} />
                        </div>           
                    ) : (
                            <Link href="/signup" className={`${showSearchBar ? 'hidden' : 'block' } text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1`}>JOIN</Link>                    
                    )  
                }
                {/* menu icon */}
            <button className={`p-2 ${auth?.isAuthenticated ? 'absolute md:static':'static'} top-[4em] right-1`} onClick={renderMenu} title="Pop Up Menu">
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
                                auth?.isAuthenticated ? (
                                    <button onClick={handleLogout} className="text-center hover:bg-red-400 hover:text-white hover:border-black transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-red-400 mt-1">Log out</button>
                                ) : (
                                    <Link href="/login" className="text-center pt-1 bg-creamy-100 hover:bg-creamy-100 hover:text-blue-500 hover:border-blue-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">log in</Link>          
                                )         
                            }
                            { 
                                auth?.isAuthenticated ? (
                                    <div className="pt-2 font-extralight underline">View Profile</div>           
                                ) : (
                                    <Link href="/signup" className="text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-mono border-solid border-2 border-black mt-1">JOIN</Link>                    
                                )  
                            }        
                            
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
  