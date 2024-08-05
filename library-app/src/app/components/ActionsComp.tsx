// components/BookComp.tsx
import React from 'react';
import Image from 'next/image';
import { Book as BookType } from './types';
import Link from 'next/link';
import { useAuth } from '@/components/authProvider';
import { useState } from 'react';

interface ActionsProps {
    key: number;
    book: BookType;
    img: string;
    action: string;
    alt: string;
}
const ActionsComp: React.FC<ActionsProps> = ({book, img, action, alt}) => {
    const requires_login = "Hey There! to stream, download, share, rate, or ask question, you need to Log in";
    const download_error = "Error in trying to download pdf";

    // 
    const auth = useAuth();
    // manage the state of when to prompt a user and the message to show
    const [showPrompt, setShowPrompt] = useState(false);
    const [message, setShowMessage] = useState('');
    
    const showMessagePrompt = (prompt: string) => {
        setShowPrompt(true);
        setShowMessage(prompt);
        setTimeout(() => {
            setShowPrompt(false);
        }, 5000);
    };

    const downloadPdf = async (book_id: number) => {
        try {
            const response = await fetch(`/api/downloadpdf/${book_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                showMessagePrompt(requires_login);
                throw new Error('Failed to download PDF');
            }         
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'book.pdf'; // You can set the filename dynamically if needed
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            showMessagePrompt("Ninja Server Error")
        }
    }
    return (
    <>
        <div className={`absolute top-[23em] md:top-[10em] z-[20000] right-2 md:right-[10em] w-[20em] h-[3em] md:h-[5em] rounded-md flex flex-col justify-center text-center border-2 border-green-800 bg-red-400 md:bg-opacity-50 ${showPrompt ? 'block' : 'hidden'}`}>
                <p>{ message }</p>
        </div>
            <div className={`${auth?.isAuthenticated ? 'cursor-pointer' : 'opacity-25 cursor-not-allowed'}`}
                onClick={() => {
                    if (auth?.isAuthenticated) {
                        downloadPdf(book.id);        
                    } else {
                        showMessagePrompt(requires_login);
                    }
                }}>
                <p className="flex justify-center">
                    <Image src={`/images/${img}`} alt="star" width={30} height={30} />
                </p>
            <p>{ action }</p>
        </div>
    </>
  );
};

export default ActionsComp;