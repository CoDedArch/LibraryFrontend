"use client"

// components/BookComp.tsx
import React, { use } from 'react';
import Image from 'next/image';
import { Book as BookType } from './types';
import ActionsComp from './ActionsComp';
import { useState, useEffect} from 'react';
import { useAuth } from '@/components/authProvider';
import next from 'next';

interface BookProps {
    book: BookType;
}

const LeftBookComp: React.FC<BookProps> = ({ book }) => {
    const auth = useAuth();
    const [showPrompt, setShowPrompt] = useState(false);
    const [rated, setIsRated] = useState(false);
    const [error, setError] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);
    const [bookpages, setbookpages] = useState([]);
    const [currentpage, setCurrentPage] = useState(0);
    const [nextPage, setNextPage] = useState(1);
    const [previousPage, setPrevious] = useState(-1);
    const [message, setShowMessage] = useState('');
    const [streamingMode, setStreamingMode] = useState(false);

    const moveNextPage = () => {
        setCurrentPage(nextPage);
        setNextPage(nextPage + 1);
        setPrevious(nextPage - 1);
        console.log(`previous is ${currentpage}`)
    }
    const movePrevPage = () => {
        setCurrentPage(previousPage);
        setNextPage(previousPage + 1);
        setPrevious(previousPage - 1);
    }

    const handleBookStreaming = async () => {
        const url_to_pages_route = "/api/bookPages/"
        const options = {
            methods: "GET",
            headers: {
                "content-type": "application/json"
            }
        }
        try {
            const response = await fetch(`${url_to_pages_route}${book.id}`, options)
            const routeData = await response.json()
            if (response.ok) {
                setbookpages(routeData.pages);
                setStreamingMode(true);
            }
            else {
                setError(true);
                setShowPrompt(true);
                setShowMessage(routeData.message);
                setTimeout(() => {
                setShowPrompt(false);
                }, 5000)
            }
        }
        catch (error) {
            setShowPrompt(true);
            setError(true);
            setShowMessage("Internal Server Error, try checking after sometime")
            setTimeout(() => {
                setShowPrompt(false);
            }, 5000)
        }
    }

    useEffect(() => {
        if (auth?.isAuthenticated) {
            fetchUserRating(book.id);
        }
    }, [auth?.isAuthenticated, book.id])
    
    const fetchUserRating = async (book_id:number) => {
        const user_rating_url = `/api/userrating/${book_id}`
        const get_options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
        try {
            const response = await fetch(user_rating_url, get_options)
            const responseData = await response.json()
            console.log(responseData)
            if (response.ok) {
                const userRatingValue = responseData.user_rating.user_ratings[0].value;
                setIsRated(true)
                setSelectedRating(userRatingValue)
            }
            else { console.log("It doesn't work") }
        }
        catch (error) {
            console.log("ERROR")
        }
    }
    const handleStarHover = (rating:number) => {
        setSelectedRating(rating);
    };

    const handleRatingRequest = async (book_id: number) => {
        // api url
        const api_url = "/api/rate/"
        // this is the data to be saved in the backend
        const data = {
            bookId : book_id,
            rating : selectedRating,
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(api_url, requestOptions);
            const data = await response.json();
            if (!response.ok) {
                setShowPrompt(true);
                setShowMessage(data.message)
                setTimeout(() => {
                    setShowPrompt(false);
                }, 5000)
            }
            else if (response.ok) {
                setIsRated(data.Rated);
                setShowPrompt(true);
                setShowMessage(data.message)
                setTimeout(() => {
                    setShowPrompt(false);
                }, 5000)
                window.location.reload()
            }
            else {
                setIsRated(false);
                setShowPrompt(true);
                setShowMessage(data.message)
                setTimeout(() => {
                    setShowPrompt(false);
                }, 5000)
            }
        }
        catch (error) {
            
        }
    }

    const handleStarClick = (rating:number) => {
    // Handle saving the rating (e.g., send to the server)
        console.log(`User selected rating: ${book.id}`);
        setSelectedRating(rating);
        handleRatingRequest(book.id);
    };

    const stars = Array.from({ length: 5 }, (_, index) => (
        <svg key={index} xmlns="http://www.w3.org/2000/svg" fill={index < selectedRating && auth?.isAuthenticated ? 'green' : '#000000'} style={{cursor: `${auth?.isAuthenticated ? "pointer": "not-allowed"}`}} width="21.87" height="20.801"><path d="m4.178 20.801 6.758-4.91 6.756 4.91-2.58-7.946 6.758-4.91h-8.352L10.936 0 8.354 7.945H0l6.758 4.91-2.58 7.946z" className={`${auth?.isAuthenticated ? "": "opacity-20"}`} onMouseEnter={() => handleStarHover(index + 1)}
        onClick={() => handleStarClick(index + 1)}/></svg>
    ));

    const actions = [
        { "img": "ask.png", "action": "Inquire", "alt":"ask question"},
        { "img": "download.png", "action": "Download", "alt": "download" },
        {"img": "share.png", "action": "Share", "alt": "share"}
    ]

    return (
    <>
    <div className={`absolute top-[23em] md:top-[4em] z-[20000] right-2 md:-right-[5em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 shadow-md ${rated && !error? 'bg-green-500' :'bg-red-400'} md:bg-opacity-50 ${showPrompt ? 'block' : 'hidden'}`}>
        <p>{ message }</p>
    </div>
            
            {(streamingMode && !error) ? <section className={`bg-slate-800 bg-opacity-70 absolute -top-[4em] w-[94.6em] ${currentpage === 0 ? 'h-[100vh]' : 'h-fit'} z-[30000] flex flex-col justify-center items-center -left-[7em]`}>
        <div className='absolute top-[1em] right-[5em] justify-end space-x-10 w-[10em] h-10 flex'>
            <div className='bg-yellow-200 pb-5 relative'>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-[2em] absolute -top-3 -left-5' x="0px" y="0px" width="64" height="64" viewBox="0 0 512 512"> <path fill="#32BEA6" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"></path><path fill="#FFF" d="M416.2,275.3v-38.6l-36.6-11.5c-3.1-12.4-8-24.1-14.5-34.8l17.8-34.1L355.6,129l-34.2,17.8c-10.6-6.4-22.2-11.2-34.6-14.3l-11.6-36.8h-38.7l-11.6,36.8c-12.3,3.1-24,7.9-34.6,14.3L156.4,129L129,156.4l17.8,34.1c-6.4,10.7-11.4,22.3-14.5,34.8l-36.6,11.5v38.6l36.4,11.5c3.1,12.5,8,24.3,14.5,35.1L129,355.6l27.3,27.3l33.7-17.6c10.8,6.5,22.7,11.5,35.3,14.6l11.4,36.2h38.7l11.4-36.2c12.6-3.1,24.4-8.1,35.3-14.6l33.7,17.6l27.3-27.3l-17.6-33.8c6.5-10.8,11.4-22.6,14.5-35.1L416.2,275.3z M256,340.8c-46.7,0-84.6-37.9-84.6-84.6c0-46.7,37.9-84.6,84.6-84.6c46.7,0,84.5,37.9,84.5,84.6C340.5,303,302.7,340.8,256,340.8z"></path> </svg>            
            </div>
            <Image src="/images/close.png" onClick={() => {setStreamingMode(false)}} className="w-[2em] cursor-pointer" alt={book.title} width={7190} height={6660}/>
        </div>            
        {/*cover page  */}
                <div className={`bg-yellow-100  ${currentpage === 0 ? 'w-[26em] h-[40em]': 'w-[40em] h-fit'} trasnform border-2 shadow-2xl shadow-green-500 border-black`}>
                    {currentpage === 0 ? <Image src={book.cover_img} className="w-full h-full" alt={book.title} width={7190} height={6660} /> :
                        (<>
                            <p className='text-center font-bold border-b-4 border-b-black'>Current page { currentpage }</p>
                            <p className='p-2'>{bookpages[currentpage-1]}</p>
                        </>
                        )}
        </div>
                <div className={`bg-yellow-100 absolute opacity-70 ${currentpage === 0 ? 'right-[10em]': 'right-[7em]'} top-[5em] w-[20em] h-[30em]`}>
                    <p className='text-center p-2 border-b-4 border-black font-bold'>Next page {nextPage}</p>
            <div className='bg-slate-300 text-[10px]'>
                        {bookpages[nextPage-1]}
            </div>        
        </div>
        {previousPage > -1  && <div className={`bg-yellow-100 absolute opacity-70 ${currentpage === 0 ? 'left-[10em]': 'left-[7em]'} top-[5em] w-[20em] h-[30em]`}>
                    <p className='text-center p-2 border-b-4 border-black font-bold'>{previousPage === 0 ? 'cover page' : `Previous page ${ previousPage }`}</p>
            <p className='text-[10px] bg-slate-300'> {previousPage === 0 ? <Image src={book.cover_img} className="w-full h-full" alt={book.title} width={7190} height={6660} /> : bookpages[previousPage-1]}</p>        
        </div>}
        <Image src="/images/forward.png" className="w-[3em] absolute right-10 shadow-xl shadow-green-500 cursor-pointer hover:shadow-2xl hover:shadow-green-500" alt={book.title} width={7190} height={6660} onClick={moveNextPage} />
        <Image src="/images/backward.png" className="w-[3em] absolute left-10 shadow-xl shadow-red-500 cursor-pointer hover:shadow-2xl hover:shadow-red-500" alt={book.title} width={7190} height={6660} onClick={movePrevPage}/>
                
        </section>: ''
    }        

    <div className="relative top-[17em] md:static bg-blue-300 bg-opacity-10 p-2 md:w-1/5 flex flex-col items-center rounded-md border-r-2 border-2 border-black">
        <div className="h-[13em] bg-blue-400 w-[10em]">
            <Image src={book.cover_img} className="w-full h-full" alt={book.title} width={1190} height={30}/>
        </div>
        <p className="font-serif mt-2">Genre: <span className="font-bold font-description">&lt;Fictional&gt;</span></p>
        <button className="bg-green-700 bg-opacity-50 w-[9em] h-[2.5em] mt-1 rounded-md text-lg hover:bg-green-400 shadow-md hover:transition-colors font-bold" onClick={ handleBookStreaming }>
            Stream
        </button>
        <form action="" className="bg-slate-400 hover:bg-slate-700 hover:text-yellow-50 hover:transition-all shadow-md bg-opacity-50 hover:cursor-pointer w-[9em] h-[2.5em] flex justify-between mt-1 rounded-md text-lg">
        <span className="p-1 pl-5">want to learn</span>
        <select name="" id="" className="h-full">

        </select>
        </form>
        <div className="flex space-x-2 p-2 mt-2 border-b-2 border-b-black">
            {stars}
        </div>
        <div className={`flex space-x-3 mt-[2em]`}>
        {actions.map((actionItem, index) => (
            <div key={index}>
                {
                book.total_downloads >= 1 ? <div className={`bg-green-200 shadow-md font-bold ${index === 1 ? 'block' : 'hidden'} absolute h-8 w-8 text-center pt-1 border-1 border-black rounded-full md:left-28 left-[11em] top-[25em] z-[1000] md:top-[25.4em]`}>{book.total_downloads}</div> : ''          
                }
                <ActionsComp
                    key={index}
                    img={actionItem.img}
                    action={actionItem.action}
                    alt={actionItem.alt}
                    book={book}
                />
            </div>
            ))}
        </div>
    </div>
    </>
  );
};

export default LeftBookComp;
