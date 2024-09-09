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
  const browseRef = useRef<HTMLUListElement>(null);

  const router = useRouter();
  // render menu will toggle the menu on and off
  const renderMenu = () => {
    setShowMenu(!showmenu);
  };

  // browser menu will toggle the browse menu on and off
  const browseMenu = () => {
    setShowBrowseMenu(!showBrowseMenu);
  };

  // when the user is in phone view and clicks on the search icon, toggles the search bar
  const handleSearchIconClick = () => {
    setShowSearchBar(window.innerWidth < 640 ? !showSearchBar : false);
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
    <header className="flex flex-row justify-between p-2 text-lg md:pr-[9em] shadow-md">
      {/* Browsing links to help users navigate to various sections */}
      {showBrowseMenu && (
        <>
          <ul
            ref={browseRef}
            className={`absolute top-[6.4em] font-title right-3 md:top-[3.4em] md:left-[32em] z-[10000] bg-white-100 rounded-md w-[10em]`}
          >
            {browse_links.map((link, link_index) => (
              <li
                key={link_index}
                className="my-3 pt-2 hover:bg-stylish-400 text-stylish-400 cursor-pointer border-b-2 border-b-yellow-800 hover:bg-opacity-30"
              >
                <Link
                  href={link === "all books" ? "/" : `/${link}`}
                  className="pl-2"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* This contains the Logo and the Name of the application */}
      <div className="p-2 font-bold font-main text-3xl flex space-x-6">
        <Link href="/" className={`${showSearchBar ? "hidden" : "block"}`}>
          Let&lsquo;s Learn
        </Link>
        <p className="absolute top-[2.4em] md:static font-extralight text-2xl md:text-lg p-1 md:bg-orange-200 bg-opacity-25 hover:bg-opacity-10 transition-opacity">
          <a
            href="http://"
            className=" hover:text-stylish-400 transition-colors"
          >
            My Books
          </a>
        </p>
      </div>
      {/* This contains the search bar and menu icon as well as user profile and login, logout */}
      <div className="flex md:space-x-2">
        <button
          onClick={browseMenu}
          className={`flex flex-row absolute ${
            auth?.isAuthenticated
              ? "top-[4.3em] right-[2em]"
              : "top-[3.4em] right-[2em]"
          } md:static md:p-2`}
        >
          <p className="font-extralight w-fit text-xl">Browse</p>
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
          } w-[15em] md:w-[20em] md:flex flex-row justify-between rounded-md border-r-2 border-orange-200`}
        >
          <form action="">
            <select
              name=""
              id=""
              className=" max-w-[2.7em] h-[2.8em] bg-orange-200 opacity-55 border-r-2 border-black rounded-l-md"
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
              className="pl-1 h-[2.6em] w-[9em] md:w-[14.3em] bg-orange-200 bg-opacity-20 text-black font-normal ml-1 border-r-2 border-black placeholder:text-black placeholder:font-light outline-none"
            />
          </form>
          <div className="md:p-2 md:static absolute top-5 right-[5.5em]">
            <Image
              src="/images/barcode.png"
              alt="barcode reader"
              className="cursor-pointer"
              width={30}
              height={50}
            />
          </div>
        </div>
        {/* search icon */}
        <div className="relative md:-left-28 p-3">
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
            className="hidden sm:block w-[5em] hover:text-green-500 transition-colors p-1 pt-2 font-bold font-main"
          >
            Log in
          </Link>
        )}
        {/* also show the user profile if the user is authenticated */}
        {auth?.isAuthenticated ? (
          <div className="pt-2 font-extralight underline">
            <Image
              src="/images/acct.png"
              className="w-[2em] cursor-pointer"
              title="View Account"
              alt="profile"
              width={70}
              height={30}
            />
          </div>
        ) : (
          <Link
            href="/signup"
            className={`${
              showSearchBar ? "hidden" : "block"
            } text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-main border-solid border-2 border-black mt-1`}
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
              className="absolute bg-white-100 text-stylish-400 shadow-2xl z-[1000] -right-[0.5px] md:right-[1em] w-[11em] md:w-[21em] rounded-t-md h-[100vh]"
            >
              <p className="text-center border-b-2 border-b-yellow-800 font-bold">
                my Let&apos;s learn
              </p>
              <div className="flex justify-between space-x-2 md:space-x-3 py-[2em] p-3">
                {auth?.isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="text-center hover:bg-red-400 hover:text-white-100 hover:border-black transition-all w-[5em] h-[2em] rounded-md font-main border-solid border-2 border-red-400 mt-1"
                  >
                    Log out
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="text-center pt-1 bg-creamy-100 hover:bg-creamy-100 hover:text-blue-500 hover:border-blue-500 transition-all w-[5em] h-[2em] rounded-md font-main text-green-500 border-solid border-2 border-black mt-1"
                  >
                    log in
                  </Link>
                )}
                {auth?.isAuthenticated ? (
                  <div className="pt-2 font-extralight underline">
                    View Profile
                  </div>
                ) : (
                  <Link
                    href="/signup"
                    className="text-center pt-1 bg-green-500 hover:bg-creamy-100 hover:text-green-500 hover:border-green-500 transition-all w-[5em] h-[2em] rounded-md font-main border-solid border-2 border-black mt-1"
                  >
                    JOIN
                  </Link>
                )}
              </div>
              <p className="text-center border-b-2 border-b-yellow-800 font-bold mt-[5em]">
                Browse
              </p>
              <ul className="py-[2em] p-3 font-title">
                {browse_links.map((link, link_index) => (
                  <li
                    key={link_index}
                    className="pt-2 hover:bg-stylish-400 hover:bg-opacity-30"
                  >
                    <Link
                      href={link === "all books" ? "/" : `/${link}`}
                      className="pl-2"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-center border-b-2 border-b-yellow-800 mt-3 font-bold mt-[5em]">
                Contribute
              </p>
              {contribs.map((contrib, contrib_index) => (
                <p
                  key={contrib_index}
                  className="pl-2 shadow-md shadow-green-400 w-fit bg-creamy-100 ml-1aa mt-4 ml-3"
                >
                  <a href="">{contrib}</a>
                </p>
              ))}
            </section>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComp;
