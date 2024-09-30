import { useAuth } from "@/components/authProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import SearchResultsComp from "./SearchResultsComp";
import { title } from "process";

const LOGOUT_URL = "/api/logout";

const HeaderComp: React.FC = () => {
  const auth = useAuth();
  const contribs = ["Add a Book"];
  const browse_links = [
    { title: "All Books", img: "/images/ff.png" },
    { title: "Trending", img: "/images/trending.png" },
    { title: "My Books", img: "/images/favorite.png" },
  ];
  const search_fields = ["title", "publisher", "year"];
  const [searchQuery, setSearchQuery] = useState("");
  const [showmenu, setShowMenu] = useState(false);
  const [showBrowseMenu, setShowBrowseMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const browseRef = useRef<HTMLUListElement>(null);

  const router = useRouter();
  // render menu will toggle the menu on and off
  const renderMenu = () => {
    setShowMenu(!showmenu);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // browser menu will toggle the browse menu on and off
  const browseMenu = () => {
    setShowBrowseMenu(!showBrowseMenu);
  };

  // when the user is in phone view and clicks on the search icon, toggles the search bar
  const handleSearchIconClick = () => {
    setShowSearchBar(window.innerWidth < 640 ? !showSearchBar : false);
    setShowSearchResults(!showSearchResults);
  };
  useEffect(() => {
    // handles closing the menu bar when the user clicks outside of this refrence
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    const handleClosingBrowsingMenu = (e: MouseEvent) => {
      if (browseRef.current && !browseRef.current.contains(e.target as Node)) {
        setShowBrowseMenu(false);
      }
    };
    // add event listener for closing menu tab
    document.addEventListener("mousedown", handleClickOutside);

    // add event listener for closing browser tab
    document.addEventListener("mousedown", handleClosingBrowsingMenu);

    return () => {
      //remove event listener for closing menu tab
      document.removeEventListener("mousedown", handleClickOutside);
      //remove event listener for closing browsing tab
      document.removeEventListener("click", handleClosingBrowsingMenu);
    };
  }, []);

  async function handleLogout(event: React.MouseEvent<HTMLButtonElement>) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    const response = await fetch(LOGOUT_URL, requestOptions);
    const data = await response.json();
    if (response.ok) {
      auth?.logout();
      router.replace("/");
    }
  }

  return (
    <header className="bg-stylish-500 flex flex-row justify-between text-stylish-400 p-2 text-lg md:pr-[9em] shadow-md">
      {/* Browsing links to help users navigate to various sections */}
      {showBrowseMenu && (
        <>
          <ul
            ref={browseRef}
            className={`absolute top-[6.4em] font-body right-3 md:top-[3.4em] md:left-[29em] z-[10000] bg-white-100 rounded-md w-[15em] p-2`}
          >
            {browse_links.map((link, link_index) => (
              <li key={link_index} className="flex hover:bg-stylish-600 border-b-2 border-b-stylish-600 hover:bg-opacity-20 transition-all space-x-14 pl-2">
                <Image src={link.img} alt={link.title} className="w-[2em] h-[2em] mt-4" width={300} height={30} />
                <Link
                  href={link.title === "all books" ? "/" : `/${link.title}`}
                  className="block my-3 pl-2 text-2xl pt-2 text-stylish-600 font-semibold cursor-pointer "
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* This contains the Logo and the Name of the application */}
      <div className="p-2 font-bold font-main text-stylish-400 md:text-3xl flex space-x-6">
        <div className="flex space-x-1">
          <Image
            src="/images/logo.png"
            className={`${
              showSearchBar ? "hidden" : "block"
            } w-[1em] md:w-[2em] md:h-[1em] h-6`}
            alt="logo"
            width={40}
            height={30}
          />
          <Link href="/" className={`${showSearchBar ? "hidden" : "block"}`}>
            Let&lsquo;s Learn
          </Link>
        </div>
        {auth?.isAuthenticated && (
          <p className="absolute top-[5em] md:static ">
            <Link
              href="/mybooks"
              className="font-extralight transition-all text-2xl md:text-lg p-1 bg-stylish-300 rounded-tr-3xl rounded-bl-3xl hover:md:bg-blue-600 hover:bg-opacity-10 hover:text-white-100 border-2 border-stylish-400"
            >
              My Books
            </Link>
          </p>
        )}
      </div>
      {/* This contains the search bar and menu icon as well as user profile and login, logout */}
      <div className="flex md:space-x-2">
        <button
          onClick={browseMenu}
          className={`flex flex-row absolute ${
            auth?.isAuthenticated
              ? "top-[4.3em] right-[2em]"
              : "top-[5em] right-[2em]"
          } md:static md:p-2`}
        >
          <p className="font-extralight w-fit">Browse</p>
          <div className="p-2 pl-[2px] mt-[2px] w-[2em]">
            {showBrowseMenu ? (
              <Image
                src="/images/up.png"
                alt="drop down"
                width={30}
                height={20}
                className="w-[0.7em]"
              />
            ) : (
              <Image
                src="/images/dropdown.png"
                alt="drop down"
                width={30}
                height={20}
                className="w-[0.7em]"
              />
            )}
          </div>
        </button>

        {/* this is the search bar */}
        <div
          className={`${
            showSearchBar ? "block" : "hidden"
          } w-[15em] md:w-[20em] md:flex flex-row justify-between rounded-md`}
        >
          <form action="">
            <select
              name=""
              id=""
              className=" max-w-[2.7em] h-[2.8em] bg-white-100 opacity-55 border-r-2 border-black rounded-l-md"
            >
              <option value="">All</option>
              {search_fields.map((field, field_index) => (
                <option
                  key={field_index}
                  className="my-3 pt-2 hover:bg-creamy-100 border-b-2 hover:bg-opacity-60"
                >
                  {field}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search"
              className="pl-2 h-[2.6em] w-[10em] md:w-[16.9em] bg-white-100 bg-opacity-70 text-black font-normal ml-1 border-r-2 border-black placeholder:text-black placeholder:font-light outline-none"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </form>
          {showSearchResults && (
            <SearchResultsComp
              toggleSearchResults={setShowSearchResults}
              search_query={searchQuery}
            />
          )}
        </div>
        {/* search icon */}
        <div className="relative md:-left-[3.4em] p-3">
          <Image
            src="/images/search.png"
            alt="search icon"
            onClick={handleSearchIconClick}
            className="w-[1.4em] cursor-pointer"
            width={40}
            height={50}
          />
        </div>
        {/* show the logout if a user is authenticate else, login */}
        {auth?.isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="hidden sm:block right-[18em] text-center hover:bg-red-400 hover:text-white hover:border-black transition-all w-[5em] h-[2em] rounded-md font-main border-solid border-2 border-red-400 mt-1"
          >
            Log out
          </button>
        ) : (
          <Link
            href="/login"
            className="hidden sm:block w-[5em] hover:text-stylish-600 transition-colors p-1 pt-2 font-semibold font-body"
          >
            LOGIN
          </Link>
        )}
        {/* also show the user profile if the user is authenticated */}
        {auth?.isAuthenticated ? (
          <Link href="/account" className="pt-2 font-extralight underline">
            <Image
              src="/images/acct.png"
              className="w-[2em] cursor-pointer"
              title="View Account"
              alt="profile"
              width={70}
              height={30}
            />
          </Link>
        ) : (
          <Link
            href="/signup"
            className={`${
              showSearchBar ? "hidden" : "block"
            } text-center pt-1 bg-stylish-600 text-white-100 hover:bg-creamy-100 hover:text-stylish-600 hover:border-stylish-600 transition-all w-[5em] h-[2em] rounded-md font-body font-semibold border-solid border-2 border-black mt-1`}
          >
            JOIN
          </Link>
        )}
        {/* menu icon */}
        <button
          className={`p-2 ${
            auth?.isAuthenticated ? "absolute md:static" : "static"
          } top-[4em] right-1`}
          onClick={renderMenu}
          title="Pop Up Menu"
        >
          <Image
            src="/images/menu.png"
            alt="menu button"
            width={30}
            height={50}
          />
        </button>
        {showmenu && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-25 z-10"
              onClick={() => setShowMenu(false)}
            ></div>
            <section
              ref={menuRef}
              className="absolute flex flex-col items-center bg-white-100 text-stylish-600 shadow-2xl z-[1000] -right-[0.5px] md:right-[1em] w-[17em] md:w-[21em] rounded-t-md md:h-[100vh] h-fit"
            >
              <p className="text-center text-3xl w-[10em] border-b-2 border-b-stylish-600 font-sub">
                my Let&apos;s learn
              </p>
              <div className="flex w-[15em] justify-between space-x-10 md:space-x-3 py-[2em] p-3">
                {auth?.isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-center hover:bg-red-400 hover:text-white-100 hover:border-black transition-all w-[8em] h-[2em] rounded-md font-main border-solid border-2 border-red-400 mt-1"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-center pt-1 bg-stylish-600 w-[7em] h-[2em] rounded-md font-body font-light text-white-100 border-solid border-2 border-stylish-600 mt-1"
                  >
                    LOGIN
                  </Link>
                )}
                {auth?.isAuthenticated ? (
                  <div className="pt-2 font-extralight underline">
                    View Profile
                  </div>
                ) : (
                  <Link
                    href="/signup"
                    className="text-center pt-1 text-white-100 bg-stylish-600 w-[7em] h-[2em] rounded-md font-body font-semibold mt-1"
                  >
                    JOIN
                  </Link>
                )}
              </div>
              <p className="text-center text-3xl w-[10em] border-b-2 border-b-stylish-600 font-sub mt-[3em]">
                Browse
              </p>
              <ul className="py-[2em] flex flex-col items-start w-[15em] p-3 font-body">
                {browse_links.map((link, link_index) => (
                  <li
                    key={link_index}
                    className="pt-2 flex text-2xl font-semibold hover:bg-stylish-600 hover:bg-opacity-20 transition-all p-3 w-[10em]"
                  >
                    <Image
                      src={link.img}
                      alt={link.title}
                      width={30}
                      height={30}
                    />
                    <Link
                      href={link.title === "all books" ? "/" : `/${link.title}`}
                      className="pl-2"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-center w-[10em] text-3xl border-b-2 border-b-stylish-600 font-sub mt-[2em]">
                Contribute
              </p>
              {contribs.map((contrib, contrib_index) => (
                <div
                  key={contrib_index}
                  className="flex flex-col items-start w-[15em]"
                >
                  <Link
                    href=""
                    className="text-center pt-1 bg-stylish-600 w-[7em] h-[2em] rounded-md font-body font-light text-white-100 border-solid border-2 border-stylish-600 mt-10"
                  >
                    Add a Book
                  </Link>
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComp;
